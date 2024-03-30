import { prisma } from "@/utils/prisma";

export default async function joinRoom(
  gameCode: string,
  socket: any,
  playerId?: string
) {
  //   //  update player model with gameId
  //   await prisma.player.update({
  //     where: { id: playerId },
  //     data: {
  //       gameId: game?.id,
  //     },
  //   });

  //  join room
  socket.emit("join room", gameCode);

  socket.on("user joined", (userid: string) => {
    console.log(`User ${userid} joined`);
  });
}
