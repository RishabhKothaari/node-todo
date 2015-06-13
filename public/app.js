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

app.controller( 'toolBarController', [ '$scope', '$http', function ( $scope, $http ) {
	$scope.showMoreTab = [];
	$scope.submit2 = false;
	$scope.todos = [];
	$http.get( '/api/todos' )
		.then( function ( result, err ) {
			if(err){
				$scope.todos = [];
			}
			$scope.todos = result.data;
			$scope.$parent.todos = $scope.todos;
			$scope.$parent.add = false;
		} );
	$scope.todoClicked = function ( id ) {
		if ( !$scope.showMoreTab[ id ] ) {
			$scope.showMoreTab[ id ] = true;
			angular.forEach( $scope.todos, function ( todo ) {
				if ( id !== todo._id ) {
					$scope.showMoreTab[ todo._id ] = false;
				}
			} );
		} else {
			$scope.showMoreTab[ id ] = false;
		}
	}

	$scope.addSubtasks = function ( id, task, validity ) {
		if ( !validity ) {
			$scope.submit2 = true;
			return false;
		} else {
			var stop = false;
			$scope.submit2 = !$scope.submit2;
			angular.forEach( $scope.todos, function ( todo ) {
				if ( !stop && todo._id === id ) {
					stop = true;
					todo.subtasks.push( task );
					todo.task = '';
				}
			} );
		}
	}

	$scope.$parent.$watch( [ '$scope.$parent.add', function ( nv, ov ) {
		if ( nv ) {
			console.log( "true" );
			console.log( true );
		} else {
			console.log( "false" );
			console.log( false );
		}
	} ] );
} ] );


app.controller( 'todoController', [ '$scope', '$http', function ( $scope, $http ) {

	$scope.submit1 = false;

	var dummyTask = function ( task ) {
		var o = {};
		o.name = task;
		o.done = false;
		o.subtasks = [];
		return o;
	}

	$scope.addMainTask = function ( task, validity ) {
		if ( !validity ) {
			$scope.submit1 = true;
			return false;
		} else {
			$scope.$parent.todos.push( dummyTask( task ) );
			$scope.$parent.add = true;
			$scope.newTodo = '';
			console.log( "scope" );
			console.log( $scope );
			$http.post('/api/todos',dummyTask(task)).then(function(data,err){
				console.log("post error");console.log(err);
				console.log("post result");console.log(data);
			});
		}
	}
} ] );
