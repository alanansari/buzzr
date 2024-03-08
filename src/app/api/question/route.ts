import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const quizId = req.nextUrl.searchParams.get("quizId");
        if(!quizId) return NextResponse.json({ success: false, message: "QuizId is required" }, {
            status: 400
        });
        const questions = await prisma.question.findMany({
            where: {
                quizId: quizId as string
            }
        });
        return NextResponse.json({ success: true, message: "Fetched Questions", questions });
    } catch (error) {
        return NextResponse.json({ success: false, error }, {
            status: 500
        });
    }
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { title, options, quizId } = await req.json();
        const question = await prisma.question.create({
            data: {
                title,
                options,
                quizId
            }
        });
        return NextResponse.json({ success: true, message: "Question Created", question });
    } catch (error) {
        return NextResponse.json({ success: false, error }, {
            status: 500
        });
    }
}