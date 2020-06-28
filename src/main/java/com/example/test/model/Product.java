package com.example.test.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
@Entity
public class Product {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int productId;
  private String productName;
  private String status;
  private String description;
  private String manager;
}
