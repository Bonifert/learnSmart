package com.bonifert.backend.service.mapper;

import com.bonifert.backend.dto.topic.TopicDTO;
import com.bonifert.backend.model.Topic;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = TermMapper.class, componentModel = "spring")
public interface TopicMapper {
  TopicDTO toTopicDTO(Topic topic);
  List<TopicDTO> toTopicDTOs(List<Topic> topics);
  Topic toTopic(TopicDTO topicDTO);
  List<Topic> toTopics(List<TopicDTO> topicDTOS);
}
