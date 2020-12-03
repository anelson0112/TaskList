//require mongoose- translates built in to  Node.JS
const mongoose = require('mongoose'); 

//connect to the cluster I created in Atlas
const mongoDB = "mongodb+srv://anelson0112:10qpalzm7YGV@taskcluster.7xytg.mongodb.net/TaskListdb?retryWrites=true&w=majority";

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
//new Schema test
    const taskSchema = new mongoose.Schema ({
        name: String,
        priority : String,

    });


const ToDo = mongoose.model('ToDo', taskSchema);

const laundry = new ToDo ({name : "Laundry"});

const dishes = new ToDo ({name : "dishes"});

console.log(laundry.name);
console.log(dishes.name);

laundry.save(function(err,task){
    if (err) return console.error(err);
    console.log("saved");
});
dishes.save(function(err,task){
    if (err) return console.error(err);
    console.log("saved dishes");
});

});


