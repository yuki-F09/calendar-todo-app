/*
  Warnings:

  - You are about to drop the column `userId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `TagSetting` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `auth_id` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auth_id` to the `TagSetting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auth_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "userId",
ADD COLUMN     "auth_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TagSetting" DROP COLUMN "user_id",
ADD COLUMN     "auth_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId",
ADD COLUMN     "auth_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";
