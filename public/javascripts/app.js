var app = angular.module('comment', []);


app.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.firebaseUser = null;

    firebase.auth().onAuthStateChanged(function(user) {
        $scope.$apply(function(){
          if (user) {
            $scope.firebaseUser = user;
          } else {
          }
        });
      });

    $scope.login = function() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        $scope.firebaseUser = user;
        console.log(user);

        // ...
      }).catch(function(error) {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        alert(errorMessage);
        // ...
      });
    }

    $scope.logout = function() {
      console.log("logging out...")
        firebase.auth().signOut().then(function() {
          $scope.firebaseUser = '';
        }).catch(function(error) {
          // An error happened.
        });
    }

    $scope.comments = [];
 /*   $scope.addTalk = function() {
      //var newcomment = {title:$scope.formContent,upvotes:0};
      //$scope.formContent='';
      //$http.post('/comments', newcomment).success(function(data){
      //  $scope.comments.push(data);
      //});
      if($scope.formContent === '') { return; }
      $scope.create({
        title: $scope.formContent,
        upvotes: 0,
	session: $scope.sessionContent,
	speaker: $scope.speakerContent,
	url: $scope.urlContent,
      });
      $scope.formContent = '';
    	$scope.sessionContent = '';
    	$scope.speakerContent = '';
    	$scope.urlContent = '';
    };
  */  
   
      
    
 /*   timeSinceFunction = function() {
        var elapsedTime;
        elapsedTime = $scope.currentTime -$scope.firebaseUser.time;
        var m = Math.floor((elapsedTime / 1000) / 60);
        var h = Math.floor(m / 60);
        if (m > 60) {
            $scope.timeSince = h + "hrs ago";
        }
        else if (m < 60) {
            console.log("welp");
            $scope.timeSince = m + "min ago";
        }
    }*/
    
      
    $(document).ready(function() {
        var d = new Date();
        var n = d.getTime();
        $scope.currentTime = n;
        var elapsedTime;
    elapsedTime = $scope.currentTime - $scope.comments.time;
           console.log(elapsedTime);
        $scope.comments.forEach(function(e) {
            console.log(e.time);
        })
      
    if ((elapsedTime / 1000)/60<60) {
        console.log("OUTPUT in Minutes");
    }
    });
      
      
      
    $scope.Math = window.Math;
      
    $scope.addComment = function() {
        if($scope.formContent == '') {
            return;
        }
        var d = new Date();
        var n = d.getTime();
        $scope.create({
            postedComment: $scope.formContent,
            upvotes: 0,
            email: $scope.firebaseUser.email,
            name: $scope.firebaseUser.displayName,
            photoURL: $scope.firebaseUser.photoURL,
            time: n,
        });
        console.log("hello"+$scope.formContent);
        $scope.formContent = '';
    }
    
    $scope.create = function(comment) {
    return $http.post('/comments', comment).success(function(data){
        //$scope.comments.push(data);
      $scope.comments.splice(0,0,data);
      });
    };

    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };
	$scope.incrementUpvotes = function(comment) {
	  $scope.upvote(comment);
    };
    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };

    $scope.delete = function(comment) {
	$http.delete('/comments/' + comment._id)
	.success(function(data){
	  console.log("delete worked dog");
	});
	$scope.getAll();
    };

      
       
    $scope.getAll();

  }
]);
