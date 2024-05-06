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
import com.google.gson.Gson;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TopicService {
  private final TopicRepository topicRepository;
  private final TermRepository termRepository;
  private final Validator validator;
  private final TopicMapper topicMapper;
  private final OpenAIService openAIService;
  private final TopicUrgencyService topicUrgencyService;
  private final AuthenticationService authenticationService;
  private final Gson gson = new Gson();

  public TopicService(TopicRepository topicRepository, TermRepository termRepository, Validator validator,
                      TopicMapper topicMapper, OpenAIService openAIService, TopicUrgencyService topicUrgencyService,
                      AuthenticationService authenticationService) {
    this.topicRepository = topicRepository;
    this.termRepository = termRepository;
    this.validator = validator;
    this.topicMapper = topicMapper;
    this.openAIService = openAIService;
    this.topicUrgencyService = topicUrgencyService;
    this.authenticationService = authenticationService;
  }

  @Transactional
  public long create() {
    UserEntity user = authenticationService.getUser();
    Topic topic = new Topic();
    topic.setUserEntity(user);
    return topicRepository.save(topic).getId();
  }

  @Transactional
  public long createFromBasic(BasicTopicDTO basicTopicDTO) {
    UserEntity user = authenticationService.getUser();
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
    topic.setPriority("Prioritize");
    topic.setUserEntity(user);
    topic.setName(basicTopicDTO.getName());
    return topicRepository.save(topic).getId();
  }

  public BasicTopicDTO generateTopicWithDefinitions(GenerateTopicWithDefinitionDTO dto) {
    String topicJson = openAIService.getTopicWithDefinitionsInJsonString(dto);
    return gson.fromJson(topicJson, BasicTopicDTO.class);
  }

  public BasicTopicDTO generateTopicWithWords(GenerateTopicWithWordsDTO dto) {
    String topicJson = openAIService.getTopicWithWordsInJsonString(dto);
    return gson.fromJson(topicJson, BasicTopicDTO.class);
  }

  public TopicDTO getByIdWithFilteredTerms(long topicId) {
    Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new NotFoundException("Topic not found"));
    validator.validate(topic);
    List<Term> currentTerms = getCurrentTerms(topic);
    return convertTopicToDTOWithFilteredTerms(topic, currentTerms);
  }

  public TopicDTO getById(long topicId) {
    Topic topic = getTopicById(topicId);
    validator.validate(topic);
    return topicMapper.toTopicDTO(topic);
  }

  public Topic getTopicById(long id) {
    return topicRepository.findById(id).orElseThrow(() -> new NotFoundException("Topic not found"));
  }

  public List<TopicDTO> getTopicsByUser() {
    List<Topic> topics = getTopicEntitiesByUser();
    return topics.stream().map(topicMapper::toTopicDTO).toList();
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

  @Transactional
  public void deleteById(long id) {
    Topic topic = getTopicById(id);
    validator.validate(topic);
    topicRepository.delete(topic);
  }

  public void refreshUrgencyAndSave(Topic topic) {
    topic.setPriority(topicUrgencyService.calculateUrgency(topic));
    topicRepository.save(topic);
  }

  @Transactional
  public void edit(EditTopicDTO editTopicDTO) {
    Topic topic = getTopicById(editTopicDTO.topicId());
    validator.validate(topic);
    topic.setName(editTopicDTO.newName());
    topicRepository.save(topic);
  }

  private List<Topic> getTopicEntitiesByUser() {
    UserEntity user = authenticationService.getUser();
    return topicRepository.getAllByUserEntity(user);
  }

  private List<Term> getCurrentTerms(Topic topic) {
    LocalDateTime now = LocalDateTime.now();
    return topic.getTerms().stream().filter(term -> term.getNextShowDateTime().isBefore(now)).toList();
  }

  private TopicDTO convertTopicToDTOWithFilteredTerms(Topic topic, List<Term> terms) {
    return new TopicDTO(topic.getName(),
                        topic.getId(),
                        topic.getCreatedAt(),
                        topic.getModifiedAt(),
                        convertTermsToDTOs(terms),
                        topic.getPriority());
  }

  private List<TermDTO> convertTermsToDTOs(List<Term> terms) {
    return terms.stream()
                .map(term -> new TermDTO(term.getId(),
                                         term.getName(),
                                         term.getDefinition(),
                                         term.getNextShowDateTime()))
                .toList();
  }
}
