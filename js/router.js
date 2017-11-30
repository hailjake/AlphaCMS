var nextGenApp = angular.module('nextGenApp', ['ngResource', 'ui.router', 'ngStorage', 'firebase']);


nextGenApp.run(['$rootScope', '$state', function ($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function (evt, to, params) {
        if (to.redirectTo) {
            evt.preventDefault();
            $state.go(to.redirectTo, params, {
                location: 'replace'
            })
        }
    });
}]);


nextGenApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        // Main Index
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'homeController'
        })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard.html',
            controller: 'dashboardController',
            redirectTo: 'dashboard.main'
        })
        .state('dashboard.main', {
            url: '/main',
            templateUrl: 'dashboard.main.html',
            controller: 'dashboardController'
        })
        .state('dashboard.contact', {
            url: '/contact',
            templateUrl: 'dashboard.contact.html',
            controller: 'dashboardController'
        })
        .state('dashboard.about', {
            url: '/about',
            templateUrl: 'dashboard.about.html',
            controller: 'dashboardController'
        })
        .state('dashboard.services', {
            url: '/services',
            templateUrl: 'dashboard.services.html',
            controller: 'dashboardController'
        })
        .state('dashboard.blog', {
            url: '/blog',
            templateUrl: 'dashboard.blog.html',
            controller: 'dashboardController'
        });

});

nextGenApp.factory("Auth", ["$firebaseAuth",
  function ($firebaseAuth) {
        return $firebaseAuth();
  }
]);
