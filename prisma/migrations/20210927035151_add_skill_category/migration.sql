/*
  Warnings:

  - You are about to drop the column `skillId` on the `endorsements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `endorsements` DROP COLUMN `skillId`,
    ADD COLUMN `skill_id` BIGINT;

-- AlterTable
ALTER TABLE `skills` ADD COLUMN `skill_category_id` BIGINT;

-- CreateTable
CREATE TABLE `skill_categories` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
