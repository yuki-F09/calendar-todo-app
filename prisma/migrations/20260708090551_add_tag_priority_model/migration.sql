-- CreateTable
CREATE TABLE "TagPriority" (
    "id" SERIAL NOT NULL,
    "priority" INTEGER NOT NULL,
    "auth_id" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "TagPriority_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagPriority_tag_id_key" ON "TagPriority"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "TagPriority_priority_auth_id_key" ON "TagPriority"("priority", "auth_id");

-- AddForeignKey
ALTER TABLE "TagPriority" ADD CONSTRAINT "TagPriority_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
