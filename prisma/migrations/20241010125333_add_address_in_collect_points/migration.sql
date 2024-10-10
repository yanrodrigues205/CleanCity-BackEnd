/*
  Warnings:

  - Added the required column `address_number` to the `CollectPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `CollectPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `CollectPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `CollectPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `CollectPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collectpoint` ADD COLUMN `address_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `disabled_at` DATETIME(3) NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Reviews` (
    `id` VARCHAR(191) NOT NULL,
    `stars` DOUBLE NOT NULL,
    `comments` TEXT NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `collectPoint_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `disabled_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_collectPoint_id_fkey` FOREIGN KEY (`collectPoint_id`) REFERENCES `CollectPoint`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
