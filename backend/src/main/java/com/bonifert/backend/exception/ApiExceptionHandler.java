package com.bonifert.backend.exception;

import com.google.gson.JsonSyntaxException;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(value = NotFoundException.class)
  public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException exception) {
    HttpStatus httpStatus = HttpStatus.NOT_FOUND;
    ErrorResponse errorResponse = new ErrorResponse(exception.getMessage(), httpStatus);
    return new ResponseEntity<>(errorResponse, httpStatus);
  }

  @ExceptionHandler(value = DuplicatedException.class)
  public ResponseEntity<ErrorResponse> handleDuplicatedException(DuplicatedException exception){
    HttpStatus httpStatus = HttpStatus.CONFLICT;
    ErrorResponse errorResponse = new ErrorResponse(exception.getMessage(), httpStatus);
    return new ResponseEntity<>(errorResponse, httpStatus);
  }

  @ExceptionHandler(value = MethodArgumentNotValidException.class)
  public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception){
    HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
    Map<String, String> errors = new HashMap<>();

    exception.getBindingResult().getAllErrors().forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });
    return new ResponseEntity<>(errors, httpStatus);
  }

  @ExceptionHandler(value = MethodArgumentTypeMismatchException.class) // todo idk why but spring never throw this exception when can't create an enum
  public ResponseEntity<Object> handleTypeMismatchExceptions(MethodArgumentTypeMismatchException ex) {
    Map<String, Object> response = new HashMap<>();
    Class<?> requiredType = ex.getRequiredType();
    if (requiredType != null && requiredType.isEnum()) {
      response.put("errors", "Invalid value for " + ex.getName() + ". Please provide one of the following values: " +
              Arrays.stream(requiredType.getEnumConstants())
                    .map(Object::toString)
                    .collect(Collectors.joining(", ")));
    } else {
      response.put("errors", "Invalid value for " + ex.getName() + ". Please provide a valid value.");
    }
    return ResponseEntity.badRequest().body(response);
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
    ErrorResponse errorResponse = new ErrorResponse("Problem occurs when recording the data.", httpStatus);
    return new ResponseEntity<>(errorResponse, httpStatus);
  }
}
