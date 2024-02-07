package com.bonifert.backend.exception;

public class AccessDeniedException extends RuntimeException{
  public AccessDeniedException() {
  }

  public AccessDeniedException(String message) {
    super(message);
  }
}
