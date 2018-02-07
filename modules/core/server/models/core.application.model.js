'use strict';
// =========================================================================
//
// Model for application object, just a one-off
//
// =========================================================================
module.exports = require('../controllers/core.schema.controller')('Application', {
  _id: {type: String, default: 'application'},
  code: {type: String, default: 'application'},
  __access: [
    'listConditions',
    'listCollections',
    'listEmailTemplates',
    'listOrganizations',
    'listNews',
    'listRoles',
    'listTemplates',
    'listValuedComponents',
    'listContacts',
    'createCondition',
    'createCollection',
    'createEmailTemplate',
    'createOrganization',
    'createNews',
    'createRole',
    'createTemplate',
    'createValuedComponent',
    'createContact',
    'editContact',
    'editPublicContent',
    'deleteContact',
    'createProject',
    'manageRoles',
    'managePermissions',
    'addUsersToContext'
  ]
});


