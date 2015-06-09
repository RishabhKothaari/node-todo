//app.js

var app = angular.module( 'app', [ 'ngMaterial' ] );

// app.config( function ( $mdThemingProvider ) {
// 	$mdThemingProvider.theme( 'default' )
// 		.primaryPalette( 'indigo' )
// 		.accentPalette( 'pink' )
// 		.warnPalette( 'red' )
// 		.backgroundPalette( 'blue' )
// 		.dark()
// } );

app.controller( 'toolBarController', [ '$scope', function ( $scope ) {
	$scope.showMoreTab = [];
	$scope.todos = [ {
		"id": 1,
		"name": "This is first todo.",
		"done": false,
		"subtasks": [ "Hello", "World", "1", "2" ]
	}, {
		"id": 2,
		"name": "This is second todo.",
		"done": false,
		"subtasks": [ "Hello", "World", "1", "2" ]
	} ]
	console.log( "$scope.todos" );
	console.log( $scope.todos );
	$scope.todoClicked = function ( id ) {
		if ( !$scope.showMoreTab[ id ] ) {
			$scope.showMoreTab[ id ] = true;
			angular.forEach( $scope.todos, function ( todo ) {
				if ( id !== todo.id ) {
					$scope.showMoreTab[ todo.id ] = false;
				}
			} );
		} else {
			$scope.showMoreTab[ id ] = false;
		}
	}

	$scope.addSubtasks = function ( id, task ) {
		var stop = false;
		angular.forEach( $scope.todos, function ( todo ) {
			if ( !stop && todo.id === id ) {
				stop = true;
				todo.subtasks.push( task );
				todo.task = '';
			}
		} );
	}
} ] );
