//require mongoose- translates built in to  Node.JS
const mongoose = require('mongoose'); 

//connect to the cluster I created in Atlas
const mongoDB = "mongodb+srv://anelson0112:10qpalzm7YGV@taskcluster.7xytg.mongodb.net/TaskListdb?retryWrites=true&w=majority";
//call in Schemas
var Item = require('./Models/ToDoItem.js');
var List = require('./Models/ToDo.js');
//accessing the connect method of mongoose
//pass it the name of the DB cluster we have created
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

//turns on the connection

db.on('error', console.error.bind(console, 'connection error:'));

//connects to the database one time, runs the method and stops

db.once('open', function(){
    //test to see we're connected. 
    console.log("We're connected");
//new task item
    let item1 = new Item({
     itemName      : "Do Dishes",
     assignee      : "Me",
     itemPriority  : "High",
     completed     : false,
    });

    let item2 = new Item ({
        itemName      : "Grocery Shopping",
        assignee      : "Me",
        itemPriority  : "Low",
        completed     : false, 
    });

    item1.save(function(err,item){
    if (err) return console.error(err);
    console.log("item1 saved");
        });
    
    item2.save(function(err,item){
        if (err) return console.error(err);
        console.log("Groceries saved");
        });

var myList = new List({
    name  : "Al's list",
    items : [
        {item : item1._id},
        {item : item2._id},
            ],
    });


myList.save(function(err,list){
    if (err) return console.error(err);
    console.log("list saved");


    });
    console.log(myList);
    
});
