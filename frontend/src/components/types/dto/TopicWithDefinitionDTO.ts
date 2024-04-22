export interface TopicWithDefinitionDTO {
  topic: string;
  examples: string[];
  numberOfCards?: number;
  definitionSentenceAmount?: number | null;
}