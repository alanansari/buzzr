import { prisma } from '@/utils/prisma';
import Image from 'next/image';

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
            <h1>Player Page</h1>
            <p>Player Name: {player.name}</p>
            <Image src={player.profilePic as string} alt='player-avatar' width='100' height='100' />
            <p>Player ID: {player.id}</p>
            <p>Game Code: {game?.gameCode}</p>
        </div>
    )
}

export default page