//imports express module
const { response } = require('express');
const express = require('express');

//grants access to all that express has to offer
const app = express();

//declare port we want to connect to
const port = 3000;

//open up server, list on specific id and port
//ip address aka hostnames
app.listen(port, function(){
    console.log("Server is running at " + port)
});

//first API call
app.get('/', function( request, response){
    response.send("Hello World!!");
});

app.get('/name', function( request,response){
    response.send("Al's first API");
});