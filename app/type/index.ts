import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Need one uppercase letter")
    .regex(/[0-9]/, "Need one number")
    .regex(/[^a-zA-Z0-9]/, "Need one special character"),
  role: z.string()
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type RegisterInput = z.Infer<typeof RegisterSchema>;
export type LoginInput = z.Infer<typeof LoginSchema>;

export interface JWTPayload {
  userid: string;
  role: "user" | "admin";
}
