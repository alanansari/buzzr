import { prisma } from "@/utils/prisma"
import SetLocalItem from "@/components/Player/setLocalItem"
import ResetReduxStates from "@/components/Player/ResetReduxStates"
import JoinRoomForm from "@/components/Player/Setup/JoinRoomForm"
import { ToastContainer } from "react-toastify"

async function JoinRoom({ params }: { params: { playerId: string } }) {

    const player = await prisma.player.findUnique({
        where: {
            id: params.playerId
        }
    })

    if (!player) {
        throw new Error('Player not found')
    }

    if (player.gameId) {
        await prisma.player.update({
            where: { id: params.playerId },
            data: {
                gameId: null
            }
        })
    }
    return <>
        <div className="flex flex-col justify-center items-center max-h-full">
            <h1 className="text-3xl font-semibold uppercase mt-12 text-white">Buzzr !</h1>
            <div className="flex flex-col justify-center items-center px-4 py-6 mx-2 md:mx-0 w-11/12 md:w-2/5 my-6 bg-white rounded-lg">
                <SetLocalItem mapKey='playerId' value={params.playerId} />
                <ResetReduxStates />
                <JoinRoomForm playerId={params.playerId}/>
            </div>
        </div>
        <ToastContainer />
    </>
}

export default JoinRoom
