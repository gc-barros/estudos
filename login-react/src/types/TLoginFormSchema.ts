import { z } from "zod";
import { errorsMessages } from "../utils/templateMessages";

export type TLoginSchema = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  username: z.string().min(1, errorsMessages.requiredField),
  password: z
    .string()
    .refine((val) => val.trim().length > 0, {
      message: errorsMessages.requiredField,
    })
    .refine((val) => val.length >= 4 && val.length <= 12, {
      message: errorsMessages.passwordLength,
    }),
});