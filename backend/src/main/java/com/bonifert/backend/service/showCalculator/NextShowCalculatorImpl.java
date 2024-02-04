package com.bonifert.backend.service.showCalculator;

import com.bonifert.backend.model.Review;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NextShowCalculatorImpl implements NextShowCalculator {
  @Override
  public LocalDateTime calculate(List<Review> reviews) { // TODO: create a forgetting curve implementation
    return LocalDateTime.now().plusHours(reviews.size() * 6L);
  }
}
