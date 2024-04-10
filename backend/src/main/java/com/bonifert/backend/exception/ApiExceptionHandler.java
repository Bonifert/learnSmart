package com.bonifert.backend.exception;

import com.google.gson.JsonSyntaxException;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(value = NotFoundException.class)
  public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException exception) {
    HttpStatus httpStatus = HttpStatus.NOT_FOUND;
    ErrorResponse errorResponse = new ErrorResponse(exception.getMessage(), httpStatus);
    return new ResponseEntity<>(errorResponse, httpStatus);
  }

  @ExceptionHandler(value = OpenAIException.class)
  public ResponseEntity<ErrorResponse> handleOpenAIException(OpenAIException exception) {
    HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    ErrorResponse errorResponse = new ErrorResponse(exception.getMessage(), httpStatus);
    return new ResponseEntity<>(errorResponse, httpStatus);
  }

  @ExceptionHandler(value = JsonSyntaxException.class)
  public ResponseEntity<ErrorResponse> handleJsonSyntaxException(JsonSyntaxException jsonSyntaxException) {
    HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    ErrorResponse errorResponse = new ErrorResponse("Cannot process the OpenAI response", httpStatus);
    return new ResponseEntity<>(errorResponse, httpStatus);
  }

  @ExceptionHandler(value = AccessDeniedException.class)
  public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException exception) {
    HttpStatus httpStatus = HttpStatus.FORBIDDEN;
    ErrorResponse errorResponse = new ErrorResponse(exception.getMessage(), httpStatus);
    return new ResponseEntity<>(errorResponse, httpStatus);
  }

  @ExceptionHandler(value = ConstraintViolationException.class)
  public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException exception) {
    HttpStatus httpStatus = HttpStatus.CONFLICT;
    ErrorResponse errorResponse = new ErrorResponse(exception.getSQL(), httpStatus);
    return new ResponseEntity<>(errorResponse, httpStatus);
  }
}
