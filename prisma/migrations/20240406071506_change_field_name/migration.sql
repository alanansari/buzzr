/*
  Warnings:

  - You are about to drop the column `cuurentQuetion` on the `GameSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "cuurentQuetion",
ADD COLUMN     "cuurentQuestion" INTEGER NOT NULL DEFAULT 0;
