nextGenApp.controller("dashboardController", ["$scope", "$state", "Auth", "$firebaseArray",
 function ($scope, $state, Auth, $firebase, $firebaseAuth, $firebaseArray, $timeout) {

        // logout
        $scope.logout = function () {
            firebase.auth().signOut().then(function () {
                $state.go('home');
            }, function (error) {
                console.error('Sign Out Error', error);
            });
        };


        // Auth 
        $scope.auth = Auth;
        // any time auth state changes, add the user data to scope
        $scope.auth.$onAuthStateChanged(function (firebaseUser) {
            $scope.firebaseUser = firebaseUser;
        });

       
  }
]);
