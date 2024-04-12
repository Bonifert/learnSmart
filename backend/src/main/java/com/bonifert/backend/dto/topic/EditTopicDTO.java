package com.bonifert.backend.dto.topic;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EditTopicDTO(long topicId,
                           @NotNull(message = "newName is mandatory") @NotBlank(message = "newName is mandatory") String newName) {
}
