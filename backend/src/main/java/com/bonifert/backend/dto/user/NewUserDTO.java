package com.bonifert.backend.dto.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewUserDTO(
        @Valid
        @NotBlank(message = "username is mandatory")
        @NotNull(message = "username is mandatory")
        @Size(min = 3, max = 35, message = "The username must be min 3 and max 35 character.")
        String username,

        @NotBlank(message = "password is mandatory")
        @NotNull(message = "password is mandatory")
        @Size(min = 3, max = 35, message = "The password must be min 3 and max 35 character.")
        String password) {
}
