package com.bonifert.backend.dto.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewUserDTO(
        @Valid
        @NotBlank(message = "userName is mandatory")
        @NotNull(message = "userName is mandatory")
        @Size(min = 5, max = 15, message = "The userName must be min 5 and max 15 character.")
        String userName,

        @NotBlank(message = "password is mandatory")
        @NotNull(message = "password is mandatory")
        @Size(min = 5, max = 15, message = "The password must be min 5 and max 15 character.")
        String password) {
}
