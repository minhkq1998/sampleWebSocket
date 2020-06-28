package com.example.test.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.test.model.Product;

public interface ProductRespository extends JpaRepository<Product, Integer> {
  
}
