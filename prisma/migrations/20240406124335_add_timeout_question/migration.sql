/*
  Warnings:

  - You are about to drop the column `cuurentQuestion` on the `GameSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "cuurentQuestion",
ADD COLUMN     "currentQuestion" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "timeOut" INTEGER NOT NULL DEFAULT 15;
