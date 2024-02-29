package com.bonifert.backend.model.user;

import com.bonifert.backend.model.Topic;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
  @Id
  @GeneratedValue
  private Long id;
  @Column(unique = true)
  private String userName;
  private String password;
  @CreationTimestamp
  private LocalDateTime createdAt;
  @OneToMany
  private Set<Topic> topics;
  @ManyToMany(fetch = FetchType.EAGER)
  private Set<Role> roles = new HashSet<>();

  public void addRole(Role role) {
    roles.add(role);
  }
}
