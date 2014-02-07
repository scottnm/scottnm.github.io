var app = angular.module('ngHomepageApp', []);
app.controller("ProjectController", function($scope){
	$scope.projects = projectData;
});