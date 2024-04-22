package com.bonifert.backend.dto.topic;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

public record GenerateTopicWithDefinitionDTO(
        @Valid

        @NotBlank(message = "topic is mandatory")
        @NotNull(message = "topic is mandatory")
        @Size(max = 200, message = "topic must be maximum 200 character")
        String topic,

        @Size(min = 1, max = 200, message = "examples must be between 1 and 200 character")
        String examples,

        @NotNull(message = "numberOfCards is mandatory")
        @Min(value = 1, message = "minimum 1 card")
        @Max(value = 30, message = "maximum 30 cards")
        Integer numberOfCards,

        @Min(value = 1, message = "at least 1 sentence")
        @Max(value = 8, message = "maximum 8 sentences")
        Integer definitionSentenceAmount) {
}
