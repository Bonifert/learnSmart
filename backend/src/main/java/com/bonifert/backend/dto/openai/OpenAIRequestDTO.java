package com.bonifert.backend.dto.openai;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class OpenAIRequestDTO {
  private String model;
  private List<Message> messages;
  private double temperature;
  private int max_tokens;

  public OpenAIRequestDTO(String model, String prompt, double temperature, int max_tokens) {
    this.model = model;
    this.temperature = temperature;
    this.max_tokens = max_tokens;
    this.messages = new ArrayList<>();
    this.messages.add(new Message("user", prompt));
  }

  public void addMessage(Message... messages) {
    this.messages.addAll(List.of(messages));
  }
}
