/*
  Warnings:

  - You are about to drop the column `user_id` on the `sessions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `Sessions_user_id_fkey`;

-- AlterTable
ALTER TABLE `sessions` DROP COLUMN `user_id`,
    ADD COLUMN `twofactors_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `TwoFactors` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `OPT` VARCHAR(191) NOT NULL,
    `expiry` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sessions` ADD CONSTRAINT `Sessions_twofactors_id_fkey` FOREIGN KEY (`twofactors_id`) REFERENCES `TwoFactors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TwoFactors` ADD CONSTRAINT `TwoFactors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
