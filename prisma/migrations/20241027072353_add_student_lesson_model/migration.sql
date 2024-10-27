-- CreateTable
CREATE TABLE "student_lesson" (
    "id" SERIAL NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "is_there" BOOLEAN NOT NULL,
    "reason" TEXT,
    "be_paid" BOOLEAN NOT NULL,

    CONSTRAINT "student_lesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_lesson" ADD CONSTRAINT "student_lesson_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_lesson" ADD CONSTRAINT "student_lesson_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
