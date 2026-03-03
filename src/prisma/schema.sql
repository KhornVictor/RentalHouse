-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Room" (
    "roomid" SERIAL NOT NULL,
    "roomnumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "rentamount" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomid")
);

-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Lease" (
    "leaseid" SERIAL NOT NULL,
    "roomid" INTEGER NOT NULL,
    "tenantid" INTEGER NOT NULL,
    "moveindate" DATE NOT NULL,
    "moveoutdate" DATE NOT NULL,
    "rentamount" DECIMAL(65,30) NOT NULL,
    "depositamount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Lease_pkey" PRIMARY KEY ("leaseid")
);

-- CreateTable
CREATE TABLE "Bill" (
    "billid" SERIAL NOT NULL,
    "leaseid" INTEGER NOT NULL,
    "billingmonth" DATE NOT NULL,
    "electricityunits" DECIMAL(65,30) NOT NULL,
    "electricityrate" DECIMAL(65,30) NOT NULL,
    "waterunits" DECIMAL(65,30) NOT NULL,
    "waterrate" DECIMAL(65,30) NOT NULL,
    "paymentstatus" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("billid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Lease" ADD CONSTRAINT "Lease_roomid_fkey" FOREIGN KEY ("roomid") REFERENCES "Room"("roomid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lease" ADD CONSTRAINT "Lease_tenantid_fkey" FOREIGN KEY ("tenantid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_leaseid_fkey" FOREIGN KEY ("leaseid") REFERENCES "Lease"("leaseid") ON DELETE RESTRICT ON UPDATE CASCADE;
