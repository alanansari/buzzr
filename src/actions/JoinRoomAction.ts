"use server";
import { prisma } from "@/utils/prisma";

export default async function joinRoom(formData: FormData){
    try {
        const gameCode = formData.get('gameCode') as string;
        const playerId = formData.get('playerId') as string;

        const game = await prisma.gameSession.findUnique({
            where: { gameCode }
        });

        if(!game){
            throw new Error('Game not found');
        }

        const playerAttach = await prisma.player.update({
            where: { id: playerId },
            data: {
                gameId: game.id
            }
        });

        if(!playerAttach){
            throw new Error('Player not found');
        }
        return { roomId : game.id, playerId: playerId }
    } catch (err:any) {
        return { error: err.message }
    }
}

