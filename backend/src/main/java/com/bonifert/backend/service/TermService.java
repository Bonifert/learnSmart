package com.bonifert.backend.service;

import com.bonifert.backend.dto.term.NewTermDTO;
import com.bonifert.backend.dto.term.TermDTO;
import com.bonifert.backend.exception.NotFoundException;
import com.bonifert.backend.model.Review;
import com.bonifert.backend.model.Term;
import com.bonifert.backend.model.Topic;
import com.bonifert.backend.service.repository.ReviewRepository;
import com.bonifert.backend.service.repository.TermRepository;
import com.bonifert.backend.service.repository.TopicRepository;
import com.bonifert.backend.service.showCalculator.NextShowCalculator;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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

  @Transactional
  public long create(NewTermDTO newTermDTO) {
    Topic topic = topicRepository.findById(newTermDTO.topicId())
                                 .orElseThrow(() -> new NotFoundException("Topic not found"));
    validator.validate(topic);
    Term term = new Term();
    term.setName(newTermDTO.name());
    term.setDefinition(newTermDTO.definition());
    term.setTopic(topic);
    term.setNextShowDateTime(LocalDateTime.now());
    return termRepository.save(term).getId();
  }

  @Transactional
  public void createReviewByTermId(long termId) {
    Term term = termRepository.findById(termId).orElseThrow(() -> new NotFoundException("Term not found"));
    validator.validate(term);
    Review review = new Review();
    reviewRepository.save(review);
    term.addReview(review);
    if (LocalDateTime.now().isBefore(term.getNextShowDateTime())){
      calculateAndSetNextShowDate(term);
      Topic topic = term.getTopic();
      updateTopicUrgency(topic);
    }
    termRepository.save(term);
  }

  @Transactional
  public void editTerm(TermDTO termDTO){
    Term term = termRepository.findById(termDTO.id()).orElseThrow(()-> new NotFoundException("Term not found"));
    term.setDefinition(termDTO.definition());
    term.setName(termDTO.name());
    termRepository.save(term);
  }

  private void calculateAndSetNextShowDate(Term term){
    LocalDateTime nextShowDateTime = nextShowCalculator.calculate(term.getReviews());
    term.setNextShowDateTime(nextShowDateTime);
  }

  private void updateTopicUrgency(Topic topic){
    String topicUrgencyLevel = calculateUrgency(topic);
    topic.setPriority(topicUrgencyLevel);
    topicRepository.save(topic);
  }

  private String calculateUrgency(Topic topic){
    int expiredCounter = 0;
    List<Term> terms = topic.getTerms();
    for (Term term : terms){
      if (term.getNextShowDateTime().isBefore(LocalDateTime.now())) expiredCounter++;
    }
    if (expiredCounter == 0) return "Optional";
    if (expiredCounter / terms.size() * 100 < 30) return "Consider";
    return "Prioritize";
  }
}
