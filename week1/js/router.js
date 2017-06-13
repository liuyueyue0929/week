app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/list")
    $stateProvider.state({
        name: "title",
        "url": "/title",
        templateUrl: "html/list.html",
        controller: function($scope, $stateParams) {
            $scope.content = $stateParams.ID
        },
        params: {
            ID: ""
        }
    }).state({
        name: "list",
        "url": "/list",
        templateUrl: "index.html",
        controller: function($scope, $http) {
            $http({
                url: "/sel",
                method: "get"
            }).success(function(res) {
                $scope.data = res.data
                console.log($scope.data)
            })
        }
    })

})
