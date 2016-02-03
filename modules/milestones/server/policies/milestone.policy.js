'use strict';
// =========================================================================
//
// Policies for milestones
//
// =========================================================================
var acl  = require ('acl');
acl      = new acl (new acl.memoryBackend ());
var helpers  = require (require('path').resolve('./modules/core/server/controllers/core.helpers.controller'));

exports.invokeRolesPolicies = function () {
	helpers.setCRUDPermissions (acl, 'milestone');
	helpers.setCRUDPermissions (acl, 'milestonebase');
	helpers.setPathPermissions (acl, [
		[ '', 'user', '/api/milestonebase/:milestonebase/add/activity/:activitybase']
	]);
};

exports.isAllowed = helpers.isAllowed (acl);


