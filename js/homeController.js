nextGenApp.controller('homeController', function($scope, $firebaseAuth, $state) {

    var auth = $firebaseAuth();

    $scope.signIn = function() {
      $scope.firebaseUser = null;
      $scope.error = null;

      auth.$signInWithPopup("google").then(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
                     $state.go('dashboard');

      }).catch(function(error) {
        $scope.error = error;
      });
        
     
       
    };
    
});


