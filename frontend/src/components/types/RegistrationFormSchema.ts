import {z, ZodType} from "zod";
import {RegistrationData} from "./RegistrationData.ts";

export const RegistrationFormSchema: ZodType<RegistrationData> = z
    .object({
      username: z
          .string({required_error: "Username is required"})
          .trim()
          .min(1, {message: "Username is required"})
          .min(3, {message: "Minimum 3 character"})
          .max(35, {message: "Maximum 35 character"}),
      password: z
          .string({required_error: "Password is required"})
          .trim()
          .min(1, {message: "Password is required"})
          .min(3, {message: "Minimum 3 character"})
          .max(35, {message: "Maximum 35 character"}),
      confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });