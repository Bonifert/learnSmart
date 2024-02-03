package com.bonifert.backend.service;

import com.bonifert.backend.dto.user.NewUserDTO;
import com.bonifert.backend.model.UserEntity;
import com.bonifert.backend.service.repository.UserEntityRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private final UserEntityRepository userEntityRepository;

  public UserService(UserEntityRepository userEntityRepository) {
    this.userEntityRepository = userEntityRepository;
  }

  public long create(NewUserDTO newUserDTO) {
    UserEntity userEntity = new UserEntity();
    userEntity.setName(newUserDTO.name());
    return userEntityRepository.save(userEntity).getId();
  }
}
