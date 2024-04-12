package com.bonifert.backend.controller;

import com.bonifert.backend.dto.term.NewTermDTO;
import com.bonifert.backend.dto.term.TermDTO;
import com.bonifert.backend.service.TermService;
import jakarta.validation.Valid;
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
  public ResponseEntity<TermDTO> create(@Valid @RequestBody NewTermDTO newTermDTO) {
    TermDTO term = termService.create(newTermDTO);
    return ResponseEntity.created(URI.create(String.format("/api/term/%d", term.id()))).body(term);
  }

  @PutMapping("/review/{termId}")
  public ResponseEntity<Void> createReview(@PathVariable long termId) {
    termService.createReviewByTermId(termId);
    return ResponseEntity.ok().build();
  }

  @PatchMapping
  public ResponseEntity<Void> editTerm(@Valid @RequestBody TermDTO termDTO){
    termService.edit(termDTO);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable long id){
    termService.delete(id);
    return ResponseEntity.ok().build();
  }
}
