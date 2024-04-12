package com.bonifert.backend.dto.term;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewTermDTO(
        @Valid

        @NotNull(message = "topicId is mandatory")
        Long topicId,

        @NotNull(message = "name is mandatory")
        @NotBlank(message = "name is mandatory")
        @Size(min = 1, max = 25,  message = "name must be min 1 max 25 character")
        String name,

        @NotNull(message = "definition is mandatory")
        @NotBlank(message = "definition is mandatory")
        @Size(min = 1, max = 1000, message = "definition must be min 1 max 1000 character")
        String definition) {
}
