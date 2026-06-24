/*
  Warnings:

  - You are about to drop the column `role_over` on the `TagSetting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TagSetting" DROP COLUMN "role_over";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "role_over" BOOLEAN NOT NULL DEFAULT false;
