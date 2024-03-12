import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

async function addQues(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  // const filetype = formData.get("file") as string
  const option1 = formData.get("option1") as string;
  const option2 = formData.get("option2") as string;
  const option3 = formData.get("option3") as string;
  const option4 = formData.get("option4") as string;

  const check_option1 = formData.get("check_option1") as unknown as boolean;
  const check_option2 = formData.get("check_option2") as unknown as boolean;
  const check_option3 = formData.get("check_option3") as unknown as boolean;
  const check_option4 = formData.get("check_option4") as unknown as boolean;

  var options = [
    { title: option1, isCorrect: check_option1 ? true : false },
    { title: option2, isCorrect: check_option2 ? true : false },
    { title: option3, isCorrect: check_option3 ? true : false },
    { title: option4, isCorrect: check_option4 ? true : false },
  ];

//   console.log(title, options);

    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect("/api/auth/signin");

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    await prisma.question.create({
      data: {
        title,
        options: {
          create: options,
        },
        quizId: "cltixyqqo000113a2d44t9buq",
      },
    });

    revalidatePath("/quiz/[quizId]")
}

export default addQues;
