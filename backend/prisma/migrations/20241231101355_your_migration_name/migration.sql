-- CreateTable
CREATE TABLE "FileStorage" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "fileData" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileStorage_pkey" PRIMARY KEY ("id")
);
