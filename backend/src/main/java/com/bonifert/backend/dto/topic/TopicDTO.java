package com.bonifert.backend.dto.topic;

import com.bonifert.backend.dto.term.TermDTO;

import java.time.LocalDateTime;
import java.util.List;

public record TopicDTO(String name, long id, LocalDateTime createdAt, LocalDateTime modifiedAt, List<TermDTO> terms, String priority) {
}
