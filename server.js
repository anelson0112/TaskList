//require mongoose- translates built in to  Node.JS
const mongoose = require('mongoose'); 
mongoose.set('useFindAndModify', false);
//returns object AFTER update was applied
mongoose.set('returnOriginal', false);

const bodyParser = require('body-parser');
//call in Schemas models
var Item = require('./Models/ToDoItem.js');
var List = require('./Models/ToDo.js');
//require express
const express = require('express');

//add path library
const path = require ('path');
//const { update } = require('./Models/ToDoItem.js');

//grants access to all that express has to offer
const app = express();

//declare port we want to connect to
const port = 3000;



//connect to the cluster I created in Atlas
const mongoDB = "mongodb+srv://anelson0112:10qpalzm7YGV@taskcluster.7xytg.mongodb.net/TaskListdb?retryWrites=true&w=majority";

//accessing the connect method of mongoose
//pass it the name of the DB cluster we have created
//mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.error(err);
    console.log('Connected to database');
    });
const db = mongoose.connection;

//turns on the connection
db.on('error', console.error.bind(console, 'connection error:'));

//use the following middlware
app.use(
    //middleware for delivering static files
    express.static(
        //uses path library to take care of relative paths
        path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//open up server, list on specific id and port
//ip address aka hostnames
app.listen(port, function(){
    console.log("Server is running at " + port)
});
//finds all the items
app.get('/items', function( request,response){
    
    Item.find (function (err, items){
        if (err) return console.error(err);
        response.send(items);
    });
});
//finding a single item by id
app.get('/item/:id', function(request, response){
    console.log (request.params.id)
    Item.findOne ({_id: request.params.id}, function (err, item){
       
        if (err) { 
            console.error(err);
            return }
        console.log(item);
        response.status(200).send(item);
    });
});

//adding new items to the todo list
app.post('/items', function( request,response){
    let newTask = new Item (request.body);
    newTask.save (function (err, item){
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        response.send(item);
  
    });

});
//trying to update any field of the todo list item
app.put('/update/:id', function(request, response){
   
   let updateItem = {
    //_id:request.params.id,
    itemName: request.body.itemName,
    assignee: request.body.assignee,
    itemPriority: request.body.itemPriority,
   }
    console.log(request.body);
    console.log(request.params.id);
    console.log("put");
    Item.findByIdAndUpdate(
        {_id:request.params.id} , updateItem,
 //A.findOneAndUpdate(conditions, update, options, callback)      
        function (err, item){

        if (err) {
            
            response.sendStatus(500);
            return console.error(err);
            }
      
        
        console.log(item);
        response.status(200);
        
        //response.send(item);
        item.save (function (err, item){
            if (err){
                response.sendStatus(500);
                return console.error(err);
            }
            response.send(item);
        });

    });
});

//deleting a single item
app.delete('/items/:id', function(request, response){
    console.log (request.params.id)
    
    Item.deleteOne ({_id: request.params.id}, function (err){
       
        if (err){ 
            console.error(err);
            return }
        console.log("deleted");
        response.sendStatus(204);
    });
});
//patch sincle item with checkbox
app.patch('/items/:id', function(request, response)
{
    console.log(request.params.id)

    Item.findOneAndUpdate({_id: request.params.id},
        function (err){
            if (err){
                console.error(err);
                return
            }
            console.log("updated");
            response.status(200);
        });
});

 