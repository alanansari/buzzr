import SubmitButton from "@/components/SubmitButton"
import joinRoom from "@/actions/JoinRoomAction"
import { prisma } from "@/utils/prisma"

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

    console.log(player)

    return <>
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold uppercase mt-12 text-white">Buzzr !</h1>
            <div className="flex flex-col justify-center items-center px-4 py-6 mx-2 md:mx-0 w-11/12 md:w-2/5 my-6 bg-white rounded-lg">
                <form className="flex flex-col justify-center items-center px-2 py-4 w-full md:w-4/5"
                    action={joinRoom}
                >
                    <label className="text-lg text-center ">Enter the Code to join the quiz</label>
                    <p className="text-sm text-slate-600 mt-2 mb-3 text-center">It is on the screen in front of you</p>
                    <input
                        type="hidden"
                        name="playerId"
                        value={params.playerId}
                    />
                    <input
                        type="text"
                        name="gameCode"
                        placeholder="enter room code to join"
                        className="w-full border-black border-2 focus:border-blue-600 outline-none text-slate-900 my-2 rounded p-2 capitalize mb-6 focus:shadow-md"
                        autoComplete="off"
                        required
                    />
                    <SubmitButton style='game' />
                </form>
            </div>
        </div>
    </>
}

export default JoinRoom


// if room already joined
// handle ondisconnect