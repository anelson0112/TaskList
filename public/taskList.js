const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

async function getToDoList(){
    let requestOptions = {
    method: "GET",
    headers: {"Content-Type": "application/json"}
    }
    
    const response = await fetch("/items", requestOptions);
    const body = await response.json();
    if(response.status != 200){
        throw Error(body.message);
    }
    return body;
    
    }
    function returnToIndex(){
        location.href = "index.html";

   };
    
    function taskList(){
        getToDoList().then(function(body){
            
            
            for(let i = 0; i < body.length; i++){
                console.log(body[i].itemName); 
                let listDiv = document.getElementById("taskList");
                let itemHTML = `
                <div class = "toDoItem" data-id="${body[i]._id}">
                <div class = "row">
                     <div class ="toDo  col-md-4">To Do: ${body[i].itemName}</div>
                     <div class = "who  col-md-3">Who's doing it: ${body[i].assignee}</div>
                     <div class ="importance  col-md-2">Priority: ${body[i].itemPriority} </div>
                     <div class = col-md-2">
                     <input type = "checkbox" class = "completion" name = "completed" id = "completed">
                                 <labelfor = "completed">Completed</label> 
                     </div>           
                     
                <div class="edit  col-md-1"><a href="./update.html?id=${body[i]._id}">Edit</a></div>
              </div>
            </div>`;
             listDiv.innerHTML += itemHTML;
                // let node = document.createElement('li');
                // let box  = document.createElement("INPUT");
                // box.setAttribute("type", "checkbox");
                
                
                // document.body.appendChild(node).innerHTML = 
                

                // `To do: ${body[i].itemName} - Assigned to: ${body[i].assignee} - Priority ${body[i].itemPriority} `;
                // document.body.appendChild(box);
            }
            
            console.log(body); 
        }).catch(function(err){
            console.log(err); 
        }); 
       }

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

 async function checkCompleted(){
    let checkbox = document.getElementById("completed");

   
    checkbox.addEventListener("change", function (event){
        if (event.target.checked){
            console.log("checked")
        } else {
            console.log("not checked")
        }
    })
       
     let checkOptions = {
         method : "PUT",
         body   : JSON.stringify(task),
         headers: {"Content-Type" : "application/json"},
     }

     const response = await fetch("items", checkOptions);

     if (response.status != 200){
         throw Error("Error Updating")
     }
     return console.log("Updated");


 }

 async function getSingleItem(id){
     let requestOptions = {
         method : 'GET',
         headers: {"Content-Type" : "application/json"},
     }
     const response = await fetch('/update', requestOptions);
     const body = await response.json();
     if (response.status != 200){
            
        throw Error("Error adding");
    }
    return console.log(task);
 }


let updateName = document.getElementById("updateName");
let updateAssignee = document.getElementById("updateAssignee" );
let updateItemPriority = document.getElementById("updateItemPriority");

getSingleItem().then( function(){
    updateName.value = body.itemName;
    updateAssignee.value = body.assignee;
    updateItemPriority.value = body.itemPriority;
    returnToIndex();
}).catch(function (err){

});

