import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ClientImage from "@/components/ClientImage";
import CreateAIQuiz from "../Gemini/CreateAIQuiz";
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

  return (
    // <div className="flex flex-wrap gap-3 w-full mt-4 md:max-h-[70vh] overflow-y-auto">
    //   <Link
    //     href="/admin/quiz/createQuiz"
    //     className="p-2 border border-[#c2b4fe] dark:border-transparent h-[50vh] w-full md:h-44 md:w-40 bg-card-light hover:bg-cardhover-light dark:bg-card-dark hover:dark:bg-cardhover-dark text-dark dark:text-white rounded flex flex-col justify-center items-center"
    //   >
    //     <div className="h-full w-full flex justify-center items-center">
    //       <ClientImage
    //         props={{
    //           src: "/add.svg",
    //           darksrc: "/add-dark.svg",
    //           alt: "Create Quiz",
    //           width: 45,
    //           height: 45
    //         }}
    //       />
    //     </div>
    //     <div className="text-xs font-bold w-full">Create a new quiz</div>
    //     <div className="text-xs w-full">Build from the ground up</div>
    //   </Link>
    //   <Link
    //     href="#"
    //     className="p-2 border border-[#c2b4fe] dark:border-transparent h-[50vh] w-full md:h-44 md:w-40 bg-card-light hover:bg-cardhover-light dark:bg-card-dark hover:dark:bg-cardhover-dark text-dark dark:text-white rounded flex flex-col justify-center items-center"
    //   >
    //     <div className="h-full w-full flex justify-center items-center">
    //       <ClientImage
    //         props={{
    //           src: "/download.svg",
    //           darksrc: "/download-dark.svg",
    //           alt: "Import Quiz",
    //           width: 45,
    //           height: 45
    //         }}
    //       />
    //     </div>
    //     <div className="text-xs font-bold w-full">Import an existing quiz</div>
    //     <div className="text-xs w-full">Coming soon...</div>
    //   </Link>
    //   <CreateAIQuiz />
    //   {quizzes.map((quiz) => (
    //     <Link
    //       href={`/admin/quiz/${quiz.id}`}
    //       key={quiz.id}
    //       className="p-2 border border-[#c2b4fe] dark:border-transparent h-[50vh] w-full md:h-44 md:w-40 bg-card-light hover:bg-cardhover-light dark:bg-card-dark hover:dark:bg-cardhover-dark text-dark dark:text-white rounded"
    //     >
    //       <h2 className="text-md font-bold dark:text-white">{quiz.title}</h2>
    //       <p className="text-xs text-off-dark dark:text-off-white">{quiz.description}</p>
    //     </Link>
    //   ))}
    // </div>

    <ClientBuzzr quizzes={quizzes} />
  );
};

export default Buzzrs;
