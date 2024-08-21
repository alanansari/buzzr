import { prisma } from "@/utils/prisma";
import SetLocalItem from "@/components/Player/setLocalItem";
import ResetReduxStates from "@/components/Player/ResetReduxStates";
import JoinRoomForm from "@/components/Player/Setup/JoinRoomForm";
import ClientImage from "@/components/ClientImage";

async function JoinRoom({ params }: { params: { playerId: string } }) {
  const player = await prisma.player.findUnique({
    where: {
      id: params.playerId,
    },
  });

  if (!player) {
    throw new Error("Player not found");
  }

  if (player?.gameId) {
    await prisma.player.update({
      where: { id: params.playerId },
      data: {
        gameId: null,
      },
    });
  }
  return (
    <>
      <SetLocalItem mapKey="playerId" value={params.playerId} />
      <ResetReduxStates />
      <div className="p-4 flex justify-between">
        <ClientImage
          props={{
            src: "/images/logo.svg",
            darksrc: "/images/logo-dark.svg",
            alt: "Buzzr Logo",
            width: 80,
            height: 80,
          }}
        />
      </div>
      <div className="w-full h-[81vh] flex gap-4 px-4 [&>*]:bg-white dark:[&>*]:bg-dark [&>*]:rounded-xl">
        <div className="w-full md:w-fit py-4">
          <JoinRoomForm playerId={params.playerId} />
        </div>
        <div className="w-[40vw] hidden md:block"></div>
      </div>
    </>
  );
}

export default JoinRoom;
