import { prisma } from "@/utils/prisma"

const page = async ({params}:{params:{roomId: string}}) => {

    const startGame = await prisma.gameSession.update({
        where: {
            id: params.roomId
        },
        data: {
            isPlaying: true
        }
    });

    if(!startGame){
        throw new Error('Game not found')
    }

    return (
        <div>
            <h1>Gameplay</h1>
            <p>Game Code: {startGame.gameCode}</p>
        </div>
    )
}

export default page