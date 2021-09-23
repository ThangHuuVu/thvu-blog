-- CreateTable
CREATE TABLE `skills` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endorsements` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `endorsed_by` VARCHAR(255) NOT NULL,
    `skillId` BIGINT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
