import * as z from "zod";

export const FormValidation = z.object({
    name : z.string().trim().min(1,"Name is required").max(40, "Name to long"),
    email : z.string().trim().min(1,"Email to required"),
    phoneNo : z.string().optional(),
    cite: z.string().optional(),
    schoolName: z.string().optional(),
    Grade: z.string().optional(),
    other: z.any().default({})
})

export type FormInput = z.infer<typeof FormValidation>;
