angular.module('talk', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.talks = [];
    $scope.addTalk = function() {
      //var newcomment = {title:$scope.formContent,upvotes:0};
      //$scope.formContent='';
      //$http.post('/comments', newcomment).success(function(data){
      //  $scope.comments.push(data);
      //});

      if($scope.formContent === '') { return; }
      console.log("In addTalk with "+$scope.formContent);
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
    
    $scope.create = function(talk) {
    return $http.post('/talks', talk).success(function(data){
      $scope.talks.push(data);
      });
    };

    $scope.upvote = function(talk) {
      return $http.put('/talks/' + talk._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          talk.upvotes += 1;
        });
    };
	$scope.incrementUpvotes = function(talk) {
	  $scope.upvote(talk);
    };
    $scope.getAll = function() {
      return $http.get('/talks').success(function(data){
        angular.copy(data, $scope.talks);
      });
    };

    $scope.delete = function(talk) {
	$http.delete('/talks/' + talk._id)
	.success(function(data){
	  console.log("delete worked dog");
	});
	$scope.getAll();
    };

    $scope.getAll();

  }
]);
