package com.bonifert.backend.exception;

import org.springframework.http.HttpStatus;

public record ErrorResponse(String message, HttpStatus httpStatus) {
}
