/*
  Warnings:

  - You are about to drop the column `reason_lid` on the `lid_status` table. All the data in the column will be lost.
  - Added the required column `status` to the `lid_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lid_status" DROP COLUMN "reason_lid",
ADD COLUMN     "status" TEXT NOT NULL;
