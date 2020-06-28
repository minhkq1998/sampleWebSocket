package com.example.test.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
  private MessageType type;
  private String content;
  private String manager;
  private String sender;
  private String from;
  private String to;
  public enum MessageType {
    CHAT, JOIN, LEAVE, REQUEST, FEEDBACK
}
}
