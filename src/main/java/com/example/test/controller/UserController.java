package com.example.test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.model.Product;
import com.example.test.model.User;
import com.example.test.payload.GoodsRequest;
import com.example.test.payload.UserRequest;
import com.example.test.respository.ProductRespository;
import com.example.test.respository.UserRespository;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
public class UserController {
  
  @Autowired
  private UserRespository userRespository;
  @Autowired
  private ProductRespository productRespository;
  
  @GetMapping("/fetchAllUsers")
  public List<User> fetchAll() {
    List<User> users = userRespository.findAll();
    return users;
  }
  
  @PostMapping("/addProduct/")
  public ResponseEntity<?> addProduct(@RequestBody GoodsRequest goodRequest){
      try {
        Product product = new Product();
        product.setProductName(goodRequest.getName());
        product.setDescription(goodRequest.getDes());
        product.setManager(goodRequest.getManager());
        product.setStatus("PENDING");
        productRespository.save(product);
      } catch (Exception e) {
          return ResponseEntity.badRequest().build();
      }
      return ResponseEntity.ok().build();
  }
  
  @PostMapping("/addUser/")
  public ResponseEntity<?> addUser(@RequestBody UserRequest userRequest){
      try {
        User user = new User();
        user.setName(userRequest.getName());
        user.setRole(userRequest.getRole());
        userRespository.save(user);
      } catch (Exception e) {
          return ResponseEntity.badRequest().build();
      }
      return ResponseEntity.ok().build();
  }
}
