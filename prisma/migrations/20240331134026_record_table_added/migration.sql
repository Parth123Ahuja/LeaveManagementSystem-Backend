-- CreateEnum
CREATE TYPE "stage" AS ENUM ('FACULTY', 'HOD');

-- CreateEnum
CREATE TYPE "leaveType" AS ENUM ('causual', 'earned', 'medical', 'academic');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('accepted', 'rejected');

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "stage" "stage" NOT NULL,
    "type" "leaveType" NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "status" "status" NOT NULL,
    "reqMessage" TEXT NOT NULL,
    "rejMessage" TEXT NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);
