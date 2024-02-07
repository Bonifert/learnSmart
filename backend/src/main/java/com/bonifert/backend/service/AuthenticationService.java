package com.bonifert.backend.service;

import com.bonifert.backend.dto.user.LoginUserDTO;
import com.bonifert.backend.security.jwt.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;

  public AuthenticationService(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
    this.authenticationManager = authenticationManager;
    this.jwtUtils = jwtUtils;
  }

  public String login(LoginUserDTO loginUserDTO) {
    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            loginUserDTO.name(),
            loginUserDTO.password()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    return jwtUtils.generateJwtToken(authentication); // is it good? I give the user instead of authentication
  }

  // TODO: getUser method from SecurityContextHolder
}
