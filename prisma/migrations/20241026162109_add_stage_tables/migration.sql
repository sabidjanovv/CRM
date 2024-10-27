-- CreateTable
CREATE TABLE "stage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "stage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stage_name_key" ON "stage"("name");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_group_stage_id_fkey" FOREIGN KEY ("group_stage_id") REFERENCES "stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lids" ADD CONSTRAINT "lids_lid_stage_id_fkey" FOREIGN KEY ("lid_stage_id") REFERENCES "stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
