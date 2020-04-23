
var express = require('express');
var server= express();
var mysql = require('mysql');
var app = express();
server.listen(8080);
var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "association2"
  });
app.get('/index.js/:level', function(request, response) {
    var p1 = request.params.level; 
    var query = connection.query('SELECT * FROM eleve WHERE id_niveau='+p1, function(err, result) {
        return result
      
    });
    response.sendFile( __dirname  + '/index.js');  
        }
      );
    


