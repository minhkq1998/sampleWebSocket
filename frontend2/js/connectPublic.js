'use strict';

var url = 'http://localhost:8080';
var connectingElement = document.querySelector('#connecting');
var messageArea = document.querySelector('#messageArea');
var messageForm = document.querySelector('#messageForm');
var stompClient = null;
var selectedUser = null;
var selectRole = null;
var pId = 0;

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
    stompClient.connect({"user" : selectedUser, "password" : password}, onConnected, onError);       
}

function onConnected() {
    let title = document.querySelector('#user');
    if(title != null){
        title.innerHTML = 'PublicPage ' + selectedUser;
    }
    title = document.querySelector('#username');
    if(title != null){
        title.innerHTML = selectedUser;
    }
    title = document.querySelector('#userRole');
    if(title != null){
        title.innerHTML = selectRole;
    }
    var connectingElement = document.querySelector('#connecting');
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/publicPage', onMessageReceived);
    
    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
    {},
    JSON.stringify({sender: selectedUser, type: 'JOIN'})
    )
    connectingElement.style.display = "none" ;
}

function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    
    var messageElement = document.createElement('li');
    messageElement.id = 'li'+pId;
    if(message.type === 'JOIN') {
        
    } else if(message.type === 'CHAT') {

        var usernameElement = document.createElement('strong');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);

        var textElement = document.createElement('span');
        textElement.id = "text" + pId;
        var messageText = document.createTextNode(' ' + message.content + ' ');
        textElement.appendChild(messageText);    
        messageElement.appendChild(textElement);
        
        var buttonElement = document.createElement('button');
        buttonElement.id = pId;
        buttonElement.innerHTML = "Accept";
        buttonElement.onclick = function(){
            sendRequest(message.manager , message.sender, this.id) ;
          };
        messageElement.appendChild(buttonElement);

        messageArea.appendChild(messageElement);
        pId += 1;

        messageArea.scrollTop = messageArea.scrollHeight;
    }
  
}

function sendRequest(manager , sender, clickId){
    console.log("connecting to chat..." + clickId);
    var messageContent = "Want to connect to";
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: selectedUser,
            content: messageContent,
            type: 'REQUEST',
            to : manager,
            from : sender
        };
        stompClient.send("/app/chat.sendConvert", {}, JSON.stringify(chatMessage));
    }

}