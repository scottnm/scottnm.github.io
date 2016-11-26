var app = angular.module('ngHomepageApp', []);
app.controller("TechnicalProjectController", function($scope){
	$scope.tech_projects = tech_projectData;
});
app.controller("CreativeProjectController", function($scope){
	$scope.creative_projects = creative_projectData;
});
app.controller("CurrentWorkController", function($scope){
	$scope.current_works = currentWorkData;
});
