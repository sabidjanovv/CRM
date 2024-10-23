-- CreateTable
CREATE TABLE "lid_status" (
    "id" SERIAL NOT NULL,
    "reason_lid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lid_status_pkey" PRIMARY KEY ("id")
);
