import { prisma } from '@/utils/prisma';
import Image from 'next/image';
import GamePage from '@/components/Player/GamePage';
import { GameSession } from '@prisma/client';
import ValidatePlayer from '@/components/Player/ValidatePlayer';

const page = async ({ params }: { params: { playerId: string } }) => {

    const player = await prisma.player.findUnique({
        where: { id: params.playerId }
    });

    if (!player) {
        throw new Error('Player not found');
    }

    if (!player.gameId) {
        throw new Error('Player not in game');
    }

    const game = await prisma.gameSession.findUnique({
        where: { id: player.gameId },
        include: {
            quiz: {
                include: {
                    questions: {
                        include: {
                            options: {
                                select: {
                                    id: true,
                                    title: true
                                }
                            }
                        }
                    }
                }
            },
            creator: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    });

    return (
        <>
            <ValidatePlayer playerId={player.id} />
            <div className="p-4 pb-2 flex justify-between">
                <Image
                    src="/logo.svg"
                    width={80}
                    height={80}
                    alt="Logo"
                />
            </div>
            <GamePage player={player} game={game as GameSession} />
        </>
    )
}

export default page