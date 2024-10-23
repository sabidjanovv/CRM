/*
  Warnings:

  - You are about to drop the column `hashadRefreshToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "hashadRefreshToken",
ADD COLUMN     "hashedRefreshToken" TEXT;
