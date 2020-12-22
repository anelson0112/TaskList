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
function saveAndRedirect(){
    addTask().then(function(){
         returnToIndex(); 
    }).catch(function(err){
        //handle errors
    })
}

let form = document.getElementById("taskForm");
if(form)
document.getElementById("taskForm").addEventListener('submit', function(event){
 event.preventDefault();
 saveAndRedirect(); 
}); 
async function addTask(){
    let task = {
                     //this.
       itemName      : document.getElementById("itemName").value,
       assignee      : document.getElementById("assignee").value,
       itemPriority  : document.getElementById("itemPriority").value,
    }

    let addOptions = {
        method   : "POST", 
        body     : JSON.stringify(task),
        headers  : {"Content-Type" : "application/json"},
    }
    console.log(task);
    const response = await fetch("/items", addOptions);

    if (response.status != 200){
     
        throw Error("Error adding");
    }
    return console.log(task);
    

    
};






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
let taskHTML = `
<div class="task" data-id="${task._id}">
    <div class="row">
        <div class="name col-12 col-md-4">${task.name}</div>
        <div class="assignee col-12 col-md-2">${task.assignedTo}</div>
        <div class="priority ${task.priority.toLowerCase()} col-12 col-md-2">${task.priority}</div>
        <div class="completed col-12 col-md-2" data-completed="${task.completed}" onclick="toggleCompleted(this)"><i class="fas fa-check-circle"></i></div>
        <div class="edit col-12 col-md-1"><a href="./edit.html?id=${task._id}"><i class="fas fa-edit"></i></a></div>
        <div class="delete col-12 col-md-1" onclick="deleteTask(this)"><i class="fas fa-trash"></i></div>
    </div>
</div>
`;
listContainer.innerHTML += taskHTML;


///////////////////////////////////

app.put("/update/:id", function (req, res) {
    let updated = new Item(req.body);
    Item.findOne({ _id: req.params.id }).exec((err, item) => {
    if (err) return console.error(err);
    item.itemName = updated.itemName;
    item.itemPriority = updated.itemPriority;
    item.assignee = updated.assignee;
    item.completionStatus = updated.completionStatus;
    try {
    res.sendStatus(200);
    item.save();
    } catch {
    res.sendStatus(500);
    }
    });
    });

    async function editItem() {
        let selectedItem = {
        itemName: document.getElementById("itemName").value,
        assignee: document.getElementById("assignee").value,
        itemPriority: document.getElementById("itemPriority").value,
        completionStatus: document.getElementById("completed").value,
        };
        let header = {
        method: "PUT",
        body: JSON.stringify(selectedItem),
        headers: { "Content-Type": "application/json" },
        };
        const response = await fetch("/update/" + itemId, header);
        if (response.status != 200) {
        throw Error("We were unsuccessful with your update");
        }
        console.log("Hey, we did it!");
        return selectedItem;
        } 