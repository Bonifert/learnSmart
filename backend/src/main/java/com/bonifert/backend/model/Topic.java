package com.bonifert.backend.model;

import com.bonifert.backend.model.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Topic {
  @Id
  @GeneratedValue
  private Long id;
  private String name;
  @ManyToOne
  private UserEntity userEntity;
  @CreationTimestamp
  private LocalDateTime createdAt;
  @UpdateTimestamp
  private LocalDateTime modifiedAt;
  @OneToMany(mappedBy = "topic")
  private List<Term> terms;
}
