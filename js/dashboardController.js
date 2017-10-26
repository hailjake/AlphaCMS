nextGenApp.controller("dashboardController", ["$scope", "Auth", "$firebaseArray",
 function ($scope, Auth, $firebase, $firebaseAuth, $firebaseArray) {
        
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

        // Update Data
        $scope.updateData = function () {
            var HeaderTxtRef = db.collection("content").doc("XEmzSyn6Az1LDCt3JSKh");

            return HeaderTxtRef.update({
                    HeaderTxt: $scope.database.HeaderTxt,
                    SubHeaderTxt: $scope.database.SubHeaderTxt
                })
                .then(function () {
                    console.log("Document successfully updated!");
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                });
        };
  }
]);
