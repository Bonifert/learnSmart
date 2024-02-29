package com.bonifert.backend.service.repository;

import com.bonifert.backend.model.Topic;
import com.bonifert.backend.model.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
  List<Topic> getAllByUserEntity(UserEntity user);
}
