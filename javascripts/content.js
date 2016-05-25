var app = angular.module('ngHomepageApp', []);
app.controller("ProjectController", function($scope){
	$scope.projects = projectData;
});
app.controller("CurrentWorkController", function($scope){
	$scope.current_works = currentWorkData;
});