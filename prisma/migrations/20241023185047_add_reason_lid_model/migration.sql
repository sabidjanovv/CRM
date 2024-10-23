-- CreateTable
CREATE TABLE "reason_lid" (
    "id" SERIAL NOT NULL,
    "reason_lid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reason_lid_pkey" PRIMARY KEY ("id")
);
