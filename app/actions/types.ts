"use server";


import z from "zod";
import { userSchema , postSchema } from "./validation";


export type InputSechema = z.infer<typeof userSchema>;
export type PostSchema = z.infer<typeof postSchema>;