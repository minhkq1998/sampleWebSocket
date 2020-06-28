package com.example.test.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
  

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
      registry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS();

  }
  
  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
      registry.setApplicationDestinationPrefixes("/app").setUserDestinationPrefix("/user").enableSimpleBroker("/topic", "/queue","/user");
  }

  @Override
  public void configureClientInboundChannel(ChannelRegistration registration) {
      registration.interceptors(rmeSessionChannelInterceptor());
  }
  
  @Bean
  public RmeSessionChannelInterceptor rmeSessionChannelInterceptor() {
     return new RmeSessionChannelInterceptor();
  }
}
