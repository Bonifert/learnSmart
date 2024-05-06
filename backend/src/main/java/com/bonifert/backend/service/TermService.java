package com.bonifert.backend.service;

import com.bonifert.backend.dto.term.NewTermDTO;
import com.bonifert.backend.dto.term.TermDTO;
import com.bonifert.backend.exception.NotFoundException;
import com.bonifert.backend.model.Review;
import com.bonifert.backend.model.Term;
import com.bonifert.backend.model.Topic;
import com.bonifert.backend.service.mapper.TermMapper;
import com.bonifert.backend.service.repository.ReviewRepository;
import com.bonifert.backend.service.repository.TermRepository;
import com.bonifert.backend.service.showCalculator.NextShowCalculator;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TermService {
  private final TermRepository termRepository;
  private final ReviewRepository reviewRepository;
  private final NextShowCalculator nextShowCalculator;
  private final Validator validator;
  private final TermMapper termMapper;
  private final TopicService topicService;

  public TermService(TermRepository termRepository, ReviewRepository reviewRepository,
                     NextShowCalculator nextShowCalculator, Validator validator, TermMapper termMapper,
                     TopicService topicService) {
    this.termRepository = termRepository;
    this.reviewRepository = reviewRepository;
    this.nextShowCalculator = nextShowCalculator;
    this.validator = validator;
    this.termMapper = termMapper;
    this.topicService = topicService;
  }

  @Transactional
  public TermDTO create(NewTermDTO newTermDTO) {
    Topic topic = topicService.getTopicById(newTermDTO.topicId());
    validator.validate(topic);
    Term term = new Term();
    term.setName(newTermDTO.name());
    term.setDefinition(newTermDTO.definition());
    term.setTopic(topic);
    term.setNextShowDateTime(LocalDateTime.now());
    topic.addTerm(term);
    topicService.refreshUrgencyAndSave(topic);
    return termMapper.toTermDTO(termRepository.save(term));
  }

  public void delete(long id) {
    Term term = termRepository.findById(id).orElseThrow(() -> new NotFoundException("Term not found"));
    validator.validate(term);
    termRepository.delete(term);
  }

  @Transactional
  public void createReviewByTermId(long termId) {
    Term term = termRepository.findById(termId).orElseThrow(() -> new NotFoundException("Term not found"));
    validator.validate(term);
    Review review = new Review();
    reviewRepository.save(review);
    term.addReview(review);
    if (LocalDateTime.now().isAfter(term.getNextShowDateTime())) {
      LocalDateTime next = calculateNextShowDate(term);
      term.setNextShowDateTime(next);
      topicService.refreshUrgencyAndSave(term.getTopic());
    }
    termRepository.save(term);
  }

  private LocalDateTime calculateNextShowDate(Term term) {
    return nextShowCalculator.calculate(term.getReviews());
  }

  @Transactional
  public void edit(TermDTO termDTO) {
    Term term = termRepository.findById(termDTO.id()).orElseThrow(() -> new NotFoundException("Term not found"));
    term.setDefinition(termDTO.definition());
    term.setName(termDTO.name());
    termRepository.save(term);
  }
}
