package com.bonifert.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Term {
  @Id
  @GeneratedValue
  private Long id;
  @ManyToOne
  private Topic topic;
  private String name;
  private String definition;
  private int learnRate;
  @OneToMany
  private List<Review> reviews;
  private LocalDateTime nextShowDateTime;

  public void addReview(Review review) {
    reviews.add(review);
  }
}
