package com.bonifert.backend.controller;

import com.bonifert.backend.dto.user.LoginUserDTO;
import com.bonifert.backend.service.AuthenticationService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
  private final AuthenticationService authenticationService;

  public AuthenticationController(AuthenticationService authenticationService) {
    this.authenticationService = authenticationService;
  }

  @PostMapping("/login")
  public ResponseEntity<Void> login(@RequestBody LoginUserDTO loginUserDTO) {
    HttpHeaders jwt = authenticationService.login(loginUserDTO);
    return ResponseEntity.ok().headers(jwt).build();
  }
}
