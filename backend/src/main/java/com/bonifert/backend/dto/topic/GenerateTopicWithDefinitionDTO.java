package com.bonifert.backend.dto.topic;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.util.List;

public record GenerateTopicWithDefinitionDTO(
        @Valid

        @NotBlank(message = "topic is mandatory")
        @NotNull(message = "topic is mandatory")
        @Size(max = 40, message = "topic must be maximum 40 character")
        String topic,

        @NotNull(message = "examples is mandatory")
        List<String> examples,

        @NotNull(message = "numberOfCards is mandatory")
        @Min(value = 1, message = "minimum 1 card")
        @Max(value = 30, message = "maximum 30 cards")
        Integer numberOfCards,

        @NotNull(message = "definitionSentenceAmount is mandatory")
        @Min(value = 1, message = "at least 1 sentence")
        @Max(value = 8, message = "maximum 8 sentences")
        Integer definitionSentenceAmount) {
}
