package com.bonifert.backend.controller;

import com.bonifert.backend.dto.topic.*;
import com.bonifert.backend.service.TopicService;
import jakarta.validation.Valid;
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

  @PostMapping("/generate/definitions")
  public ResponseEntity<BasicTopicDTO> generateDefinitions(@Valid @RequestBody GenerateTopicWithDefinitionDTO dto) {
    return ResponseEntity.ok(topicService.generateTopicWithDefinitions(dto));
  }

  @PostMapping("/create-from-basic")
  public ResponseEntity<Long> createFromBasic(@Valid @RequestBody BasicTopicDTO basicTopicDTO) {
    long id = topicService.createFromBasic(basicTopicDTO);
    return ResponseEntity.created(URI.create(String.format("/api/topic/%d", id))).body(id);
  }

  @PostMapping("/generate/words")
  public ResponseEntity<BasicTopicDTO> generateWords(@Valid @RequestBody GenerateTopicWithWordsDTO dto) {
    return ResponseEntity.ok(topicService.generateTopicWithWords(dto));
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
  public ResponseEntity<Void> update(@Valid @RequestBody EditTopicDTO editTopicDTO) {
    topicService.edit(editTopicDTO);
    return ResponseEntity.ok().build();
  }

  @GetMapping
  public ResponseEntity<List<TopicDTO>> getUserTopics() {
    return ResponseEntity.ok(topicService.getTopicsByUser());
  }

  @GetMapping("/info")
  public ResponseEntity<List<InfoTopicDTO>> getUserTopicsInfo() {
    return ResponseEntity.ok(topicService.getTopicsInfoByUser());
  }
}
