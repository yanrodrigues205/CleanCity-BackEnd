/*
  Warnings:

  - You are about to drop the `point` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `point` DROP FOREIGN KEY `Point_user_id_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `collectUser_id` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `point`;

-- CreateTable
CREATE TABLE `CollectUser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `collectPoint_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CollectPoint` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_collectUser_id_fkey` FOREIGN KEY (`collectUser_id`) REFERENCES `CollectUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollectUser` ADD CONSTRAINT `CollectUser_collectPoint_id_fkey` FOREIGN KEY (`collectPoint_id`) REFERENCES `CollectPoint`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
