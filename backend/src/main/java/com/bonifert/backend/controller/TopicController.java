package com.bonifert.backend.controller;

import com.bonifert.backend.dto.topic.EditTopicDTO;
import com.bonifert.backend.dto.topic.NewTopicDTO;
import com.bonifert.backend.dto.topic.TopicDTO;
import com.bonifert.backend.service.TopicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/topic")
public class TopicController {
  private final TopicService topicService;

  public TopicController(TopicService topicService) {
    this.topicService = topicService;
  }

  @PostMapping
  public ResponseEntity<Void> createTopic(@RequestBody NewTopicDTO newTopicDTO) {
    long id = topicService.create(newTopicDTO);
    return ResponseEntity.created(URI.create(String.format("/api/topic/%d", id))).build();
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
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  @PatchMapping
  public ResponseEntity<TopicDTO> update(@RequestBody EditTopicDTO editTopicDTO) {
    return ResponseEntity.ok(topicService.edit(editTopicDTO));
  }
}
