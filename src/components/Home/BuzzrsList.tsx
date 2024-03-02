import Image from 'next/image'
import Link from 'next/link'
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

const BuzzrsList = async () => {
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

  const total = quizzes.length;

  quizzes = quizzes.slice(0, 3);
  return (
    <div className="flex flex-wrap justify-evenly p-4 w-full">
        {quizzes.map((quiz) => (
          <Link
            href={`/quiz/${quiz.id}`}
            key={quiz.id}
            className="m-2 p-2 bg-slate-100 text-slate-950 rounded-md shadow-md"
          >
            <Image
              src={quiz.thumbnail ? quiz.thumbnail : "/card_placeholder.png"}
              alt={quiz.title}
              width={100}
              height={100}
              className="w-[90px] h-auto rounded-md"
            />
            <h2 className="text-md">{quiz.title}</h2>
            <p className="text-xs">{quiz.description}</p>
          </Link>
        ))}
        <Link
          href="/library"
          className="h-[24vh] w-[18vh] border-2 border-blue-600 text-blue-600 text-sm m-2 p-2 rounded-md flex justify-center items-center"
        >
          <u>{`See All(${total})`}</u>
        </Link>
    </div>
  )
}

export default BuzzrsList