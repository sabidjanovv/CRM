/*
  Warnings:

  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "group_staff" DROP CONSTRAINT "group_staff_groupId_fkey";

-- DropTable
DROP TABLE "Group";

-- CreateTable
CREATE TABLE "groups" (
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

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" SERIAL NOT NULL,
    "lesson_theme" TEXT NOT NULL,
    "lesson_number" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "lesson_date" TEXT NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "groups_group_name_key" ON "groups"("group_name");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_staff" ADD CONSTRAINT "group_staff_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
