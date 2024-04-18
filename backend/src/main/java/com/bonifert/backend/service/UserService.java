package com.bonifert.backend.service;

import com.bonifert.backend.dto.user.NewUserDTO;
import com.bonifert.backend.exception.DuplicatedException;
import com.bonifert.backend.model.user.Role;
import com.bonifert.backend.model.user.UserEntity;
import com.bonifert.backend.service.repository.RoleRepository;
import com.bonifert.backend.service.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
    if (userRepository.findByUserName(newUserDTO.userName()).isPresent()) {
      throw new DuplicatedException("Username is already used.");
    }
    UserEntity userEntity = new UserEntity();
    userEntity.setUserName(newUserDTO.userName());
    userEntity.setPassword(passwordEncoder.encode(newUserDTO.password()));
    Optional<Role> role = roleRepository.findByName("ROLE_USER");
    if (role.isPresent()) {
      userEntity.addRole(role.get());
    }
    else {
      Role userRole = new Role(); // is it good?
      userRole.setName("ROLE_USER");
      roleRepository.save(userRole);
      userEntity.addRole(userRole);
    }
    return userRepository.save(userEntity).getId();
  }
}
