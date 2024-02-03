package com.bonifert.backend.dto.topic;

import com.bonifert.backend.model.Term;

import java.time.LocalDateTime;
import java.util.List;

public record TopicDTO(String name, long id, LocalDateTime createdAt, LocalDateTime modifiedAt, List<Term> terms) {
}
