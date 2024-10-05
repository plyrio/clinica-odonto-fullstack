/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "Doctor"("userId");
