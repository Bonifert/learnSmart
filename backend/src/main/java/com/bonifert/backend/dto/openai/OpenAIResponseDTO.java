package com.bonifert.backend.dto.openai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenAIResponseDTO {
  private List<Choice> choices = new ArrayList<>();
}
