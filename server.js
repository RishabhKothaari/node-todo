//server.js


var express = require('express');

var app = express();

var mongoose = require('mongoose');

//require /config/db


var methodOverride = require('method-override');

var bodyParser = require('body-parser');

bodyParser.urlencoded({
  'extended':'true'
});

app.use(bodyParser.json());

bodyParser.json({
  type:'application/vnd.api+json'
});

//use static middleware to serve static content.

app.use(express.static(__dirname+'/bower_components'));
app.use(express.static(__dirname+'/public'));


app.get('*',function(req,res) {
  // body...
  res.sendFile('/public/index.html');
})
//require all the routes.

var server = app.listen(3000,function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("I am @:");console.log(host);
  console.log("on port");console.log(port);
});
