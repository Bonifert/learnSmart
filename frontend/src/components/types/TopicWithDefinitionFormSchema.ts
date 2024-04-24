import {z, ZodType} from "zod";
import {TopicWithDefinitionDTO} from "./dto/TopicWithDefinitionDTO.ts";

export const TopicWithDefinitionFormSchema: ZodType<TopicWithDefinitionDTO> = z
    .object({
      topic: z
          .string()
          .max(200, {message: "Maximum 200 character"})
          .trim()
          .min(1, {message: "Topic is required"}),
      examples: z
          .optional(z
              .string()
              .max(200, {message: "Maximum 200 character"})
          ),
      numberOfCards: z
          .number({required_error: "Number of cards is required", invalid_type_error: "Number of cards is required"})
          .min(1, {message: "At least one card"})
          .max(30, {message: "Maximum 30 cards"}),
      definitionSentenceAmount: z
          .optional(z
              .union(
                  [
                    z.nan(),
                    z.number().min(1, {message: "Minimum 1"}).max(8, {message: "Maximum 8 sentences"})
                  ]
              )
          ),
    })