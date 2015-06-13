var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;


var todoSchema = new Schema( {
	name: String,
	done: Boolean,
	subtasks: Array
} );


var Todo = mongoose.model( 'Todo', todoSchema );

module.exports = Todo;
