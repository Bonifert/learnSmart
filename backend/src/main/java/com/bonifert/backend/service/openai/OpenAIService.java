package com.bonifert.backend.service.openai;

import com.bonifert.backend.dto.openai.Message;
import com.bonifert.backend.dto.openai.OpenAIRequestDTO;
import com.bonifert.backend.dto.openai.OpenAIResponseDTO;
import com.bonifert.backend.dto.topic.GenerateTopicWithDefinitionDTO;
import com.bonifert.backend.dto.topic.GenerateTopicWithWordsDTO;
import com.bonifert.backend.exception.OpenAIException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OpenAIService {
  private static final int MAX_TOKENS = 2000;
  private static final double TEMPERATURE = 1;
  @Value("${openai.api.url}")
  private String url;
  @Value("${openai.model}")
  private String model;
  private final RestTemplate restTemplate;

  public OpenAIService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public String getTopicWithDefinitionsInJsonStringFormat(GenerateTopicWithDefinitionDTO dto) throws OpenAIException {
    OpenAIRequestDTO request = new OpenAIRequestDTO(model, createDefinitionPrompt(dto), TEMPERATURE, MAX_TOKENS);
    request.addMessage(new Message("system",
                                   "You will give back json string in format like: \"{\n  \"topic\": \"My new topic\",\n  \"terms\": [\n    {\n      \"name\": \"term1\",\n      \"definition\": \"very long definition\"\n    },\n  ]\n}\""));
    return getFromOpenAI(request);
  }

  public String getTopicWithWordsInJsonStringFormat(GenerateTopicWithWordsDTO dto) throws OpenAIException {
    OpenAIRequestDTO request = new OpenAIRequestDTO(model, createWordPrompt(dto), TEMPERATURE, MAX_TOKENS);
    request.addMessage(new Message("system", "You will give back json string in format like: \"{\n  \"topic\": \"My new topic\",\n  \"terms\": [\n    {\n      \"name\": \"name language\",\n      \"definition\": \"definition language\"\n    },\n  ]\n}\""));
    return getFromOpenAI(request);
  }

  private String getFromOpenAI(OpenAIRequestDTO request) {
    try {
      OpenAIResponseDTO response = restTemplate.postForObject(url, request, OpenAIResponseDTO.class);
      if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
        return response.getChoices().get(0).getMessage().getContent();
      }
      else {
        throw new OpenAIException("Communication with OpenAI api was unsuccessful.");
      }
    }
    catch (Exception e) {
      throw new OpenAIException("Communication with OpenAI api was unsuccessful.");
    }
  }

  private String createWordPrompt(GenerateTopicWithWordsDTO dto) {
    return String.format(
            "I need words as json string related to %s, proficiency level: %s (just in this level), at least %d terms. The name prop is in %s, the def prop is in %s",
            dto.topic(),
            dto.level().name(),
            dto.numberOfCards(),
            dto.nameLang(),
            dto.defLang());
  }

  private String createDefinitionPrompt(GenerateTopicWithDefinitionDTO dto) {
    return String.format(
            "I need a json string related to %s, like %s, at least %d terms. The definition of the term should be at least %d sentences long",
            dto.topic(),
            String.join(", ", dto.examples()),
            dto.numberOfCards(),
            dto.definitionSentenceAmount());
  }
}
