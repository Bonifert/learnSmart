package com.bonifert.backend.controller;

import com.bonifert.backend.dto.term.NewTermDTO;
import com.bonifert.backend.service.TermService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/term")
public class TermController {
  private final TermService termService;

  public TermController(TermService termService) {
    this.termService = termService;
  }

  @PostMapping
  public ResponseEntity<Void> create(@RequestBody NewTermDTO newTermDTO) {
    long id = termService.create(newTermDTO);
    return ResponseEntity.created(URI.create(String.format("/api/term/%d", id))).build();
  }

  @PutMapping("/review/{termId}")
  public ResponseEntity<Void> createReview(@PathVariable long termId) {
    termService.createReviewByTermId(termId);
    return ResponseEntity.ok().build();
  }
}
