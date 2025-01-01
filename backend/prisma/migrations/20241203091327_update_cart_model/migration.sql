/*
  Warnings:

  - You are about to drop the column `medicineId` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `mediciinemadeIN` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineCategory` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineExpiryDate` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineID` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineManufacturingDate` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineName` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineQuantity` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceofonemedicineinTablet` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerID` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_medicineId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "medicineId",
ADD COLUMN     "mediciinemadeIN" TEXT NOT NULL,
ADD COLUMN     "medicineCategory" TEXT NOT NULL,
ADD COLUMN     "medicineExpiryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "medicineID" INTEGER NOT NULL,
ADD COLUMN     "medicineManufacturingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "medicineName" TEXT NOT NULL,
ADD COLUMN     "medicineQuantity" INTEGER NOT NULL,
ADD COLUMN     "medicinequantityinonetablet" INTEGER,
ADD COLUMN     "mgs" INTEGER,
ADD COLUMN     "priceofonemedicineinTablet" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sellerID" INTEGER NOT NULL,
ADD COLUMN     "totalAmount" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_medicineID_fkey" FOREIGN KEY ("medicineID") REFERENCES "Medicine"("medicineID") ON DELETE RESTRICT ON UPDATE CASCADE;
