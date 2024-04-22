package com.bonifert.backend.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;

public class AuthTokenFilter extends OncePerRequestFilter {
  private final UserDetailsService userDetailsService;
  private final JwtUtils jwtUtils;

  public AuthTokenFilter(UserDetailsService userDetailsService, JwtUtils jwtUtils) {
    this.userDetailsService = userDetailsService;
    this.jwtUtils = jwtUtils;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
    String authHeader = request.getHeader("Authorization");
    String bearerString = "Bearer ";
    if (authHeader == null || !authHeader.startsWith(bearerString)) {
      filterChain.doFilter(request, response);
      return;
    }
    String jwt = authHeader.substring(bearerString.length());
    Jws<Claims> claimsJws = jwtUtils.validateJwtToken(jwt);
    String username = jwtUtils.getUsername(claimsJws);
    UserDetails user = userDetailsService.loadUserByUsername(username);
    Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user, null, authorities);
    SecurityContextHolder.getContext().setAuthentication(token);
    filterChain.doFilter(request, response);
  }
}
