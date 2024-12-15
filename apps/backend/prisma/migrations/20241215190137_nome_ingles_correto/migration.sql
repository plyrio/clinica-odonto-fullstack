/*
  Warnings:

  - You are about to drop the `Speciality` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'EMPLOYEE';

-- DropForeignKey
ALTER TABLE "_EmployeeSpecialties" DROP CONSTRAINT "_EmployeeSpecialties_A_fkey";

-- DropTable
DROP TABLE "Speciality";

-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "Specialty"("name");

-- AddForeignKey
ALTER TABLE "_EmployeeSpecialties" ADD CONSTRAINT "_EmployeeSpecialties_A_fkey" FOREIGN KEY ("A") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
