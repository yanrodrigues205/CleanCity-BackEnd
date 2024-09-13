/*
  Warnings:

  - Added the required column `week_days` to the `WorkHours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workhours` ADD COLUMN `collectUser_id` VARCHAR(191) NULL,
    ADD COLUMN `week_days` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `WorkHours` ADD CONSTRAINT `WorkHours_collectUser_id_fkey` FOREIGN KEY (`collectUser_id`) REFERENCES `CollectUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
