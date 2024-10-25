/*
  Warnings:

  - You are about to drop the column `hashed_password` on the `staff` table. All the data in the column will be lost.
  - You are about to drop the column `hashed_refresh_token` on the `staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Made the column `is_active` on table `staff` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "staff" DROP COLUMN "hashed_password",
DROP COLUMN "hashed_refresh_token",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "hashedRefreshToken" TEXT,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "is_active" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");
