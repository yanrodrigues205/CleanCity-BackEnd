/*
  Warnings:

  - You are about to drop the column `collectPoint_id` on the `collectuser` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `collectuser` DROP FOREIGN KEY `CollectUser_collectPoint_id_fkey`;

-- AlterTable
ALTER TABLE `collectpoint` ADD COLUMN `collectUser_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `collectuser` DROP COLUMN `collectPoint_id`;

-- AddForeignKey
ALTER TABLE `CollectPoint` ADD CONSTRAINT `CollectPoint_collectUser_id_fkey` FOREIGN KEY (`collectUser_id`) REFERENCES `CollectUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
