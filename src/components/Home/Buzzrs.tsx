import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

  const total = quizzes.length;

  quizzes = quizzes.slice(0, 3);

  return (
    <div className="mt-4 w-[50vw] mx-auto border-[1.5px] rounded-2xl flex flex-col items-center">
      <h1>Your Buzzrs</h1>
      <div className="flex flex-wrap justify-evenly p-4 w-full">
        {quizzes.map((quiz) => (
          <Link
            href={`/quiz/${quiz.id}`}
            key={quiz.id}
            className="m-2 p-2 bg-slate-100 text-slate-950 rounded-lg shadow-md"
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
        {total != 0 ? (
          <Link
            href="/library"
            className="h-[24vh] w-[18vh] border-2 border-blue-600 text-blue-600 text-sm m-2 p-2 rounded-md flex justify-center items-center"
          >
            <u>{`See All(${total})`}</u>
          </Link>
        ) : (
          <p className="text-slate-500">No Buzzrs yet..</p>
        )}
      </div>
    </div>
  );
};

export default Buzzrs;
