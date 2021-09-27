-- AlterTable
ALTER TABLE `skills` ADD COLUMN `skill_category_id` BIGINT;

-- CreateTable
CREATE TABLE `SkillCategory` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
