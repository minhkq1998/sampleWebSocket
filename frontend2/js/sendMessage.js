'use strict';
var url = 'http://localhost:8080';

function addProduct(event) {
    let productName = document.getElementById("productName").value;
    let description = document.getElementById("description").value;
    let manager = document.getElementById("manager").value;
/*  
 $.ajax({ 
     url : url + "/addProduct/", 
     method : 'POST',
     headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json'},
     data : JSON.stringify({ name: productName, des: description, manager: manager })
    }, function (response) {
        
    }).fail(function (error) {
        if (error.status === 400) {
            alert("Not add a product!")
        }
    })
*/
    var messageContent = productName.trim() + " " + description.trim();
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: selectedUser,
            content: productName + " " + description + " PENDING",
            type: 'CHAT',
            manager: manager
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        document.querySelector('#productName').value = '';
        document.querySelector('#description').value = '';
        document.querySelector('#manager').value = '';
    }
    event.preventDefault();
}

function addUser() {
    let name = document.getElementById("name").value;
    let role = document.getElementById("role").value;
    
    $.ajax({ 
        url : url + "/addUser/", 
        method : 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json'},
        data : JSON.stringify({ name: name, role: role })
    }, function (response) {
    }).fail(function (error) {
        if (error.status === 400) {
            alert("Not add a User!")
        }
    })
}

messageForm.addEventListener('submit', addProduct, true);
