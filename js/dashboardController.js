nextGenApp.controller("dashboardController", ["$scope", "$state", "Auth", "$firebaseArray",
 function ($scope, $state, Auth, $firebase, $firebaseAuth, $firebaseArray) {

        // TODO: create helper library to wrap datastore calls
     
             // logout
        $scope.logout = function () {
            firebase.auth().signOut().then(function() {
                $state.go('home');
            }, function(error) {
              console.error('Sign Out Error', error);
            });
        };
     
     
        // Auth 
        $scope.auth = Auth;
        // any time auth state changes, add the user data to scope
        $scope.auth.$onAuthStateChanged(function (firebaseUser) {
            $scope.firebaseUser = firebaseUser;
        });

        // Firestore
        var db = firebase.firestore();
        $scope.database = {};
        $scope.database.HeaderTxt = "";
        $scope.database.SubHeaderTxt = "";
     
        // Get Data
        db.collection("content").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);

                $scope.database = doc.data();
                $scope.$apply()
            });
        });
        $scope.isLoading = false;

        // Update Data
        $scope.updateData = function () {
            var HeaderTxtRef = db.collection("content").doc("XEmzSyn6Az1LDCt3JSKh");
            $scope.isLoading = true;
            return HeaderTxtRef.update({
                    HeaderTxt: $scope.database.HeaderTxt,
                    SubHeaderTxt: $scope.database.SubHeaderTxt
                })
                .then(function () {
                    $scope.isLoading = false;
                    $scope.$apply();
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                    $scope.isLoading = false;
                    $scope.$apply();
                });
        };
  }
]);
