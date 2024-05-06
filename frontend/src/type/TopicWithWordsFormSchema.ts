import {z, ZodType} from "zod";
import {TopicWithWordsFormData} from "./TopicWithWordsFormData.ts";

export const TopicWithWordsFormSchema: ZodType<TopicWithWordsFormData> = z
    .object({
      topic: z
          .string()
          .max(200, {message: "Maximum 200 character"})
          .trim()
          .min(1, {message: "Topic is required"}),
      level: z.string(),
      nameLang: z
          .string({required_error: "Language is required", invalid_type_error: "Language is required"})
          .max(30, {message: "Maximum 30 character"})
          .trim()
          .min(1, {message: "Language is required"}),
      defLang: z
          .string({required_error: "Language is required", invalid_type_error: "Language is required"})
          .max(30, {message: "Maximum 30 character"})
          .trim()
          .min(1, {message: "Language is required"}),
      numberOfCards: z
          .number({required_error: "Number of cards is required", invalid_type_error: "Number of cards is required"})
          .min(1, {message: "At least one card"})
          .max(40, {message: "Maximum 40 cards"}),
    })
    .refine((data) => data.defLang !== data.nameLang, {
      message: "Card front and card back must be different",
      path: ["defLang"]
    })