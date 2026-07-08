/*
  Warnings:

  - Changed the type of `color` on the `Tag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TagColor" AS ENUM ('BLUE', 'PURPLE', 'GREEN', 'ORANGE', 'RED', 'LIGHT_BLUE', 'LIGHT_PURPLE', 'LIGHT_GREEN', 'LIGHT_ORANGE', 'LIGHT_RED');

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "color",
ADD COLUMN     "color" "TagColor" NOT NULL;
