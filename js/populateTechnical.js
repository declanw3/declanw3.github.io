var app = angular.module('myApp', []);
app.controller('technicalCtrl', function($scope, $http) {
    $http.get("data/resume_data.json")
    .then(function (response) {$scope.skills = response.data.technical_skills;});
});