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
    
    function clickButton(){
        getToDoList().then(function(body){
            let x = '';
            for(let i = 0; i < body.length; i++){
                console.log(body[i].itemName); 

                
                
                document.getElementById("taskList").innerHTML = 
                //body[i].itemName + " " + body[i].assignee + " " + body[i].itemPriority;

                `To do: ${body[i].itemName} - Assigned to: ${body[i].assignee} - Priority ${body[i].itemPriority}`;
            }
            //let myObjs = JSON.stringify(body); 
            //document.body.append(myObjs); 
            console.log(body); 
        }).catch(function(err){
            console.log(err); 
        }); 
       }
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