import * as z from "zod";

export const BlogCategory = z.object({
    name : z.string().trim().min(1,"Name is required"),
    // slug : z.string().trim()
});

export type BlogCategory = z.infer<typeof BlogCategory>;