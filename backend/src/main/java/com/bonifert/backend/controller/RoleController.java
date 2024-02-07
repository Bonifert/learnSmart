package com.bonifert.backend.controller;

import com.bonifert.backend.model.user.Role;
import com.bonifert.backend.service.repository.RoleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
public class RoleController {
  private final RoleRepository repository;

  public RoleController(RoleRepository repository) {
    this.repository = repository;
  }

  @PostMapping
  public ResponseEntity<Void> createUserRole() {
    Role role = new Role();
    role.setName("ROLE_USER");
    repository.save(role);
    return ResponseEntity.ok().build();
  }
}
