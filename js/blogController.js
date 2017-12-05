nextGenApp.controller("blogController", ["$scope", "$state", "Auth", "$firebaseArray",
 function ($scope, $state, Auth, $firebase, $firebaseAuth, $firebaseArray, $timeout) {
        console.log('blog loaded');
        // Firestore
        var db = firebase.firestore();
        $scope.database = [];
        $scope.database.Title = "";
        $scope.database.Post = "";

     
        // Get Data
        db.collection("blog").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                $scope.database = doc.data();
                console.log($scope.database);
                $scope.$apply();
            });
        });

     
     

        // Update Data
        $scope.updateData = function () {
            db.collection("blog").add({
                 Title: "31eee",
                Post: "3eee",
                UserPosted: "jeeed"
        
            })
        };

 }]);
