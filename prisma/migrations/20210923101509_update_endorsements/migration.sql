/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `skills` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `endorsements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `endorsements` ADD COLUMN `email` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `skills_name_key` ON `skills`(`name`);
