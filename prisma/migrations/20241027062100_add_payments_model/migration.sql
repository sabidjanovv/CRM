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
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "payment_last_date" TEXT NOT NULL,
    "payment_date" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "is_paid" BOOLEAN NOT NULL,
    "total_attent" INTEGER NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
