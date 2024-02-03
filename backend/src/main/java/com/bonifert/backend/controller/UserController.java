package com.bonifert.backend.controller;

import com.bonifert.backend.dto.user.NewUserDTO;
import com.bonifert.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/user")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity<Void> create(NewUserDTO newUserDTO) {
    long id = userService.create(newUserDTO);
    return ResponseEntity.created(URI.create(String.format("/api/user/%d", id))).build();
  }
}
