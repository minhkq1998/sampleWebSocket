package com.example.test.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;

public class RmeSessionChannelInterceptor implements ChannelInterceptor {

  @Override
  public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
    if (StompCommand.CONNECT.equals(accessor.getCommand())) {
      String user = accessor.getFirstNativeHeader("user");
      String password = accessor.getFirstNativeHeader("password");
      if (!StringUtils.isEmpty(user) && !StringUtils.isEmpty(password)) {
          List<GrantedAuthority> authorities = new ArrayList<>();
          authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
          Authentication auth = new UsernamePasswordAuthenticationToken(user, password, authorities);
          SecurityContextHolder.getContext().setAuthentication(auth);
          accessor.setUser(auth);
      }
    }
    return message;
  }

}
