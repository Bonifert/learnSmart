package com.bonifert.backend.dto.topic;

public record GenerateTopicWithWordsDTO(String topic, ProficiencyLevel level, String nameLang, String defLang,
                                        int numberOfCards) {
}
