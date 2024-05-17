-- AlterTable
ALTER TABLE `collectpoint` ADD COLUMN `workHours_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `CollectPoint` ADD CONSTRAINT `CollectPoint_workHours_id_fkey` FOREIGN KEY (`workHours_id`) REFERENCES `WorkHours`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
