nextGenApp.controller("blogController", ["$scope", "$state", "Auth", "$firebaseArray",
 function ($scope, $state, Auth, $firebase, $firebaseAuth, $firebaseArray, $timeout) {
        // Firestore
        var db = firebase.firestore();
        $scope.database = [];
        $scope.Title = "";
        $scope.Post = "";
        $scope.isPosted = true;
        // Auth 
        $scope.auth = Auth;
        // any time auth state changes, add the user data to scope
        $scope.auth.$onAuthStateChanged(function (firebaseUser) {
            $scope.firebaseUser = firebaseUser;
            $scope.displayName = firebaseUser.displayName;     
        });
        // Get Data
        db.collection("blog").get().then((querySnapshot) => {
                $scope.database = querySnapshot.docs.map((doc)=> doc.data());
                
                $scope.$apply();
        });
                $scope.isLoading = false;

        // Update Data
        $scope.updateData = function () {
            db.collection("blog").add({
                Title: $scope.Title,
                Post: $scope.Post,
                UserPosted: $scope.displayName,
                Date: Date(),
                isPosted: $scope.isPosted
            }).then(function () {
                $scope.isLoading = false;
                $scope.updateSuccess = true;
                setTimeout(function () {
                    $scope.updateSuccess = false;
                    $scope.$apply();
                }, 5000);
                
                
            db.collection("blog").get().then((querySnapshot) => {
                $scope.database = querySnapshot.docs.map((doc)=> doc.data());
                
                $scope.$apply();
            
        });
                
                $scope.$apply();
            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
                $scope.isLoading = false;
                $scope.$apply();
            });
        };

 }]);
