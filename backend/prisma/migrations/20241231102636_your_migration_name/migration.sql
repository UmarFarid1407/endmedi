/*
  Warnings:

  - You are about to drop the `FileStorage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FileStorage";

-- CreateTable
CREATE TABLE "FileMetadata" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "fileData" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileMetadata_pkey" PRIMARY KEY ("id")
);
