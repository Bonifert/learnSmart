package com.bonifert.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(value = NotFoundException.class)
  public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException exception){
    HttpStatus httpStatus = HttpStatus.NOT_FOUND;
    ErrorResponse errorResponse = new ErrorResponse(exception.getMessage(), httpStatus);
    return new ResponseEntity<>(errorResponse, httpStatus);
  }
}
