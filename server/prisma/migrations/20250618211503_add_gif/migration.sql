-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "gifUrl" TEXT,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;
