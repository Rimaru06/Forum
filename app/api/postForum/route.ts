import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { getTokenData } from "@/helpers/getTokenData";
export async function POST(NextRequest: NextRequest)
{
    const tokenData = await getTokenData(NextRequest);
    if(!tokenData) return NextResponse.json({message: "Unauthorized", status: 401});
    
    const body = await NextRequest.json();
    try {
        await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                imageUrl : body.imageUrl,
                authorId : tokenData.id
            }
        })
        return NextResponse.json({message: "Post Created Successfully", status: 200});
    } catch (error : any) {
        return NextResponse.json({message: error.message, status: 400});
    }
}