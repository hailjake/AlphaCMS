nextGenApp.controller("mainController", ["$scope", "$state", "Auth", "$firebaseArray",
 function ($scope, $state, Auth, $firebase, $firebaseAuth, $firebaseArray, $timeout) {

    // Firestore
    var db = firebase.firestore();
    $scope.database = {};
    $scope.database.HeaderTxt = "";
    $scope.database.SubHeaderTxt = "";

    // Get Data
    db.collection("homepage").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            $scope.database = doc.data();
            $scope.$apply()
        });
    });

    $scope.isLoading = false;
    $scope.updateSuccess = false;

    // Update Data
    $scope.updateData = function () {
        var HeaderTxtRef = db.collection("homepage").doc("Zn5DwXDTwsDPJNoilP1q");
        $scope.isLoading = true;
        return HeaderTxtRef.update({
                HeaderTxt: $scope.database.HeaderTxt,
                SubHeaderTxt: $scope.database.SubHeaderTxt
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
