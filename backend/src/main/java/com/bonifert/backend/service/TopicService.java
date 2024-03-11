package com.bonifert.backend.service;

import com.bonifert.backend.dto.term.TermDTO;
import com.bonifert.backend.dto.topic.EditTopicDTO;
import com.bonifert.backend.dto.topic.InfoTopicDTO;
import com.bonifert.backend.dto.topic.TopicDTO;
import com.bonifert.backend.exception.NotFoundException;
import com.bonifert.backend.model.Term;
import com.bonifert.backend.model.Topic;
import com.bonifert.backend.model.user.UserEntity;
import com.bonifert.backend.service.mapper.TopicMapper;
import com.bonifert.backend.service.repository.TermRepository;
import com.bonifert.backend.service.repository.TopicRepository;
import com.bonifert.backend.service.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TopicService {
  private final TopicRepository topicRepository;
  private final UserRepository userRepository;
  private final Validator validator;
  private final TopicMapper topicMapper;
  private final TermRepository termRepository;

  public TopicService(TopicRepository topicRepository, UserRepository userRepository, Validator validator,
                      TopicMapper topicMapper, TermRepository termRepository) {
    this.topicRepository = topicRepository;
    this.userRepository = userRepository;
    this.validator = validator;
    this.topicMapper = topicMapper;
    this.termRepository = termRepository;
  }

  public long create() {
    String userName = SecurityContextHolder.getContext().getAuthentication().getName();
    UserEntity user = userRepository.findByUserName(userName)
                                    .orElseThrow(() -> new NotFoundException("User not found"));
    Topic topic = new Topic();
    topic.setName("");
    topic.setUserEntity(user);
    return topicRepository.save(topic).getId();
  }

  public TopicDTO getByIdWithFilteredTerms(long topicId) {
    Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new NotFoundException("Topic not found"));
    validator.validate(topic);
    LocalDateTime now = LocalDateTime.now();
    List<Term> currentTerms = topic.getTerms()
                                   .stream()
                                   .filter(term -> term.getNextShowDateTime().isBefore(now))
                                   .toList();
    return convertTopicToDTOWithFilteredTerms(topic, currentTerms); // TODO do with mapper but how?
  }

  public TopicDTO getById(long topicId) {
    Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new NotFoundException("Topic not found"));
    validator.validate(topic);
    return topicMapper.toTopicDTO(topic);
  }

  public List<TopicDTO> getTopicsByUser() {
    List<Topic> topics = getTopicEntitiesByUser();
    return topics.stream().map(topicMapper::toTopicDTO).toList();
  }

  private List<Topic> getTopicEntitiesByUser() {
    String userName = SecurityContextHolder.getContext().getAuthentication().getName();
    UserEntity user = userRepository.findByUserName(userName)
                                    .orElseThrow(() -> new NotFoundException("User not found"));
    return topicRepository.getAllByUserEntity(user);
  }

  public List<InfoTopicDTO> getTopicsInfoByUser() {
    List<Topic> topics = getTopicEntitiesByUser();
    return topics.stream()
                 .map(topic -> new InfoTopicDTO(topic.getName(), topic.getTerms().size(), topic.getPriority()))
                 .toList();
  }

  public void deleteById(long id) {
    Topic topic = topicRepository.findById(id).orElseThrow(() -> new NotFoundException("Topic not found"));
    validator.validate(topic);
    topicRepository.delete(topic);
  }

  @Transactional
  public TopicDTO edit(EditTopicDTO editTopicDTO) {
    Topic topic = topicRepository.findById(editTopicDTO.topicId())
                                 .orElseThrow(() -> new NotFoundException("Topic not found"));
    validator.validate(topic);
    topic.setName(editTopicDTO.newName());
    return topicMapper.toTopicDTO(topicRepository.save(topic));
  }

  private List<TermDTO> convertTermsToDTOs(List<Term> terms) {
    return terms.stream().map(term -> new TermDTO(term.getId(), term.getName(), term.getDefinition())).toList();
  }

  private TopicDTO convertTopicToDTOWithFilteredTerms(Topic topic, List<Term> terms) {
    return new TopicDTO(topic.getName(),
                        topic.getId(),
                        topic.getCreatedAt(),
                        topic.getModifiedAt(),
                        convertTermsToDTOs(terms));
  }
}
