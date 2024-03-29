package com.bonifert.backend.controller;

import com.bonifert.backend.dto.topic.EditTopicDTO;
import com.bonifert.backend.dto.topic.InfoTopicDTO;
import com.bonifert.backend.dto.topic.TopicDTO;
import com.bonifert.backend.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/topic")
public class TopicController {
  private final TopicService topicService;

  public TopicController(TopicService topicService) {
    this.topicService = topicService;
  }

  @PostMapping
  public ResponseEntity<Long> createTopic() {
    long id = topicService.create();
    return ResponseEntity.created(URI.create(String.format("/api/topic/%d", id))).body(id);
  }

  @GetMapping("/{topicId}")
  public ResponseEntity<TopicDTO> getById(@PathVariable long topicId) {
    return ResponseEntity.ok(topicService.getById(topicId));
  }

  @GetMapping("/filtered/{topicId}")
  public ResponseEntity<TopicDTO> getFilteredById(@PathVariable long topicId) {
    return ResponseEntity.ok(topicService.getByIdWithFilteredTerms(topicId));
  }

  @DeleteMapping("/{topicId}")
  public ResponseEntity<Void> deleteById(@PathVariable long topicId) {
    topicService.deleteById(topicId);
    return ResponseEntity.ok().build();
  }

  @PatchMapping
  public ResponseEntity<Void> update(@RequestBody EditTopicDTO editTopicDTO) {
    topicService.edit(editTopicDTO);
    return ResponseEntity.ok().build();
  }

  @GetMapping
  public ResponseEntity<List<TopicDTO>> getUserTopics(){
    return ResponseEntity.ok(topicService.getTopicsByUser());
  }

  @GetMapping("/info")
  public ResponseEntity<List<InfoTopicDTO>> getUserTopicsInfo(){
    return ResponseEntity.ok(topicService.getTopicsInfoByUser());
  }
}
