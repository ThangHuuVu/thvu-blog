-- CreateTable
CREATE TABLE `guestbook` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `body` VARCHAR(1024) NOT NULL,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `views` (
    `slug` VARCHAR(128) NOT NULL,
    `count` BIGINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
