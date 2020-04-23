var express = require('express');
var server= express();
server.listen(80);
var mySqlClient = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "association2"
  });
server.get('/index.js/:level', function(request, response) {
    var p1 = request.params.level; 
    var selectQuery = 'SELECT * FROM eleve WHERE id_niveau='+p1;
    mySqlClient.query(
        selectQuery,
        function select(error, results, fields) {
          if (error) {
            console.log(error);
            mySqlClient.end();
            return;
          }
            
          if ( results.length > 0 )  { 
            var firstResult = results;
            return firstResult
            
          } else {
            console.log("Pas de données");
          }
          mySqlClient.end();
        }
      );
    response.sendFile( __dirname  + '/appel.js');
  });

