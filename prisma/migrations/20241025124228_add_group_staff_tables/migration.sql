-- CreateTable
CREATE TABLE "group_staff" (
    "staffId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "group_staff_pkey" PRIMARY KEY ("staffId","groupId")
);

-- AddForeignKey
ALTER TABLE "group_staff" ADD CONSTRAINT "group_staff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_staff" ADD CONSTRAINT "group_staff_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
