-- AlterTable
ALTER TABLE "User" ADD COLUMN     "academicLeave" INTEGER NOT NULL DEFAULT 15,
ADD COLUMN     "casualLeave" INTEGER NOT NULL DEFAULT 12,
ADD COLUMN     "earnedLeave" INTEGER NOT NULL DEFAULT 15,
ADD COLUMN     "medicalLeave" INTEGER NOT NULL DEFAULT 10;
