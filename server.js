//server.js


var express = require( 'express' );

var app = express();

var mongoose = require( 'mongoose' );

//require /config/db
mongoose.connect( "mongodb://rishii:crmcrm@localhost:27017/material-todo" );

var methodOverride = require( 'method-override' );

var bodyParser = require( 'body-parser' );

bodyParser.urlencoded( {
	'extended': 'true'
} );

app.use( bodyParser.json() );

bodyParser.json( {
	type: 'application/vnd.api+json'
} );

//use static middleware to serve static content.

app.use( express.static( __dirname + '/bower_components' ) );
app.use( express.static( __dirname + '/public' ) );

var Todo = require( './models/todos' );
//require all the routes.

//get
app.get( '/api/todos', function ( req, res ) {
	Todo.find( function ( err, todos ) {
		if ( err ) {
			res.send( err );
		}
		res.json( todos );
	} );
} );

//post
app.post( '/api/todos', function ( req, res ) {
  console.log("server");console.log(req.body);
	if ( req.body.name !== undefined ) {
		Todo.create( {
			name: req.body.name,
			done: false,
			subtasks: []
		}, function ( err, todo ) {
			if ( err ) {
				res.send( err );
			}
			Todo.find( function ( err, todos ) {
				if ( err ) {
					res.send( err );
				}
				res.json( todos );
			} )
		} );
	} else {
		res.status( 500 )
			.send( "Cannot add" );
	}
} )

app.get( '*', function ( req, res ) {
	// body...
	res.sendFile( '/public/index.html' );
} )
var server = app.listen( 3000, function () {
	var host = server.address()
		.address;
	var port = server.address()
		.port;

	console.log( "I am @:" );
	console.log( host );
	console.log( "on port" );
	console.log( port );
} );
