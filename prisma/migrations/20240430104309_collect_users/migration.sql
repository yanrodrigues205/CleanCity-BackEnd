/*
  Warnings:

  - A unique constraint covering the columns `[cfpCnpj]` on the table `CollectUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cfpCnpj` to the `CollectUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `CollectUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `CollectUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collectuser` ADD COLUMN `cfpCnpj` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CollectUser_cfpCnpj_key` ON `CollectUser`(`cfpCnpj`);
