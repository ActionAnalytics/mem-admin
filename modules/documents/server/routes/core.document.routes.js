'use strict';
// =========================================================================
//
// Routes for Documents
//
// Does not use the normal crud routes, mostly special sauce
//
// =========================================================================
var DocumentClass	= require ('../controllers/core.document.controller');
var routes 			= require ('../../../core/server/controllers/core.routes.controller');
var policy 			= require ('../../../core/server/controllers/core.policy.controller');
var fs 				= require('fs');
var MinioController = require('../../../core/server/controllers/core.minio.controller');

var renderNotFound = function (url, res) {
  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: url
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
var documentDownloadName = function documentDownloadName(req) {
  // ETL fixing - if the name was brought in without a filename, and we have their document
  // file format, affix the type as an extension to the original name so they have a better
  // chance and opening up the file on double-click.
  String.prototype.endsWith = String.prototype.endsWith || function (str){
    return new RegExp(str + "$").test(str);
  };

  var doc = req.Document;
  var format = req.Document.documentFileFormat;
  var name = doc.documentFileName || doc.displayName || doc.internalOriginalName;
  if (format && !name.endsWith(format)) {
    name += "." + format;
  }
  // keep the console log statments until after we run an ETL that resets the filename extensions.
  // these will help verify the ETL once it is done
  // They may help in the future if those file extensions disappear again.
  return name;
};
module.exports = function (app) {
  //
  // get put new delete
  //
  routes.setCRUDRoutes (app, 'document', DocumentClass, policy, ['get','put','new', 'delete', 'query'], {all:'guest',get:'guest'});
  // Import via CSV
  app.route ('/api/documents/import')
    .all (policy ('guest'))
    .post ( routes.setAndRun (DocumentClass, function (model, request) {
      return model.loadDocuments(request.files.file, request);
    }));
  app.route ('/api/document/makeLatest/:document')
    .all (policy ('user'))
    .put (routes.setAndRun (DocumentClass, function (model, req) {
      return model.makeLatest (req.Document);
    }));
  //
  // getAllDocuments                 : '/api/documents'
  //
  app.route ('/api/documents')
    .all (policy ('guest'))
    .get (routes.setAndRun (DocumentClass, function (model) {
      return model.list ();
    }));
  //
  // getProjectDocuments             : '/api/documents/' + projectId
  //
  app.route ('/api/documents/:projectid')
    .all (policy ('guest'))
    .get (routes.setAndRun (DocumentClass, function (model, req) {
      return model.getDocumentsForProject (req.params.projectid, req.headers.reviewdocsonly);
    }));
  app.route ('/api/documents/for/project/:projectid/in/:directoryid/sort')
    .all (policy ('guest'))
    .put (routes.setAndRun (DocumentClass, function (model, req) {
      return model.sortDocumentsForProjectFolder (req.params.projectid, req.params.directoryid, req.body);
    }));
  //
  // getProjectDocumentTypes         : '/api/documents/types/' + projectId
  //
  app.route ('/api/documents/types/:projectid')
    .all (policy ('guest'))
    .get (routes.setAndRun (DocumentClass, function (model, req) {
      return model.getDocumentTypesForProject (req.params.projectid, req.headers.reviewdocsonly);
    }));
  //
  // getProjectDocumentSubTypes      : '/api/documents/subtypes/' + projectId
  //
  app.route ('/api/documents/subtypes/:projectid')
    .all (policy ('guest'))
    .get (routes.setAndRun (DocumentClass, function (model, req) {
      return model.getDocumentSubTypesForProject (req.params.projectid);
    }));
  //
  // getProjectDocumentFolderNames   : '/api/documents/folderNames/' + projectId
  //
  app.route ('/api/documents/folderNames/:projectid')
    .all (policy ('guest'))
    .get (routes.setAndRun (DocumentClass, function (model, req) {
      return model.getDocumentFolderNamesForProject (req.params.projectid);
    }));
  //
  // getProjectDocumentFolderNames (for MEM)   : '/api/documents/memtypes/' + projectId
  //
  app.route ('/api/documents/memtypes/:projectid')
    .all (policy ('guest'))
    .get (routes.setAndRun (DocumentClass, function (model, req) {
      return model.getDocumentTypesForProjectMEM (req.params.projectid);
    }));
  //
  // getProjectDocumentVersions      : '/api/documents/versions/' + projectId
  //
  app.route ('/api/documents/versions/:document')
    .all (policy ('guest'))
    .get (routes.setAndRun (DocumentClass, function (model, req) {
      return model.getDocumentVersions (req.Document);
    }));
  //
  // getDocumentsInList              : '/api/documentlist', data:documentList
  //
  app.route ('/api/documentlist')
    .all (policy ('guest'))
    .put (routes.setAndRun (DocumentClass, function (model, req) {
      return model.getList (req.body);
    }));
  //
  // fetch a document (download multipart stream)
  //
  app.route ('/api/document/:document/download')
    .all (policy ('guest'))
    .get (function (req, res) {
      if (req.Document.internalURL.match (/^(http|ftp)/)) {
        res.redirect (req.Document.internalURL);
      } else {
        var name = documentDownloadName(req);

        if (fs.existsSync(req.Document.internalURL)) {
          routes.streamFile (res, {
            file : req.Document.internalURL,
            name : name,
            mime : req.Document.internalMime
          });
        } else {
          renderNotFound(req.originalUrl, res);
        }
      }
    });
  //
  // fetch a document
  //
  app.route ('/api/document/:document/fetch')
    .all (policy ('guest'))
    .get (function (req, res) {
      if (req.Document.internalURL.match (/^(http|ftp)/)) {
        res.redirect (req.Document.internalURL);
      } else {

        var name = documentDownloadName(req);

        if (fs.existsSync(req.Document.internalURL)) {
          var stream 	= fs.createReadStream(req.Document.internalURL);
          var stat 	= fs.statSync(req.Document.internalURL);
          res.setHeader('Content-Length', stat.size);
          res.setHeader('Content-Type', req.Document.internalMime);
          res.setHeader('Content-Disposition', 'inline;filename="' + name + '"');
          stream.pipe(res);
        } else {
          renderNotFound(req.originalUrl, res);
        }
      }
    });
  //
  // upload comment document:  We do this to force the model as opposed to trusting the
  // 'headers' from an untrustworthy client.
  //
  app.route ('/api/commentdocument/:project/upload')
    .all (policy ('guest'))
    .post (routes.setAndRun (DocumentClass, function (model, req) {
      return new Promise (function (resolve, reject) {
        var file = req.files.file;
        if (file) {
          var opts = { oldPath: file.path, projectCode: req.Project.code};
          routes.moveFile (opts)
            .then (function (newFilePath) {
              return model.create ({
                // Metadata related to this specific document that has been uploaded.
                // See the document.model.js for descriptions of the parameters to supply.
                project                 : req.Project,
                projectFolderType       : req.body.documenttype,
                projectFolderSubType    : req.body.documentsubtype,
                projectFolderName       : req.body.documentfoldername,
                projectFolderURL        : newFilePath,
                projectFolderDatePosted : Date.now(),
                // NB                   : In EPIC, projectFolders have authors, not the actual documents.
                projectFolderAuthor     : req.body.projectfolderauthor,
                // These are the data as it was shown on the EPIC website.
                documentAuthor          : req.body.documentauthor,
                documentFileName        : req.body.documentfilename,
                documentFileURL         : req.body.documentfileurl,
                documentFileSize        : req.body.documentfilesize,
                documentFileFormat      : req.body.documentfileformat,
                documentIsInReview      : req.body.documentisinreview,
                documentVersion         : 0,
                documentSource			: 'COMMENT',
                // These are automatic as it actually is when it comes into our system
                internalURL             : newFilePath,
                internalOriginalName    : file.originalname,
                internalName            : file.name,
                internalMime            : file.mimetype,
                internalExt             : file.extension,
                internalSize            : file.size,
                internalEncoding        : file.encoding,
                directoryID             : req.body.directoryid || 0
              });
            })
            .then (resolve, reject);
        }
        else {
          reject ("no file to upload");
        }
      });
    }));

  /**
   * Adds a new document record for the given file.
   * Expects `request.body.file` to be a file object with all associated file metadata.
   * Expects `request.body` to contain all other related document information.
   * Note: This function does not itself perform any file upload, and assumes the file has already been uploaded to minio.
   * Note: If this fails to create the document record it will then attempt to delete the file from minio, so the two locations remain in sync.
   */
  app.route ('/api/document/:project/upload')
    .all (policy ('guest'))
    .post (routes.setAndRun (DocumentClass, function (model, req) {
      return new Promise (function (resolve, reject) {
        var file = req.body.file;
        if (file) {
          var readPermissions = null;
          if (req.headers.internaldocument) {
            // Force read array to be this:
            readPermissions = ['assessment-admin', 'assessment-lead', 'assessment-team', 'assistant-dm', 'assistant-dmo', 'associate-dm', 'associate-dmo', 'complaince-officer', 'complaince-lead', 'project-eao-staff', 'project-epd', 'project-intake', 'project-qa-officer', 'project-system-admin'];
          }
          var datePosted, dateReceived = Date.now();
          // Allow override of date posting/received
          if (req.headers.dateposted) {
            datePosted = new Date(req.headers.dateposted);
          }
          if (req.headers.datereceived) {
            dateReceived = new Date(req.headers.datereceived);
          }

          var modelData = {
            // Metadata related to this specific document that has been uploaded.
            // See the document.model.js for descriptions of the parameters to supply.
            project                 : req.Project,
            projectFolderType       : req.body.documenttype,
            projectFolderSubType    : req.body.documentsubtype,
            projectFolderName       : req.body.documentfoldername,
            projectFolderURL        : req.body.filePath,
            datePosted 			       	: datePosted,
            dateReceived 		       	: dateReceived,
            // Migrated from old EPIC
            oldData            		  : req.body.olddata,
            // NB                   : In EPIC, projectFolders have authors, not the actual documents.
            projectFolderAuthor     : req.body.projectfolderauthor,
            // These are the data as it was shown on the EPIC website.
            documentEPICProjectId 	: req.body.documentepicprojectid,
            documentAuthor          : req.body.documentauthor,
            documentFileName        : req.body.documentfilename,
            documentFileURL         : req.body.documentfileurl,
            documentFileSize        : req.body.documentfilesize,
            documentFileFormat      : req.body.documentfileformat,
            documentIsInReview      : req.body.documentisinreview,
            documentVersion         : 0,
            // These are automatic as it actually is when it comes into our system
            internalURL             : req.body.filePath,
            internalOriginalName    : file.originalname,
            internalName            : file.name,
            internalMime            : file.mimetype,
            internalExt             : file.extension,
            internalSize            : file.size,
            internalEncoding        : file.encoding,
            directoryID             : req.body.directoryid || 0,
            displayName             : req.body.displayname || req.body.documentfilename || file.originalname,
            dateUploaded            : req.body.dateuploaded
          }

          return model.create(modelData, req.headers.inheritmodelpermissionid, readPermissions)
            .then(function (response) {
              return response;
            }, function (error) {
              // the model failed to be created - delete the document from minio so the database and minio remain in sync.
              MinioController.deleteDocument(req.Project.code, file.name);
              reject(error);
            })
            .then(function (data) {
              if (req.headers.publishafterupload === 'true') {
                return model.publish(data);
              } else {
                return data;
              }
            })
            .then (resolve, reject);
        }
        else {
          reject ("no file to upload");
        }
      });
    }));

  app.route('/api/publish/document/:document').all(policy('user'))
    .put(routes.setAndRun(DocumentClass, function (model, req) {
      return model.publish(req.Document);
    }));
  app.route('/api/unpublish/document/:document').all(policy('user'))
    .put(routes.setAndRun(DocumentClass, function (model, req) {
      return model.unpublish(req.Document);
    }));
  app.route('/api/getDocumentByEpicURL').all(policy('guest'))
    .put(routes.setAndRun(DocumentClass, function (model, req) {
      return model.getEpicProjectFolderURL(req.body);
    }));

};
