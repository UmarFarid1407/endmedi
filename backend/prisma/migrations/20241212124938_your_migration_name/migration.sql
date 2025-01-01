-- CreateTable
CREATE TABLE "UserCart" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "medicineID" INTEGER NOT NULL,
    "medicineName" TEXT NOT NULL,
    "medicineQuantity" INTEGER NOT NULL,
    "medicineCategory" TEXT NOT NULL,
    "priceofonemedicineinTablet" DOUBLE PRECISION NOT NULL,
    "medicinequantityinonetablet" INTEGER,
    "mediciinemadeIN" TEXT NOT NULL,
    "medicineExpiryDate" TIMESTAMP(3) NOT NULL,
    "sellerID" INTEGER NOT NULL,
    "medicineManufacturingDate" TIMESTAMP(3) NOT NULL,
    "mgs" INTEGER,
    "paymentStatus" TEXT NOT NULL DEFAULT 'not delivered',
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCart" ADD CONSTRAINT "UserCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCart" ADD CONSTRAINT "UserCart_medicineID_fkey" FOREIGN KEY ("medicineID") REFERENCES "Medicine"("medicineID") ON DELETE RESTRICT ON UPDATE CASCADE;
