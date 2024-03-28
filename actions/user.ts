"use server";
import prisma from "@/db";
import jwt from "jsonwebtoken";
import { InputSechema } from "../types/types";
import { cookies } from "next/headers";
export async  function register({name, email, password} : InputSechema){
  try {
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
    cookies().set("authtoken", token);
    return { token, message: "User Created Successfully", status: 200 };
  } catch (error: any) {
    return { message: error.message, status: 400 };
  }
}
export async function login({email, password} : InputSechema  , ) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email : email,
      },
    });
    if (user?.password === password) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
      cookies().set("authtoken", token);
      return {
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
