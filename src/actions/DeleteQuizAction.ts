"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function dltQuiz(quizId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect("/api/auth/signin");

    await prisma.quiz.delete({
      where: {
        id: quizId,
      },
    });

    revalidatePath("/admin", "page");
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
}

export default dltQuiz;
