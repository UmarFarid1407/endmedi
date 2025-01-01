-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "medicineID" SERIAL NOT NULL,
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

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("medicineID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
