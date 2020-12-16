// const url = window.location.href;
// const myUrl = new URL(url);
// let id = myUrl.searchParams.get('id');

async function getSingleItem(){
    let requestOptions = {
        method : 'GET',
        headers: {"Content-Type" : "application/json"},
    }
    console.log("step one")
    const response = await fetch("/update/" +id, requestOptions);
    //const body = await response.json();
    if (response.status != 200){
           
       throw Error("Error adding");
   }
   return true ;
}


let updateName = document.getElementById("updateName");
let updateAssignee = document.getElementById("updateAssignee");
// let prioritySelect = document.getElementId("updateItemPriority");
// let completedSelect = document.getElementById("completed");

getSingleItem().then(function() {    
    updateName.value = body[i].itemName;
    updateAssignee.value = item.assignee;
    updateItemPriority.value = item.itemPriority;
    updateComplete = item.completed;
}).catch(function(err){
    console.log(err);
})

editItem().then( function(){
    
    returnToIndex();
}).catch(function (err){

});

async function editItem() {
    let selectedItem = {
    itemName : document.getElementById("updateName").value,
    assignee : document.getElementById("updateAssignee").value,
    itemPriority : document.getElementId("updateItemPriority"),
    completionStatus : document.getElementById("completed"),
    };
    let header = {
    method: "PUT",
    body: JSON.stringify(selectedItem),
    headers: { "Content-Type": "application/json" },
    };
    const response = await fetch("/update/" + itemId, header);
    if (response.status != 200) {
    throw Error("Nope");
    }
    returnToIndex();
    console.log("Hey, we did it!");
    return selectedItem;
    }