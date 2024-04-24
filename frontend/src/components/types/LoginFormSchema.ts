import {z, ZodType} from "zod";
import {UsernamePasswordDTO} from "./dto/UsernamePasswordDTO.ts";

export const LoginFormSchema: ZodType<UsernamePasswordDTO> = z
    .object({
      username: z
          .string({required_error: "Username is required"})
          .trim()
          .min(1, {message: "Username is required"}),
      password: z
          .string({required_error: "Password is required"})
          .trim()
          .min(1, {message: "Password is required"}),
    });