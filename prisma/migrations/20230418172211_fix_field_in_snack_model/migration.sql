/*
  Warnings:

  - You are about to drop the column `on_diete` on the `snacks` table. All the data in the column will be lost.
  - Added the required column `on_diet` to the `snacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "snacks" DROP COLUMN "on_diete",
ADD COLUMN     "on_diet" BOOLEAN NOT NULL;
