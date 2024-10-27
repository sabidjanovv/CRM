/*
  Warnings:

  - You are about to drop the `student_group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "student_group" DROP CONSTRAINT "student_group_groupId_fkey";

-- DropForeignKey
ALTER TABLE "student_group" DROP CONSTRAINT "student_group_studentId_fkey";

-- DropTable
DROP TABLE "student_group";

-- CreateTable
CREATE TABLE "target" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "target_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "target_name_key" ON "target"("name");

-- AddForeignKey
ALTER TABLE "lids" ADD CONSTRAINT "lids_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "target"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
