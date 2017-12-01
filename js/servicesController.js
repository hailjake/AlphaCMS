nextGenApp.controller("servicesController", ["$scope", "$state", "Auth", "$firebaseArray",
 function ($scope, $state, Auth, $firebase, $firebaseAuth, $firebaseArray, $timeout) {

        // Firestore
        var db = firebase.firestore();
        $scope.database = {};
        $scope.database.test = "";

        // Get Data
        db.collection("about").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);

                $scope.database = doc.data();
                $scope.$apply()
            });
        });

        $scope.isLoading = false;
        $scope.updateSuccess = false;

        // Update Data
        $scope.updateData = function () {
            var HeaderTxtRef = db.collection("about").doc("nzrccvqsJigkR0SbUkiV");
            $scope.isLoading = true;
            return HeaderTxtRef.update({
                    ContactEmail: $scope.database.test
                })
                .then(function () {
                    $scope.isLoading = false;
                    $scope.updateSuccess = true;
                    setTimeout(function () {
                        $scope.updateSuccess = false;
                        $scope.$apply();
                    }, 5000);
                    $scope.$apply();
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                    $scope.isLoading = false;
                    $scope.$apply();
                });
        };



 }]);
