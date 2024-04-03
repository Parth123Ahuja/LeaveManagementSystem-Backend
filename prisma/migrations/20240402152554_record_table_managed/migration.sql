-- AlterEnum
ALTER TYPE "stage" ADD VALUE 'DIRECTOR';

-- AlterEnum
ALTER TYPE "status" ADD VALUE 'awaiting';

-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "status" SET DEFAULT 'awaiting',
ALTER COLUMN "reqMessage" SET DEFAULT 'applied for leave',
ALTER COLUMN "rejMessage" SET DEFAULT 'awaiting confimation';
