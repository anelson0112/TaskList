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
    completed : Boolean,

},
{
    timestamps : true,
}
);
//export task schema
module.exports = mongoose.model("Item", itemSchema);