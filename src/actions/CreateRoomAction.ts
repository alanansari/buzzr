import { auth } from "@/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { customAlphabet } from "nanoid";

const createRoom = async (formData: FormData) => {
  "use server";

  const session = await auth();
  if (!session || !session.user) redirect("/api/auth/signin");

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  const gameCode = customAlphabet("abcdefghijkmnpqrstuvwxyz23456789", 6)();

  const room = await prisma.gameSession.create({
    data: {
      gameCode,
      quizId: formData.get("quizId") as string,
      creatorId: user?.id as string,
    },
  });

  redirect(`/admin/play/${room?.id}`);
};

export default createRoom;
