/*
  Warnings:

  - Added the required column `verify` to the `TwoFactors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `twofactors` ADD COLUMN `verify` BOOLEAN NOT NULL;
