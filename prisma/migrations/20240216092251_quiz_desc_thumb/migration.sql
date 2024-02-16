-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
