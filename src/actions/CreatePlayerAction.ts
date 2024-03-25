import { prisma } from "@/utils/prisma";
import { connectSocket } from "./ConnectSktAction";
import { io } from "socket.io-client";

const createPlayer = async (formData: FormData) => {
  "use server";
  const name = formData.get("username") as string;
  const profilePic = formData.get("profile") as string;

  const player = await prisma.player.create({
    data: {
      name,
      profilePic
    },
  });

  // connectSocket(player?.id)
  const socket = io(
    `http://localhost:8080?userType=player&playerId=${player?.id}`
  );
  console.log(socket);
};

export default createPlayer;
