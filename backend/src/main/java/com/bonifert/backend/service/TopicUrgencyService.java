package com.bonifert.backend.service;

import com.bonifert.backend.model.Term;
import com.bonifert.backend.model.Topic;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TopicUrgencyService {
  public String calculateUrgency(Topic topic) {
    int expiredCounter = 0;
    List<Term> terms = topic.getTerms();
    for (Term term : terms) {
      if (term.getNextShowDateTime().isBefore(LocalDateTime.now())) {
        expiredCounter++;
      }
    }
    if (expiredCounter == 0) {
      return "Optional";
    }
    if ((expiredCounter / (double) terms.size()) * 100 < 30) {
      return "Consider";
    }
    return "Prioritize";
  }
}
