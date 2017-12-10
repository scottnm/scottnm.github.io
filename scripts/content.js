var app = angular.module('ngHomepageApp', []);
app.controller("TechnicalProjectController", function($scope){
	$scope.tech_projects = technicalProjectData;
});
app.controller("CreativeProjectController", function($scope){
	$scope.creative_projects = creativeProjectData;
});
app.controller("CurrentWorkController", function($scope){
	$scope.current_works = currentWorkData;
});
