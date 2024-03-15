"use server";
import prisma from "@/db";
import jwt from "jsonwebtoken";
import { InputSechema } from "./types";
import { userSchema } from "./validation";
import {cookies} from "next/headers"
export async function Signup({name ,email, password } 
    : InputSechema) {
  try {
    if (!userSchema.safeParse({ name, email, password }).success) {
      return { message: "Invalid Input", status: 400 };
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    cookies().set("token", token);
    return {message: "User Created Successfully", status: 200 };
  } catch (error: any) {
    return { message: error.message, status: 400 };
  }
}

export async function Signin({email, password} : InputSechema) {
  try {
    if (!userSchema.safeParse({ email, password }).success) {
      return { message: "Invalid Input", status: 400 };
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user?.password === password) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
      return {
        token: token,
        message: "User Logged In Successfully",
        status: 200,
      };
    } else {
      return { message: "Invalid Credentials", status: 400 };
    }
  } catch (error: any) {
    return { message: error.message, status: 400 };
  }
}
