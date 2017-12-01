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

nextGenApp.run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $state.go("home");
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
            redirectTo: 'dashboard.main',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                 // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function (Auth) {
                         // $requireSignIn returns a promise so the resolve waits for it to complete
                         // If the promise is rejected, it will throw a $stateChangeError (see above)
                        
                        return Auth.$requireSignIn(); 
                    }] 
            }
        })
        .state('dashboard.main', {
            url: '/main',
            templateUrl: 'partials/dashboard.main.html',
            controller: 'mainController',
           resolve: {
                // controller will not be loaded until $requireSignIn resolves
                 // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function (Auth) {
                         // $requireSignIn returns a promise so the resolve waits for it to complete
                         // If the promise is rejected, it will throw a $stateChangeError (see above)
                        
                        return Auth.$requireSignIn(); 
                    }] 
            }
        })
        .state('dashboard.contact', {
            url: '/contact',
            templateUrl: 'partials/dashboard.contact.html',
            controller: 'contactController'
        })
        .state('dashboard.about', {
            url: '/about',
            templateUrl: 'partials/dashboard.about.html',
            controller: 'aboutController'
        })
        .state('dashboard.services', {
            url: '/services',
            templateUrl: 'partials/dashboard.services.html',
            controller: 'servicesController'
        })
        .state('dashboard.blog', {
            url: '/blog',
            templateUrl: 'partials/dashboard.blog.html',
            controller: 'blogController'
        });

});

nextGenApp.factory("Auth", ["$firebaseAuth",
  function ($firebaseAuth) {
        return $firebaseAuth();
  }
]);
