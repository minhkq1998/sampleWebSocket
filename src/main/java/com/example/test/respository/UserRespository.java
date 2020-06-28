package com.example.test.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.test.model.User;

public interface UserRespository extends JpaRepository<User, Integer> {

}
