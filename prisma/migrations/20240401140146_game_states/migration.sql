-- CreateEnum
CREATE TYPE "GameStates" AS ENUM ('question', 'answer', 'leaderboard');

-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "gameState" "GameStates" NOT NULL DEFAULT 'question',
ADD COLUMN     "isPlaying" BOOLEAN NOT NULL DEFAULT false;
