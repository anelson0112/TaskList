

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
                let node = document.createElement('li');
                let box  = document.createElement("INPUT");
                box.setAttribute("type", "checkbox");
                
                
                document.body.appendChild(node).innerHTML = 
                

                `To do: ${body[i].itemName} - Assigned to: ${body[i].assignee} - Priority ${body[i].itemPriority} Completed: ${body[i].completed}`;
                document.body.appendChild(box);
            }
            //let myObjs = JSON.stringify(body); 
            //document.body.append(myObjs); 
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

    /*async function getToDoList(){
 let requestOptions = {
 method : "Get",
 headers : { "Content= Type" : "application.json"}
 }
 
 //calling the API
 const response = await fetch("/items", requestOptions);
 return response;
 
 
}
 
function clickButton(){
 getToDoList().then(function(response){
 if (response.status === 200){
 document.body.append(response);
 console.log("fetching");
 }
 }).catch(function(err){
 console.log(err);
 });
} */

    //response.forEach(body => console.log(body.itemName));

    /*for(let i = 0; i < body.length; i++){
        console.log(body[i].itemName);
        }*/