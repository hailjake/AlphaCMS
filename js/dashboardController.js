
nextGenApp.controller("dashboardController", ["$scope", "Auth", "$firebaseArray",
 function($scope, Auth, $firebase, $firebaseAuth, $firebaseArray) {
    $scope.auth = Auth;
    var db = firebase.firestore();


    db.collection("content").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            
            $scope.database = doc.data();
            $scope.$apply()
        });
    });

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
     $scope.firebaseUser = firebaseUser;
    });
     
     
  }
]);