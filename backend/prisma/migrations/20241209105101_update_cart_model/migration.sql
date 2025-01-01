/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Made the column `sessionId` on table `Cart` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "sessionId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_sessionId_key" ON "Cart"("sessionId");
