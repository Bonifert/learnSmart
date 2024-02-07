package com.bonifert.backend.service;

import com.bonifert.backend.dto.term.NewTermDTO;
import com.bonifert.backend.model.Review;
import com.bonifert.backend.model.Term;
import com.bonifert.backend.model.Topic;
import com.bonifert.backend.service.repository.ReviewRepository;
import com.bonifert.backend.service.repository.TermRepository;
import com.bonifert.backend.service.repository.TopicRepository;
import com.bonifert.backend.service.showCalculator.NextShowCalculator;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TermService {
  private final TermRepository termRepository;
  private final TopicRepository topicRepository;
  private final ReviewRepository reviewRepository;
  private final NextShowCalculator nextShowCalculator;
  private final Validator validator;

  public TermService(TermRepository termRepository, TopicRepository topicRepository, ReviewRepository reviewRepository,
                     NextShowCalculator nextShowCalculator, Validator validator) {
    this.termRepository = termRepository;
    this.topicRepository = topicRepository;
    this.reviewRepository = reviewRepository;
    this.nextShowCalculator = nextShowCalculator;
    this.validator = validator;
  }

  public long create(NewTermDTO newTermDTO) {
    Topic topic = topicRepository.findById(newTermDTO.topicId()).orElseThrow(() -> new RuntimeException("TODO"));
    validator.validateTopic(topic);
    Term term = new Term();
    term.setName(newTermDTO.name());
    term.setDefinition(newTermDTO.definition());
    term.setTopic(topic);
    term.setNextShowDateTime(LocalDateTime.now());
    return termRepository.save(term).getId();
  }

  public void createReviewByTermId(long termId) {
    Term term = termRepository.findById(termId).orElseThrow(() -> new RuntimeException("TODO"));
    validator.validateTopic(term.getTopic());
    Review review = new Review();
    reviewRepository.save(review);
    term.addReview(review);
    LocalDateTime nextShowDateTime = nextShowCalculator.calculate(term.getReviews());
    term.setNextShowDateTime(nextShowDateTime);
    termRepository.save(term);
  }
}
