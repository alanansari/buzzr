"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const addBuzzr = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect("/api/auth/signin");

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        userId: user?.id as string,
      },
    });

    console.log(quiz)

    revalidatePath("/", "page");
    return { quizId: quiz.id };

  } catch (err: any) {
    return { error: err.message };
  }
};

export default addBuzzr;
