'use strict';

var url = 'http://localhost:8080';
var connectingElement = document.querySelector('#connecting');
var messageArea = document.querySelector('#messageArea');
var messageForm = document.querySelector('#messageForm');
var stompClient = null;
var selectedUser = null;
var selectRole = null;

// Connect to WebSocket Server.
connectToChat();

//ket noi vs chuc nang tro chuyen
function connectToChat() {
    selectedUser = localStorage.getItem("userName");
    var password = localStorage.getItem("password");
    selectRole = localStorage.getItem("role");
    console.log("connecting to chat...")
    //ket noi vs may chu  websocket
    let socket = new SockJS(url + '/ws');
    //may chu stom ket noi vs
    stompClient = Stomp.over(socket);
    stompClient.connect({"user" : selectedUser, "password" : password}, onConnectedUser, onError);
       
}

function onConnectedUser() {
    let title = document.querySelector('#user');
    let add = document.querySelector('#productPage');
    if(title != null) {
        title.innerHTML = 'UserPage ' + selectedUser;
    }
    title = document.querySelector('#username');
    if(title != null) {
        title.innerHTML = selectedUser;
    }
    title = document.querySelector('#userRole');
    if(title != null){
        title.innerHTML = selectRole;
    }
    var connectingElement = document.querySelector('#connecting');

    stompClient.subscribe('/user/queue/chats', onMessageforManager);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
    {},
    JSON.stringify({sender: selectedUser, type: 'JOIN'})
    )
    if(connectingElement != null) {
        connectingElement.style.display = "none" ;
    }

    if(add != null && selectRole != 'ProductOwner') {
        add.style.display = "none" ;
    }

}

function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

function onMessageforManager(payload){
    var message = JSON.parse(payload.body);
    
    var messageElement = document.createElement('li');
  
    if(message.type === 'JOIN') {
        
    } else if(message.type === 'REQUEST') {

        var usernameElement = document.createElement('strong');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);

        var textElement = document.createElement('span');
        var messageText = document.createTextNode(' ' + message.content + ' ');
        textElement.appendChild(messageText);    
        messageElement.appendChild(textElement);

        var managerElement = document.createElement('strong');
        var managerText = document.createTextNode(message.from + ' ');
        managerElement.appendChild(managerText);
        messageElement.appendChild(managerElement);
        
        var buttonElement = document.createElement('button');
        buttonElement.innerHTML = "Approval";
        buttonElement.onclick = function(){
            sendFeedBack("Approval", message.sender, message.from) ;
          };
        messageElement.appendChild(buttonElement);

        var buttonReElement = document.createElement('button');
        buttonReElement.innerHTML = "Reject";
        buttonReElement.onclick = function(){
            sendFeedBack("Reject", message.sender, message.from) ;
          };
        messageElement.appendChild(buttonReElement);

        messageArea.appendChild(messageElement);

        messageArea.scrollTop = messageArea.scrollHeight;
    } else if(message.type === 'FEEDBACK') {

        var textElement = document.createElement('span');
        var messageText = document.createTextNode(' ' + message.content + ' ');
        textElement.appendChild(messageText);    
        messageElement.appendChild(textElement);

    }
    messageArea.appendChild(messageElement);

    messageArea.scrollTop = messageArea.scrollHeight;
}

function sendFeedBack(feedback, vehicleOwner, goodOwner){

    var messageContent = "Your request has been " + feedback;
    if(messageContent && stompClient) {

        var chatMessage = {
            content: messageContent,
            type: 'FEEDBACK',
            to : vehicleOwner
        };
        stompClient.send("/app/chat.sendConvert", {}, JSON.stringify(chatMessage));

        var chatMessage = {
            content: messageContent,
            type: 'FEEDBACK',
            to : goodOwner
        };
        stompClient.send("/app/chat.sendConvert", {}, JSON.stringify(chatMessage));
    }

}
