/*
  Warnings:

  - You are about to drop the column `createdAt` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `staff` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "roles" DROP COLUMN "createdAt",
DROP COLUMN "updateAt";

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "createdAt",
DROP COLUMN "updateAt";
