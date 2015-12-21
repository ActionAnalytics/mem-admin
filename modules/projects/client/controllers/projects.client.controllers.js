'use strict';

angular.module('projects')
	// General
	.controller('controllerProjectsFilterBar', controllerProjectsFilterBar)
	.controller('controllerProjectsList', controllerProjectsList)
	.controller('controllerProjectsIntake', controllerProjectsIntake);

// -----------------------------------------------------------------------------------
//
// CONTROLLER: Filter Bar
//
// -----------------------------------------------------------------------------------
controllerProjectsFilterBar.$inject = ['$scope', '$state', 'Projects', '$filter'];
/* @ngInject */
function controllerProjectsFilterBar($scope, $state, Projects, $filter) {
	var fbc = this;

	fbc.types = Projects.getProjectTypes();

	Projects.getProjectMilestones().then( function(res) {
		fbc.milestones = res.data;
	});

	fbc.filter = {filterKeyword: '', filterObject: {}};

	$scope.$watch('data', function(newValue) {
		fbc.data = newValue;
	});		

	fbc.updateFilter = function() {
		if( fbc.data.intakes ) {
			fbc.data.intakes = $filter('projects')(fbc.filter);
		}
		if ( fbc.data.projects) {
			fbc.data.projects = $filter('projects')(fbc.filter);
		}
	};

	// fbc.userType = Global.user.type;
}
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Projects
//
// -----------------------------------------------------------------------------------
controllerProjectsList.$inject = ['$scope', '$state'];
/* @ngInject */
function controllerProjectsList($scope, $state) {
	var projectList = this;
	
	$scope.$watch('projects', function(newValue) {
		projectList.projects = newValue;
	});

	projectList.goToProject = function(projectId) {
		$state.go('eao.project', {id:projectId});
	};
	
}
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Projects Intake
//
// -----------------------------------------------------------------------------------
controllerProjectsIntake.$inject = ['$scope', '$state'];
/* @ngInject */
function controllerProjectsIntake($scope, $state) {
	var projectIntakeList = this;

	$scope.$watch('projects', function(newValue) {
		projectIntakeList.projects = newValue;
	});

	projectIntakeList.goToProject = function(projectId) {
		$state.go('eao.project', {id:projectId});
	};
	
}