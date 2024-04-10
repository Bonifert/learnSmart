package com.bonifert.backend.dto.topic;

import java.util.List;

public record GenerateTopicWithDefinitionDTO(String topic, List<String> examples, int numberOfCards,
                                             int definitionSentenceAmount) {
}
