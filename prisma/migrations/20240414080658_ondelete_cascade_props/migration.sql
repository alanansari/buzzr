/*
  Warnings:

  - A unique constraint covering the columns `[playerId,gameSessionId]` on the table `GameLeaderboard` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "GameLeaderboard" DROP CONSTRAINT "GameLeaderboard_gameSessionId_fkey";

-- DropForeignKey
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerAnswer" DROP CONSTRAINT "PlayerAnswer_gameSessionId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerAnswer" DROP CONSTRAINT "PlayerAnswer_optionId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerAnswer" DROP CONSTRAINT "PlayerAnswer_playerId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerAnswer" DROP CONSTRAINT "PlayerAnswer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_userId_fkey";

-- DropIndex
DROP INDEX "GameLeaderboard_gameSessionId_key";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "mediaType" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "GameLeaderboard_playerId_gameSessionId_key" ON "GameLeaderboard"("playerId", "gameSessionId");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameLeaderboard" ADD CONSTRAINT "GameLeaderboard_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAnswer" ADD CONSTRAINT "PlayerAnswer_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAnswer" ADD CONSTRAINT "PlayerAnswer_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAnswer" ADD CONSTRAINT "PlayerAnswer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAnswer" ADD CONSTRAINT "PlayerAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
