"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

async function dltQuestion(quesId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect("/api/auth/signin");

    await prisma.question.delete({
      where: {
        id: quesId,
      },
    });
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
}

export default dltQuestion;
