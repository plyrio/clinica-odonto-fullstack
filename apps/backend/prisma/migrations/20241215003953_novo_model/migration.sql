/*
  Warnings:

  - The values [EMPLOYEE] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `employeeId` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DoctorSpecialties` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EmployeeToService` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Changed the column `role` on the `User` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'PATIENT', 'ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'MANAGER');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new"[] USING ("role"::text::"Role_new"[]);
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropForeignKey
ALTER TABLE "_DoctorSpecialties" DROP CONSTRAINT "_DoctorSpecialties_A_fkey";

-- DropForeignKey
ALTER TABLE "_DoctorSpecialties" DROP CONSTRAINT "_DoctorSpecialties_B_fkey";

-- DropForeignKey
ALTER TABLE "_EmployeeToService" DROP CONSTRAINT "_EmployeeToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_EmployeeToService" DROP CONSTRAINT "_EmployeeToService_B_fkey";

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "employeeId",
ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "imgUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "role" SET DATA TYPE "Role"[];

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "_DoctorSpecialties";

-- DropTable
DROP TABLE "_EmployeeToService";

-- DropEnum
DROP TYPE "EmployeeRole";

-- CreateTable
CREATE TABLE "_EmployeeSpecialties" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EmployeeServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeSpecialties_AB_unique" ON "_EmployeeSpecialties"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeSpecialties_B_index" ON "_EmployeeSpecialties"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeServices_AB_unique" ON "_EmployeeServices"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeServices_B_index" ON "_EmployeeServices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeSpecialties" ADD CONSTRAINT "_EmployeeSpecialties_A_fkey" FOREIGN KEY ("A") REFERENCES "Speciality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeSpecialties" ADD CONSTRAINT "_EmployeeSpecialties_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeServices" ADD CONSTRAINT "_EmployeeServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeServices" ADD CONSTRAINT "_EmployeeServices_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
