package com.bonifert.backend.service;

import com.bonifert.backend.dto.term.TermDTO;
import com.bonifert.backend.dto.topic.NewTopicDTO;
import com.bonifert.backend.dto.topic.TopicDTO;
import com.bonifert.backend.model.Term;
import com.bonifert.backend.model.Topic;
import com.bonifert.backend.model.UserEntity;
import com.bonifert.backend.service.repository.TopicRepository;
import com.bonifert.backend.service.repository.UserEntityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TopicService {
  private final TopicRepository topicRepository;
  private final UserEntityRepository userEntityRepository;

  public TopicService(TopicRepository topicRepository, UserEntityRepository userEntityRepository) {
    this.topicRepository = topicRepository;
    this.userEntityRepository = userEntityRepository;
  }

  public long create(NewTopicDTO newTopicDTO) { // how to authenticate
    UserEntity user = userEntityRepository.findById(newTopicDTO.userId())
                                          .orElseThrow(() -> new RuntimeException("TODO"));
    Topic topic = new Topic();
    topic.setName(newTopicDTO.name());
    topic.setUserEntity(user);
    return topicRepository.save(topic).getId();
  }

  public TopicDTO getByIdWithFilteredTerms(long topicId) {
    Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new RuntimeException("TODO"));
    LocalDateTime now = LocalDateTime.now();
    List<Term> currentTerms = topic.getTerms()
                                   .stream()
                                   .filter(term -> term.getNextShowDateTime().isBefore(now))
                                   .toList();
    return new TopicDTO(topic.getName(), topicId, topic.getCreatedAt(), topic.getModifiedAt(), convertTermsToDTOs(currentTerms));
  }

  public TopicDTO getById(long topicId) {
    Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new RuntimeException("TODO"));
    return new TopicDTO(topic.getName(), topicId, topic.getCreatedAt(), topic.getModifiedAt(), convertTermsToDTOs(topic.getTerms()));
  }

  private List<TermDTO> convertTermsToDTOs(List<Term> terms){
    return terms.stream().map(term -> new TermDTO(term.getId(), term.getName(), term.getDefinition())).toList();
  }
}
