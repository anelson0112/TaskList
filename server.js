//require mongoose- translates built in to  Node.JS
const mongoose = require('mongoose'); 
mongoose.set('useFindAndModify', false);

const bodyParser = require('body-parser');
//call in Schemas models
var Item = require('./Models/ToDoItem.js');
var List = require('./Models/ToDo.js');
//require express
const express = require('express');

//add path library
const path = require ('path');

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

app.get('/update', function( request,response){
    
    Item.findById (function (err, items){
        if (err) return console.error(err);
        response.send(items);
    });
});

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

app.put('/items', function(request, response){
    let id = req.params.id;

    Item.findByIdAndUpdate(_id ,{"completed" : booleanValue},function (err, item){
    
    
         if (err){ return console.error(err);
        console.log(item);
        item.save();
    } 
    response.send(item);
})
    
});

// app.delete('/items', function(request, response){
//     Item.findOneAndUpdate ({itemName: require.params.id}, {completed: }, function (err, item){
//         if (err) return console.error(err);
//         console.log(item);
//        item.save();
//})
//finds all Low priority items
/*app.get('/items/', function( request,response){
    
    Item.find ({itemPriority : "Low"},function (err, items){
        if (err) return console.error(err);
        console.log(items);
        response.send(items);
    });
});
//finds grocery shopping
app.get('/items/grocery/', function( request,response){
    let searchKey = new RegExp ('groc', 'i');
    Item.find ({itemName: searchKey },function (err, items){
        if (err) return console.error(err);
        console.log(items);
        response.send(items);
    });
});*/

/*document.getElementById("addTask").onclick = function(){
    location.href = '/add.html';
}*/
/*app.get('/items/', (request, response) => {
    Item.find({_id: request.params.id}).exec((err, item) => {
    if (err) return console.error(err);
    response.send(item);
    })
    });*/
    

    
//connects to the database one time, runs the method and stops
/*db.once('open', function(){
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
//save items
    item1.save(function(err,item){
        //prints error if fails
    if (err) return console.error(err);
        //prints this string if success
    console.log(item);
        });
    
    item2.save(function(err,item){
        if (err) return console.error(err);
        console.log(item);
        });
//create new list
var myList = new List({
    name  : "Al's list",
    items : [
        {item : item1._id},
        {item : item2._id},
            ],
    });

//saves list
myList.save(function(err,list){
    //prints error if fails
    if (err) return console.error(err);
    //prints this string if success
    console.log("list saved");
    console.log(list);


    });
    console.log(myList);
 //adding new items for a new list, saves items and new list   
let holiday1 = new Item ({
    itemName    : "Parent Gifts",
    assignee    : "Me",
    itemPriority: "Medium",
    completed   : false,
});
//save
holiday1.save(function(err,item){
    if (err) return console.error(err);
    console.log(item);
        });

        //add item
let holiday2 = new Item ({
    itemName      : "Josh Gifts",
    assignee      : "Me",
    itemPriority  : "High",
    completed     : false, 

});
//save
holiday2.save(function(err,item){
    if (err) return console.error(err);
    console.log(item);
        });
//add item
let holiday3 = new Item ({
            itemName      : "Frankie Gifts",
            assignee      : "Me",
            itemPriority  : "High",
            completed     : false,         

});
//save
holiday3.save(function(err,item){
    if (err) return console.error(err);
    console.log(item);
        });
// make new list
        var holidayList = new List({
            name  : "Holidays",
            items : [
                {item : holiday1._id},
                {item : holiday2._id},
                {item : holiday3._id}
                    ],
            }); 

 
//save new list
holidayList.save(function(err,list){
        if (err) return console.error(err);
        console.log("Holiday list");
        console.log(list);
            
            
                });
                console.log(holidayList);    
                
 //call method from the itemSchema

 item1.doIt();

 holiday1.doIt();

//find item by name and print it

 Item.find ({itemName : 'Grocery Shopping'},function (err, items){
     if (err) return console.error(err);
     console.log(items);
 });

 //find by id and print it
 Item.findById(item2._id, function(err, item){
     if (err)
         return console.error(err);
         console.log(item);
     
 });
 
//find item and update it and save it
 Item.findOneAndUpdate ({itemName: "Do Dishes"}, {itemPriority: "Low"}, function (err, item){
     if (err) return console.error(err);
     console.log(item);
    item.save();
    
 });
//find by id and update and save in the same funtion
 Item.findById(holiday2._id, function (err, item){
     item.set ({assignee: "You"});

     item.save(function (err, updatedItem){
         if (err) return console.err(err);
         console.log(updatedItem);
     });
 });


//delete item
Item.deleteOne({itemName : "Parent Gifts"}, function(err,items){
    if (err) console.error(err);
    console.log(items);
});
           
});*/
