/*
  Warnings:

  - You are about to drop the column `createdAt` on the `branches` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `branches` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "branches" DROP COLUMN "createdAt",
DROP COLUMN "updateAt";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "group_name" TEXT NOT NULL,
    "lesson_start_time" TEXT NOT NULL,
    "lesson_continuous" TEXT NOT NULL,
    "lesson_week_day" TEXT NOT NULL,
    "group_stage_id" INTEGER NOT NULL,
    "room_number" TEXT NOT NULL,
    "room_floor" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "lessons_quant" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_group_name_key" ON "Group"("group_name");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
