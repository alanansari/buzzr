"use server";

import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

const createPlayer = async (formData: FormData) => {
  const name = formData.get("username") as string;
  const profilePic = formData.get("profile") as string;

  const player = await prisma.player.create({
    data: {
      name,
      profilePic,
    },
  });

  redirect(`/player/joinRoom/${player?.id}`);
};

export default createPlayer;
