package com.bonifert.backend.controller;

import com.bonifert.backend.dto.user.NewUserDTO;
import com.bonifert.backend.dto.user.UserInformationDTO;
import com.bonifert.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/user")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/create")
  public ResponseEntity<Void> register(@Valid @RequestBody NewUserDTO newUserDTO) {
    long id = userService.createUser(newUserDTO);
    return ResponseEntity.created(URI.create(String.format("/api/user/%d", id))).build();
  }

  @GetMapping("/me")
  public ResponseEntity<UserInformationDTO> me() {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ResponseEntity.ok().body(new UserInformationDTO(username));
  }
}
