package com.bonifert.backend.dto.term;

import java.time.LocalDateTime;

public record TermDTO(long id, String name, String definition, LocalDateTime nextShowDateTime) {
}
