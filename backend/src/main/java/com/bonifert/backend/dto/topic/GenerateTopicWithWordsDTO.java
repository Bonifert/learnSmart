package com.bonifert.backend.dto.topic;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

public record GenerateTopicWithWordsDTO(
        @Valid

        @NotNull(message = "topic is mandatory")
        @NotBlank(message = "topic is mandatory")
        @Size(max = 200, message = "topic must be maximum 200 character")
        String topic,

        @NotNull(message = "level is mandatory")
        ProficiencyLevel level,

        @NotNull(message = "nameLang is mandatory")
        @NotBlank(message = "nameLang is mandatory")
        @Size(min = 3, max = 30, message = "nameLang must be min 3 and max 30 character")
        String nameLang,

        @NotNull(message = "defLang is mandatory")
        @NotBlank(message = "defLang is mandatory")
        @Size(min = 3, max = 30, message = "defLang must be min 3 and max 30 character")
        String defLang,

        @NotNull(message = "numberOfCards is mandatory")
        @Min(value = 1, message = "at least 1 card")
        @Max(value = 40, message = "max 40 cards")
        Integer numberOfCards) {
}
