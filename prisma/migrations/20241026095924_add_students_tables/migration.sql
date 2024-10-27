/*
  Warnings:

  - Changed the type of `lid_id` on the `Students` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "lid_id",
ADD COLUMN     "lid_id" INTEGER NOT NULL;
