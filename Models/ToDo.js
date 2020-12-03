//require means to include the mongoose module
//node version of JS library
const mongoose = require('mongoose');
//

//set constant for Schemas
const Schema = mongoose.Schema;


const listSchema = new Schema ({
    name   : String,
    items  : [
        {
        item: 
       { type : Schema.Types.ObjectId, ref  : "Item",}
    }
    ],
 });
//export the list schema
 module.exports = mongoose.model("List", listSchema);