"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

async function getAllQuestion(quizId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) redirect("/api/auth/signin");
    const questions = await prisma.question.findMany({
      where: {
        quizId: quizId as string,
      },
      include: {
        options: true,
      },
    });

    return { status: 200, questions };
  } catch (err: any) {
    return {
      status: 500,
      error: err.message,
    };
  }
}

export default getAllQuestion;
