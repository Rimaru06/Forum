import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { getTokenData } from "@/helpers/getTokenData";
import {postSchema} from "@/actions/validation";
export async function POST(NextRequest: NextRequest)
{
    const tokenData = await getTokenData(NextRequest);
    if(!tokenData) return NextResponse.json({message: "Unauthorized", status: 401});
    
    const body = await NextRequest.json();
    const validationResult = postSchema.safeParse(body);
    if(!validationResult.success) return NextResponse.json({message: "Invalid Input", status: 400});
    try {
        await prisma.post.create({
            data : {
                title : validationResult.data.title,
                content : validationResult.data.content,
                imageUrl : validationResult.data.imageUrl,
                authorId : tokenData.id
            }
        })
        return NextResponse.json({message: "Post Created Successfully", status: 200});
    } catch (error : any) {
        return NextResponse.json({message: error.message, status: 400});
    }
}