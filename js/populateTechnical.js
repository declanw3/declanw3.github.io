var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope, $http) {
    $http.get("data/home_data.json")
    .then(function (response) {
		$scope.home_heading = response.data.Heading;
		$scope.home_body = response.data.Body;
	});
    $http.get("data/resume_data.json")
    .then(function (response) {
		$scope.skills = response.data.technical_skills;
		$scope.education = response.data.education_entries;
	});
    $http.get("data/profile_data.json")
    .then(function (response) {
		$scope.interests = response.data.interests_and_hobbies;
		$scope.voluntary = response.data.voluntary_activities;
		$scope.additional = response.data.additional_information;
	});
});