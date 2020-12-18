// const urlParams = new URLSearchParams(window.location.search);
//const taskId = urlParams.get('id');
const url = window.location.href;
const myUrl = new URL(url);
let id = myUrl.searchParams.get('id');

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
                     <div class ="toDo  col-md-3">To Do: ${body[i].itemName}</div>
                     <div class = "who  col-md-3">Who's doing it: ${body[i].assignee}</div>
                     <div class ="importance  col-md-2">Priority: ${body[i].itemPriority} </div>
                     <div class = col-md-2">
                     <input type = "checkbox" class = "completion" name = "completed" id = "completed">
                                 <labelfor = "completed">Completed</label> 
                     </div>           
                     <div class="delete col-12 col-md-1" id = "delete" data-id="${body[i]._id}"  ><i class="fas fa-trash" data-id="${body[i]._id}"></i></div>     
                     <div class="edit  col-md-1"><a href="./update.html?id=${body[i]._id}">Edit</a></div>
              </div>
            </div>`;

             listDiv.innerHTML += itemHTML;
            }
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

    // async function checkCompleted(){
    //     let requestOptions = {
    //     method: "GET",
    //     headers: {"Content-Type": "application/json"}
    //     }
        
    //     const response = await fetch("/itemChecked", requestOptions);
    //     const body = await response.json();
    //     if(response.status != 200){
    //         throw Error(body.message);
    //     }
    //     return body;
        
    //     }
    //     function returnToIndex(){
    //         location.href = "index.html";
    
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

    async function getSingleItem(){
        

        let requestOptions = {
            method : 'GET',
            headers: {"Content-Type" : "application/json"},
        }
        console.log("step one")
        const response = await fetch('/item/' + id, requestOptions);
        const body = await response.json();
        if(response.status != 200){
            throw Error(body.message);
        }
        return body;
    };
    
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
        console.log(item);
    }).catch(function(err){
        console.log(err);
    })
}
    
    
    async function editItem() {
       
        let requestOptions = {
        method: "PUT",
        body: JSON.stringify(selectedItem),
        headers: { "Content-Type": "application/json" },
        };
        console/log("are we here?")
        const response = await fetch("/item/" + id, requestOptions);
        const body = await response.json();
        if (response.status != 200) {
        throw Error(body.message);
        }
        
        console.log("Hey, we did it!");
        return body;
        };


   
        function updateItem(){
            let itemName = document.getElementById("itemName").value;
            let assignee = document.getElementById("assignee").value;
            let itemPriority = document.getElementById("itemPriority").value;
            let completed = document.getElementById("completed").value;

        editItem().then( function(item){
            itemName.value = item.itemName;
            assignee.value = item.assignee;
            itemPriority.value = item.completed;
            completed.value = item.completed;
            console.log(item);

        
            returnToIndex();
        }).catch(function (err){
            console.log(err)
        
        });
    };

    let update = document.getElementById("updateItem");
    if (update)
    document.getElementById("updateItem").addEventListener('submit', function (event){
        event.preventDefault();
        updateItem();
    });

       