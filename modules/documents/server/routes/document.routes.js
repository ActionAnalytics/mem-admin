'use strict';
// =========================================================================
//
// Routes for documents
//
// =========================================================================
var policy     = require ('../policies/document.policy');
var controller = require ('../controllers/document.controller');

module.exports = function (app) {
	//
	// collection routes
	//
	app.route ('/api/documents')//.all (policy.isAllowed)
		.get  (controller.list);
		//.post (controller.create);
	//
	// model routes
	//
	app.route ('/api/document/:document').all (policy.isAllowed)
		.get    (controller.read)
		.put    (controller.update)
		.delete (controller.delete);

	// Find a document Folder (scrapeAndSearch)
	app.route ('/api/scrapeAndSearch')//.all (policy.isAllowed)
		.get (controller.scrapeAndSearch);

	// Find a specific document (populateReviewDocuments)
	app.route ('/api/populateReviewDocuments')//.all (policy.isAllowed)
		.get (controller.populateReviewDocuments);

	//
	// upload a document
	//
	app.route ('/api/document/:project/upload')//.all (policy.isAllowed)
		.post (controller.upload);
	//
	// middleware to auto-fetch parameter
	//
	app.param ('document', controller.getObject);
	//app.param ('documentId', controller.getId);
};

