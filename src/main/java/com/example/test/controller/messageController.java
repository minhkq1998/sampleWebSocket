package com.example.test.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.test.model.Message;

@CrossOrigin(origins="*", maxAge=3600)
@Controller
public class messageController{
  @Autowired
  SimpMessagingTemplate simpMessagingTemplate;
  
  @MessageMapping("/chat.sendToUser")
  public Message processMessageFromClient(@Payload Message chatMessage) throws Exception {

    simpMessagingTemplate.convertAndSend("/queue/chats-" + chatMessage.getTo() , chatMessage);
    return chatMessage;
  }
   
  @MessageMapping("/chat.sendConvert")
  public Message sendMessageToUser(@Payload Message chatMessage) throws Exception {
    simpMessagingTemplate.convertAndSendToUser(chatMessage.getTo() , "/queue/chats" , chatMessage);
    return chatMessage;
  }
  
  @MessageMapping("/chat.sendMessage")
  @SendTo("/topic/publicPage")
  public Message sendMessage(@Payload Message chatMessage) {
      return chatMessage;
  }

  @MessageMapping("/chat.addUser")
  @SendTo("/topic/publicPage")
  public Message addUser(@Payload Message chatMessage) {
      
      return chatMessage;
  }
  
}
