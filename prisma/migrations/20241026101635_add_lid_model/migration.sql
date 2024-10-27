/*
  Warnings:

  - You are about to drop the column `createdAt` on the `lid_status` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `lid_status` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `reason_lid` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `reason_lid` table. All the data in the column will be lost.
  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "lid_status" DROP COLUMN "createdAt",
DROP COLUMN "updateAt";

-- AlterTable
ALTER TABLE "reason_lid" DROP COLUMN "createdAt",
DROP COLUMN "updateAt";

-- DropTable
DROP TABLE "Students";

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "lid_id" INTEGER NOT NULL,
    "payment_last_date" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lids" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "target_id" INTEGER NOT NULL,
    "lid_stage_id" INTEGER NOT NULL,
    "test_date" TIMESTAMP(3),
    "trial_lesson_date" TIMESTAMP(3),
    "trial_lesson_time" TEXT,
    "trial_lesson_group_id" INTEGER,
    "lid_status_id" INTEGER NOT NULL,
    "cancel_reason_id" INTEGER,

    CONSTRAINT "lids_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_lid_id_fkey" FOREIGN KEY ("lid_id") REFERENCES "lids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lids" ADD CONSTRAINT "lids_lid_status_id_fkey" FOREIGN KEY ("lid_status_id") REFERENCES "lid_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lids" ADD CONSTRAINT "lids_cancel_reason_id_fkey" FOREIGN KEY ("cancel_reason_id") REFERENCES "reason_lid"("id") ON DELETE SET NULL ON UPDATE CASCADE;
