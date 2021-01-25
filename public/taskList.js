const url = window.location.href;
const myUrl = new URL(url);
let g_id = myUrl.searchParams.get('id');

//load entire task list it is in an onload function with the index page
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
    
    };
//function to return to home page
    function returnToIndex(){
        location.href = "index.html";

   };

  
   //gets the list and then appends the div to load the actual tasks on the page    
    function taskList(){
        getToDoList().then(function(body){
            
            
            for(let i = 0; i < body.length; i++){
                console.log(body[i].itemName); 
                let listDiv = document.getElementById("taskList");
                let itemHTML = `
                <div class = "toDoItem" data-id="${body[i]._id}">
                <div class = "row">
                     <div class ="toDo  col-md-3">To Do: ${body[i].itemName}</div>
                     <div class = "who  col-md-3">Who's doing it: ${body[i].assignee}</div>
                     <div class ="importance  col-md-2">Priority: ${body[i].itemPriority} </div>
                     <div class = col-md-2">
                     <input type = "checkbox" class = "completed" name = "completed" id = "completed">
                                 <labelfor = "completed">Completed</label> 
                     </div>           
                     <div class="delete col-12 col-md-1" id = "delete" data-id="${body[i]._id}"  ><i class="fas fa-trash" data-id="${body[i]._id}"></i></div>     
                     <div class="edit  col-md-1" data-id="${body[i]._id}"><a href="./update.html?id=${body[i]._id}" data-id="${body[i]._id}">Edit</a></div>
              </div>
            </div>`;

             listDiv.innerHTML += itemHTML;
            }

            //adds the event listener to the added delete buttons so items can be deleted when trash can is clicked
    let deleteButtons = document.getElementsByClassName("delete"); 
        for(let i = 0; i < deleteButtons.length; i++){
            deleteButtons[i].addEventListener("click", function(event){
                deleteItem(event.target.dataset.id); 
                console.log(event.target);
                
            });
            
        }
        }).catch(function(err){
            console.log(err); 
        }); 
    }
   

    //add event listener for checkboxes
    // let checkbox = document.getElementsByClassName("completed"); 
    //     for(let i = 0; i < checkbox.length; i++){
    //         checkbox[i].addEventListener('change', function(event){
    //             if (event.target.checked){
    //                 checkCompleted();
    //             }
                
    //         });
            
    //     }
        
       

    
       
//async add task funtion
       async function addTask(){
        let task = {
                         
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
//function to save the item and then redirect to the index page
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
//async button for checkbox
    // async function checkCompleted(){
    //     let completed = {
    //        completed = true, 
    //     }
    //     let requestOptions = {
    //     method: "PATCH",
    //     headers: {"Content-Type": "application/json"}
    //     }
        
    //     const response = await fetch("/items/:id", requestOptions);
    //     const body = await response.json();
    //     if(response.status != 200){
    //         throw Error(body.message);
    //     }
    //     return body;
        
    //     }
    //     function returnToIndex(){
            
    
    //    };
 
       

   
    // document.getElementById("completed").addEventListener("change", function (event){
    //     event.preventDefault();
    //     checkCompleted();
    // });


//delete item function
async function deleteItemRequest(id){

    let requestOptions = {
    method  : "DELETE",
    //body    : JSON.stringify(data),
    headers : {"Content-Type": "application/json"}
    }
    console.log("About to fetch");
    const response = await fetch('/items/' + id, requestOptions);
    console.log(response);

    return false;
    
    
        
//confirms intent, then deletes item if confirmed, returns to index to updated task list
    };
    function deleteItem(id){
        confirm("Are you sure you want to delete?");
        
        deleteItemRequest(id).then(function(success){
            alert("deleted")
            returnToIndex();
        }).catch(function(error){
            console.log(error);
        })
    }
//retrieves single item for update page
    async function getSingleItem(){
        

        let requestOptions = {
            method : 'GET',
            headers: {"Content-Type" : "application/json"},
        }
        console.log("get one item")
        const response = await fetch('/item/' + g_id, requestOptions);
        const body = await response.json();
        if(response.status != 200){
            throw Error(body.message);
        }
        return body;
    };
//loads the update page with input fields loaded with the item content   
    function updateUI(){
    let itemName = document.getElementById("itemName");
    let assignee = document.getElementById("assignee");
   // let itemPriority = document.getElementId("itemPriority");
//    let completed = document.getElementById("completed");
    
    getSingleItem().then(function(item) {    
        itemName.value = item.itemName;
        assignee.value = item.assignee;
        //itemPriority.value = item.itemPriority;
        completed.value = item.completed;
        console.log("retrieved?")
        console.log(item);
    }).catch(function(err){
        console.log(err);
    })
}

       
        
//async funtion to edit items    
    async function editItem() {
        let taskUpdate = {
                         
            itemName      : document.getElementById("itemName").value,
            assignee      : document.getElementById("assignee").value,
            itemPriority  : document.getElementById("priority").value,
            completed     : document.getElementById("completed").value, 
         }
        let requestOptions = {
        method: "PUT",
        body: JSON.stringify(taskUpdate),
        headers: { "Content-Type": "application/json" },
        };
        console.log("after request");

        const response = await fetch("/update/" + g_id, requestOptions);
        console.log(taskUpdate);
        //const body = await response.json();
        if (response.status != 200) {
            console.log("if after await")
        throw Error("Not updated");
        }
        
        console.log("Hey, we did it!");
        return ;
        };


   //takes the information from the input fields and updates them, should return to index page and load updated list.
        function updateItem(){
            
            console.log("new value?");
          
        editItem().then( function()
        {
           
            returnToIndex();
        }).catch(function (err){
            console.log(err)
        
        });
    };

    



       