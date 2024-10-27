-- CreateTable
CREATE TABLE "student_group" (
    "studentId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "student_group_pkey" PRIMARY KEY ("studentId","groupId")
);

-- AddForeignKey
ALTER TABLE "student_group" ADD CONSTRAINT "student_group_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_group" ADD CONSTRAINT "student_group_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
