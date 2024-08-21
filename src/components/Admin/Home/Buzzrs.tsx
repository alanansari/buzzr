import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import ClientBuzzr from "./ClientBuzzrs";

const Buzzrs = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/api/auth/signin");

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  let quizzes = await prisma.quiz.findMany({
    where: {
      userId: user?.id as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <ClientBuzzr quizzes={quizzes} />;
};

export default Buzzrs;
