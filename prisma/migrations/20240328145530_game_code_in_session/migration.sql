/*
  Warnings:

  - A unique constraint covering the columns `[gameCode]` on the table `GameSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameCode` to the `GameSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "gameCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_gameCode_key" ON "GameSession"("gameCode");
