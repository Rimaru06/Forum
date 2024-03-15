"use server";
import z from "zod";

export const userSchema = z.object({
    name : z.string().optional(),
    email : z.string().email(),
    password : z.string().min(6)
})

export const postSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(3).max(10000),
  imageUrl : z.string().optional(),
  authorId : z.string()
});