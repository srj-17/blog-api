-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "publishedAt" DROP NOT NULL,
ALTER COLUMN "published" SET DEFAULT false;
