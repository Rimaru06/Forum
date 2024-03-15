import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getTokenData = async (request: NextRequest): Promise<any> => {
  try {
    const token: string | undefined = (request.cookies.get("authToken"))?.value;
    const secretKey: string | undefined = process.env.JWT_SECRET;
    if (!secretKey) throw new Error("JWT_SECRET not found in environment variables");
    const tokenData: any = jwt.verify(token as string, secretKey);
    return tokenData || null;
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {      
      throw error;
    } else if (error instanceof JsonWebTokenError) {
      throw new Error("Invalid token");
    } else {
      throw new Error("Error verifying token");
    }
  }
};
