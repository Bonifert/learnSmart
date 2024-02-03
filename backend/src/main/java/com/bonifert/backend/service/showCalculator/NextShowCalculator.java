package com.bonifert.backend.service.showCalculator;

import com.bonifert.backend.model.Review;

import java.time.LocalDateTime;
import java.util.List;

public interface NextShowCalculator {
  LocalDateTime calculate(List<Review> reviews);
}
