const mongoose = require('mongoose'); 
mongoose.set('useFindAndModify', false);

//call in Schemas models
var Item = require('./Models/ToDoItem.js');
var List = require('./Models/ToDo.js');
//require express
const express = require('express');

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

db.once('open', function(){
    //test to see we're connected. 
    console.log("We're connected");

    let item4 = new Item({
        itemName      : "Dust",
        assignee      : "Me",
        itemPriority  : "Low",
        completed     : false,
       });
   
       let item5 = new Item ({
           itemName      : "Make the Soup",
           assignee      : "Me",
           itemPriority  : "High",
           completed     : false, 
       });

       let item6 = new Item({
        itemName      : "Wash the car",
        assignee      : "Me",
        itemPriority  : "Medium",
        completed     : false,
       });
   
       let item7 = new Item ({
           itemName      : "Nap",
           assignee      : "Me",
           itemPriority  : "High",
           completed     : false, 
       });

item4.save();
item5.save();
item6.save();
item7.save();
});
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
