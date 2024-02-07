package com.bonifert.backend.service;

import com.bonifert.backend.dto.user.NewUserDTO;
import com.bonifert.backend.exception.NotFoundException;
import com.bonifert.backend.model.user.Role;
import com.bonifert.backend.model.user.UserEntity;
import com.bonifert.backend.service.repository.RoleRepository;
import com.bonifert.backend.service.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Transactional
  public long register(NewUserDTO newUserDTO) {
    UserEntity userEntity = new UserEntity();
    userEntity.setName(newUserDTO.name());
    userEntity.setPassword(passwordEncoder.encode(newUserDTO.password()));
    Role role = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new NotFoundException("TODO"));
    userEntity.addRole(role);
    return userRepository.save(userEntity).getId();
  }

  @Transactional
  public void addRoleToUser(long userId) {
    UserEntity user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("TODO"));
    Role role = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new NotFoundException("TODO"));
    user.addRole(role);
    userRepository.save(user);
  }

}
