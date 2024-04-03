import { prisma } from '@/utils/prisma';
import Image from 'next/image';
import GamePage from '@/components/Player/GamePage';
import { GameSession } from '@prisma/client';

const page = async ({params}:{ params: { playerId: string } }) => {

    const player = await prisma.player.findUnique({
        where: {id: params.playerId}
    });

    if(!player){
        throw new Error('Player not found');
    }

    if(!player.gameId){
        throw new Error('Player not in game');
    }

    const game = await prisma.gameSession.findUnique({
        where: { id: player.gameId }
    });

    return (
        <div>
            {/* <h1>Player Page</h1>
            <p>Player Name: {player.name}</p>
            <Image src={player.profilePic as string} alt='player-avatar' width='100' height='100' />
            <p>Player ID: {player.id}</p>
            <p>Game Code: {game?.gameCode}</p> */}
            <div className='flex items-center justify-between bg-transparent border-b w-[100vw]'>
                <div className='text-md mx-2 font-bold text-slate-200'>Game Code: {game?.gameCode}</div>
                <div className='p-1 flex justify-center items-center'>
                <Image className='rounded-full border border-b-slate-200' src={player.profilePic as string} alt='player-avatar' width='50' height='50' />
                <div className='text-md text-slate-200 mx-2 font-bold'>Player: {player.name}</div>
                </div>
            </div>
            <GamePage player={player} game={game as GameSession} />
        </div>
    )
}

export default page