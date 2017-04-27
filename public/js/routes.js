var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../views/main.html",
        controller: "homeController"
    })
    .when("/post/:id", {
        templateUrl : "../views/postDetails.html",
        controller: "postController"
    })
    .when("/contact", {
        templateUrl : "../views/contact.html"
    })
    .when("/about", {
        templateUrl : "../views/about.html"
    });
});

app.controller("postController", function($scope, $http, $routeParams, $location) {
    $scope.id = $routeParams.id;
    $scope.title = "Sample Post";
    $scope.subtitle = "Sample Post subtitle";
    $scope.content = "This is a sample post";
    
});

app.controller("homeController", function($scope, $http, $location) {
    $scope.posts = [];
    $http.get("/post/getAll").then(function(res){
        $scope.posts = res.data;
    }, function(err){
        console.log(err);
    });
});