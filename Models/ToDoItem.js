//require means to include the mongoose module
//node version of JS library
const mongoose = require('mongoose');
//set constant for Schemas
const Schema = mongoose.Schema;
//create task schemas for our db
const itemSchema = new Schema ({
    
    itemName  : String,
    assignee  : String,
    itemPriority  : {type: String, enum: ['High', 'Medium', 'Low']},
    completed : {type : Boolean, default : false},

},
{
    timestamps : true,
}
);

itemSchema.methods.doIt = function () {
    let reminder;
    if (this.completed === false){
        reminder = "You need to do " + this.itemName;
    } else {
        reminder = "Way to go " + this.itemName + "is done!"
    };
    console.log(reminder);

   };
//export task schema
module.exports = mongoose.model("Item", itemSchema);