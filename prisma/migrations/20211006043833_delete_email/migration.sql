/*
  Warnings:

  - You are about to drop the column `email` on the `endorsements` table. All the data in the column will be lost.
  - You are about to drop the column `endorsed_by` on the `endorsements` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `guestbook` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `guestbook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `endorsements` DROP COLUMN `email`,
    DROP COLUMN `endorsed_by`;

-- AlterTable
ALTER TABLE `guestbook` DROP COLUMN `created_by`,
    DROP COLUMN `email`;
