package com.bonifert.backend.service;

import com.bonifert.backend.dto.user.LoginUserDTO;
import com.bonifert.backend.exception.NotFoundException;
import com.bonifert.backend.model.user.UserEntity;
import com.bonifert.backend.security.jwt.JwtUtils;
import com.bonifert.backend.service.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpHeaders;

@Service
public class AuthenticationService {
  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;
  private final UserRepository userRepository;

  public AuthenticationService(AuthenticationManager authenticationManager, JwtUtils jwtUtils,
                               UserRepository userRepository) {
    this.authenticationManager = authenticationManager;
    this.jwtUtils = jwtUtils;
    this.userRepository = userRepository;
  }

  public HttpHeaders login(LoginUserDTO loginUserDTO) {
    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            loginUserDTO.name(),
            loginUserDTO.password()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String token = jwtUtils.generateJwtToken(authentication);
    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + token);
    return headers;
  }

  public UserEntity getUser(){
    String userName = SecurityContextHolder.getContext().getAuthentication().getName();
    return userRepository.findByName(userName).orElseThrow(()-> new NotFoundException("User not found"));
  }
}
