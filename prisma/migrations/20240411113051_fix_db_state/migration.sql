/*
  Warnings:

  - A unique constraint covering the columns `[playerId,gameSessionId]` on the table `GameLeaderboard` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "GameLeaderboard_gameSessionId_key";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "media" TEXT,
ADD COLUMN     "mediaType" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "GameLeaderboard_playerId_gameSessionId_key" ON "GameLeaderboard"("playerId", "gameSessionId");
