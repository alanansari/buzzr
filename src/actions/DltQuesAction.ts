"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function dltQuestion(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect("/api/auth/signin");
    const quesId = formData.get("ques_id") as string;

    await prisma.question.delete({
      where: {
        id: quesId,
      },
    });

    revalidatePath("/quiz/[quizId]");
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
}

export default dltQuestion;
