/*
  Warnings:

  - You are about to drop the `collectpoints_wastes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `collectpoints_wastes` DROP FOREIGN KEY `CollectPoints_Wastes_collectPoint_id_fkey`;

-- DropForeignKey
ALTER TABLE `collectpoints_wastes` DROP FOREIGN KEY `CollectPoints_Wastes_waste_id_fkey`;

-- DropTable
DROP TABLE `collectpoints_wastes`;

-- CreateTable
CREATE TABLE `WastesCollectPoint` (
    `id` VARCHAR(191) NOT NULL,
    `collectPoint_id` VARCHAR(191) NULL,
    `waste_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `disabled_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WastesCollectPoint` ADD CONSTRAINT `WastesCollectPoint_collectPoint_id_fkey` FOREIGN KEY (`collectPoint_id`) REFERENCES `CollectPoint`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WastesCollectPoint` ADD CONSTRAINT `WastesCollectPoint_waste_id_fkey` FOREIGN KEY (`waste_id`) REFERENCES `Wastes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
