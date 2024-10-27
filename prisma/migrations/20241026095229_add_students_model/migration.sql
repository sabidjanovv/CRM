-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "lid_id" TEXT NOT NULL,
    "payment_last_date" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);
