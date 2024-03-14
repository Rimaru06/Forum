"use server";


import z from "zod";
import { userSchema } from "./validation";


export type InputSechema = z.infer<typeof userSchema>;