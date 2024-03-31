/*
  Warnings:

  - The values [MASTER,ADMIN,MEMBER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `username` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('FACULTY', 'HOD', 'DIRECTOR');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "username" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
