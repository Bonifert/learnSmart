package com.bonifert.backend.controller;

import com.bonifert.backend.dto.user.LoginUserDTO;
import com.bonifert.backend.dto.user.NewUserDTO;
import com.bonifert.backend.dto.user.UserInformationDTO;
import com.bonifert.backend.service.AuthenticationService;
import com.bonifert.backend.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/user")
public class UserController {
  private final UserService userService;
  private final AuthenticationService authenticationService;

  public UserController(UserService userService, AuthenticationService authenticationService) {
    this.userService = userService;
    this.authenticationService = authenticationService;
  }

  @PostMapping
  public ResponseEntity<Void> register(@RequestBody NewUserDTO newUserDTO) {
    long id = userService.register(newUserDTO);
    return ResponseEntity.created(URI.create(String.format("/api/user/%d", id))).build();
  }

  @PostMapping("/login")
  public ResponseEntity<Void> login(@RequestBody LoginUserDTO loginUserDTO) {
    HttpHeaders jwt = authenticationService.login(loginUserDTO);
    return ResponseEntity.ok().headers(jwt).build();
  }

  @GetMapping("/me")
  public ResponseEntity<UserInformationDTO> me(){
    String userName = SecurityContextHolder.getContext().getAuthentication().getName();
    return ResponseEntity.ok().body(new UserInformationDTO(userName));
  }
}
