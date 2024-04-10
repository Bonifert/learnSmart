package com.bonifert.backend.service;

import com.bonifert.backend.dto.term.TermDTO;
import com.bonifert.backend.dto.topic.*;
import com.bonifert.backend.exception.NotFoundException;
import com.bonifert.backend.model.Term;
import com.bonifert.backend.model.Topic;
import com.bonifert.backend.model.user.UserEntity;
import com.bonifert.backend.service.mapper.TopicMapper;
import com.bonifert.backend.service.openai.OpenAIService;
import com.bonifert.backend.service.repository.TermRepository;
import com.bonifert.backend.service.repository.TopicRepository;
import com.bonifert.backend.service.repository.UserRepository;
import com.google.gson.Gson;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TopicService {
  private final TopicRepository topicRepository;
  private final UserRepository userRepository;
  private final TermRepository termRepository;
  private final Validator validator;
  private final TopicMapper topicMapper;
  private final OpenAIService openAIService;
  private final Gson gson = new Gson(); // todo bean

  public TopicService(TopicRepository topicRepository, UserRepository userRepository, TermRepository termRepository,
                      Validator validator,
                      TopicMapper topicMapper, OpenAIService openAIService) {
    this.topicRepository = topicRepository;
    this.userRepository = userRepository;
    this.termRepository = termRepository;
    this.validator = validator;
    this.topicMapper = topicMapper;
    this.openAIService = openAIService;
  }

  public long create() {
    UserEntity user = getUser();
    Topic topic = new Topic();
    topic.setUserEntity(user);
    return topicRepository.save(topic).getId();
  }

  @Transactional
  public long createFromBasic(BasicTopicDTO basicTopicDTO) {
    UserEntity user = getUser();
    Topic topic = new Topic();
    List<Term> terms = basicTopicDTO.getTerms()
                                    .stream()
                                    .map(term -> new Term(topic,
                                                          term.getName(),
                                                          term.getDefinition(),
                                                          LocalDateTime.now()))
                                    .toList();
    termRepository.saveAll(terms);
    topic.setTerms(terms);
    topic.setUserEntity(user);
    topic.setName(basicTopicDTO.getName());
    return topicRepository.save(topic).getId();
  }

  public BasicTopicDTO generateTopicWithDefinitions(GenerateTopicWithDefinitionDTO dto) {
    String topicJson = openAIService.getTopicWithDefinitionsInJsonStringFormat(dto);
    return gson.fromJson(topicJson, BasicTopicDTO.class);
  }

  public BasicTopicDTO generateTopicWithWords(GenerateTopicWithWordsDTO dto) {
    String topicJson = openAIService.getTopicWithWordsInJsonStringFormat(dto);
    return gson.fromJson(topicJson, BasicTopicDTO.class);
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
                 .map(topic -> new InfoTopicDTO(topic.getName(),
                                                topic.getTerms().size(),
                                                topic.getPriority(),
                                                topic.getId()))
                 .toList();
  }

  public void deleteById(long id) {
    Topic topic = topicRepository.findById(id).orElseThrow(() -> new NotFoundException("Topic not found"));
    validator.validate(topic);
    topicRepository.delete(topic);
  }

  @Transactional
  public void edit(EditTopicDTO editTopicDTO) {
    Topic topic = topicRepository.findById(editTopicDTO.topicId())
                                 .orElseThrow(() -> new NotFoundException("Topic not found"));
    validator.validate(topic);
    topic.setName(editTopicDTO.newName());
    topicRepository.save(topic);
  }

  private List<TermDTO> convertTermsToDTOs(List<Term> terms) {
    return terms.stream()
                .map(term -> new TermDTO(term.getId(),
                                         term.getName(),
                                         term.getDefinition(),
                                         term.getNextShowDateTime()))
                .toList();
  }

  private TopicDTO convertTopicToDTOWithFilteredTerms(Topic topic, List<Term> terms) {
    return new TopicDTO(topic.getName(),
                        topic.getId(),
                        topic.getCreatedAt(),
                        topic.getModifiedAt(),
                        convertTermsToDTOs(terms),
                        topic.getPriority());
  }

  private UserEntity getUser() {
    String userName = SecurityContextHolder.getContext().getAuthentication().getName();
    return userRepository.findByUserName(userName).orElseThrow(() -> new NotFoundException("User not found"));
  }
}
