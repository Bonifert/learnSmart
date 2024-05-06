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

  public String getTopicWithDefinitionsInJsonString(GenerateTopicWithDefinitionDTO dto) throws OpenAIException {
    OpenAIRequestDTO request = new OpenAIRequestDTO(model, createDefinitionPrompt(dto), TEMPERATURE, MAX_TOKENS);
    request.addMessage(new Message("system", """
            You will give back json string in format like:
            {
             "topic": "My new topic",
             "terms": [
                {
                  "name": "term1",
                  "definition": "very long definition"
                }
             ]
            }
            """));
    return getFromOpenAI(request);
  }

  public String getTopicWithWordsInJsonString(GenerateTopicWithWordsDTO dto) throws OpenAIException {
    OpenAIRequestDTO request = new OpenAIRequestDTO(model, createWordPrompt(dto), TEMPERATURE, MAX_TOKENS);
    request.addMessage(new Message("system", """
            You will give back json string (a dictionary) in format like:
            {
              "topic": "My new topic",
              "terms": [
                {
                  "name": "name language",
                  "definition": "definition language"
                }
              ]
            }
            """));
    return getFromOpenAI(request);
  }

  private String getFromOpenAI(OpenAIRequestDTO request) {
    try {
      OpenAIResponseDTO response = restTemplate.postForObject(url, request, OpenAIResponseDTO.class);
      if (isValidResponse(response)) {
        return response.getChoices().get(0).getMessage().getContent();
      }
      else {
        throw new OpenAIException("received an invalid response from OpenAI API");
      }
    }
    catch (Exception e) {
      throw new OpenAIException("failed to communicate with OpenAI API");
    }
  }

  private boolean isValidResponse(OpenAIResponseDTO response) {
    return response != null && response.getChoices() != null && !response.getChoices().isEmpty();
  }

  private String createWordPrompt(GenerateTopicWithWordsDTO dto) {
    return String.format(
            "I need words as json string related to %s, proficiency level: %s (just in this level), at least %d terms. The name prop is in %s, the def prop is in %s. Do not repeat yourself!",
            dto.topic(),
            dto.level().name(),
            dto.numberOfCards(),
            dto.nameLang(),
            dto.defLang());
  }

  private String createDefinitionPrompt(GenerateTopicWithDefinitionDTO dto) {
    return String.format("I need a json string related to %s, like %s, at least %d terms. Do not repeat yourself!" + (dto.definitionSentenceAmount() != null ? "The definition of the term should be at least %d sentences long." : ""),
                         dto.topic(),
                         dto.examples(),
                         dto.numberOfCards(),
                         dto.definitionSentenceAmount());
  }
}
