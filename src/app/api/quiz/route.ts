import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";

// export const GET = async (req: NextRequest, res: NextResponse) => {
//     return NextResponse.json({ success: true, message: "Hello" });
// };

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        // const session = await getServerSession(authOptions);
        // if(!session||!session.user){
        //     return NextResponse.json({ success: false, message: "Unauthorized" }, {
        //         status: 401
        //     });
        // }
        // const user = await prisma.user.findUnique({
        //     where: {
        //         email: session.user.email as string
        //     }
        // });
        const quizzes = await prisma.quiz.findMany();
        return NextResponse.json({ success: true, message: "Fetched Quizzes", quizzes });
    } catch (error) {
        return NextResponse.json({ success: false, error }, {
            status: 500
        });
    }
};


// create a new quiz
export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        // const session = await getServerSession(authOptions);
        // if(!session||!session.user){
        //     return NextResponse.json({ success: false, message: "Unauthorized" }, {
        //         status: 401
        //     });
        // }
        // const user = await prisma.user.findUnique({
        //     where: {
        //         email: session.user.email as string
        //     }
        // });
        const { title, description, userId } = await req.json();
        const quiz = await prisma.quiz.create({
            data: {
                title,
                description,
                userId : "clt7hcn5j00005m2xbu50j442"              // userId: user?.id as string
            }
        });
        return NextResponse.json({ success: true, message: "Quiz Created", quiz });
    } catch (error) {
        return NextResponse.json({ success: false, error }, {
            status: 500
        });
    }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    try {
        // const session = await getServerSession(authOptions);
        // if(!session||!session.user){
        //     return NextResponse.json({ success: false, message: "Unauthorized" }, {
        //         status: 401
        //     });
        // }
        // const user = await prisma.user.findUnique({
        //     where: {
        //         email: session.user.email as string
        //     }
        // });
        const { id,userId } = await req.json();
        const quiz = await prisma.quiz.delete({
            where: {
                id,
                userId      // user?.id as string
            }
        });
        if(!quiz){
            return NextResponse.json({ success: false, message: "Quiz Not Found" }, {
                status: 404
            });
        }
        return NextResponse.json({ success: true, message: "Quiz Deleted", quiz });
    } catch (error) {
        return NextResponse.json({ success: false, error }, {
            status: 500
        });
    }
}