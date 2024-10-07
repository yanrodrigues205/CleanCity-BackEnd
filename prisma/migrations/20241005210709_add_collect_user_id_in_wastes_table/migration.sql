-- AlterTable
ALTER TABLE `wastes` ADD COLUMN `collectUser_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Wastes` ADD CONSTRAINT `Wastes_collectUser_id_fkey` FOREIGN KEY (`collectUser_id`) REFERENCES `CollectUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
