//require mongoose- translates built in to  Node.JS
const mongoose = require('mongoose'); 
mongoose.set('useFindAndModify', false);
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
holiday1.save(function(err,item){
    if (err) return console.error(err);
    console.log(item);
        });
let holiday2 = new Item ({
    itemName      : "Josh Gifts",
    assignee      : "Me",
    itemPriority  : "High",
    completed     : false, 

});

holiday2.save(function(err,item){
    if (err) return console.error(err);
    console.log(item);
        });

let holiday3 = new Item ({
            itemName      : "Frankie Gifts",
            assignee      : "Me",
            itemPriority  : "High",
            completed     : false,         

});

holiday3.save(function(err,item){
    if (err) return console.error(err);
    console.log(item);
        });

        var holidayList = new List({
            name  : "Holidays",
            items : [
                {item : holiday1._id},
                {item : holiday2._id},
                {item : holiday3._id}
                    ],
            }); 

 

holidayList.save(function(err,list){
        if (err) return console.error(err);
        console.log("Holiday list");
        console.log(list);
            
            
                });
                console.log(holidayList);    
                
 //creating a method 
/*itemSchema.methods.doIt = function () {
     let reminder;
     if (this.completed === false){
         reminder = "You need to do" + this.itemName;
     } else {
         reminder = "Way to go" + this.itemName + "is done!"
     };
     console.log(reminder);

    };*/

 item1.doIt();

 holiday1.doIt();

 //find an item
 /*Item.find ({
     itemName: "Do dishes"
 })
 .then (doc => {
     console.log(doc)
 })
 .catch (err => {
     console.error(err)
 })*/

 Item.find ({itemName : 'Grocery Shopping'},function (err, items){
     if (err) return console.error(err);
     console.log(items);
 });
 

 Item.findOneAndUpdate ({itemName: "Do Dishes"}, {itemPriority: "Low"}, function (err, item){
     if (err) return console.error(err);
     console.log(item);

    
     
 });
//updateing dishes name from "Do dishes to dishes"
/* Item.findByIdAndUpdate(
     {itemName : "Do Dishes"},
     {itemName : "dishes" },
 )
 .then(function(item) {
     console.log (item)
 })
 .catch(err=> {
     console.error(err)
 });*/
 

            

//delete method
Item.deleteOne({itemName : "Parent Gifts"}, function(err,items){
    if (err) console.error(err);
    console.log(items);
});
           
});
