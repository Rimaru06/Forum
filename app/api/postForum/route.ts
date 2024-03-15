import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
export async function POST(req : NextRequest)
{
    const body = await req.json();
    try {
        await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                imageUrl : body.imageUrl,
                authorId : body.authorId
            }
        })
        return NextResponse.json({message: "Post Created Successfully", status: 200});
    } catch (error : any) {
        return NextResponse.json({message: error.message, status: 400});
    }
}