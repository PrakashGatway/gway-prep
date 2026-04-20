import * as z  from "zod";

export const StudentValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(40, "Name to long"),
  course: z.string().trim().min(1, "Course is required"),
  score: z.string().optional(),
  image: z.string().url("Invalide image url").optional(),
  university: z.string().trim().min(1, "university is required"),
  universityLogo: z.string().url("Invalid image url").optional(),
  about: z.any().default({}),
  outcome: z.any().default({}),
  type: z.enum(["image", "video"]).default("image"),
  message: z.string().optional(),
  messageDate: z.string().optional(),// Use z.coerce.date() if sending ISO strings
  video: z.string().optional(),
  rating: z.string().optional(),
});

export type StudentInput = z.infer<typeof StudentValidationSchema>;
