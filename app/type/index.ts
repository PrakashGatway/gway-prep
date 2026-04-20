// import { z } from "zod";

// export const RegisterSchema = z.object({
//   name: z.string().min(2).max(80),
//   email: z.string().email(),
//   password: z
//     .string()
//     .min(8)
//     .regex(/[A-Z]/, "Need one uppercase letter")
//     .regex(/[0-9]/, "Need one number")
//     .regex(/[^a-zA-Z0-9]/, "Need one special character"),
//   role: z.string()
// });

// export const LoginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(1),
// });

// export type RegisterInput = z.Infer<typeof RegisterSchema>;
// export type LoginInput = z.Infer<typeof LoginSchema>;

// export interface JWTPayload {
//   userid: string;
//   role: "user" | "admin";
// }



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
  role: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});


export const PageDataSchema = z.object({
  name:         z.string().min(2).max(100),
  description:  z.string().optional().default(""),
  seoMeta:      z.record(z.any()).optional().default({}),
  sections:     z.record(z.any()).optional().default({}),
  extraDetails: z.record(z.any()).optional().default({}),
});

export const UpdatePageDataSchema = PageDataSchema.partial().extend({
  name: z.string().min(2),
});


export type RegisterInput       = z.infer<typeof RegisterSchema>;
export type LoginInput          = z.infer<typeof LoginSchema>;
export type PageDataInput       = z.infer<typeof PageDataSchema>;
export type UpdatePageDataInput = z.infer<typeof UpdatePageDataSchema>;

export interface JWTPayload {
  userid: string;
  role: "user" | "admin";
}

