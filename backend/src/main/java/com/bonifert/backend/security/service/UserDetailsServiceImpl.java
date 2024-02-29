package com.bonifert.backend.security.service;

import com.bonifert.backend.model.user.UserEntity;
import com.bonifert.backend.service.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;

  public UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserEntity user = userRepository.findByUserName(username).orElseThrow(RuntimeException::new);
    List<? extends GrantedAuthority> grantedAuthorities = user.getRoles()
                                                              .stream()
                                                              .map(role -> new SimpleGrantedAuthority(role.getName()))
                                                              .toList();
    return new User(username, user.getPassword(), grantedAuthorities);
  }
}
