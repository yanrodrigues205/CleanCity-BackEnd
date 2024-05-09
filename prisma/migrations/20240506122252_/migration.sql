-- CreateTable
CREATE TABLE `WorkHours` (
    `id` VARCHAR(191) NOT NULL,
    `BMD_first` VARCHAR(191) NOT NULL,
    `BMD_second` VARCHAR(191) NOT NULL,
    `AMD_first` VARCHAR(191) NOT NULL,
    `AMD_second` VARCHAR(191) NOT NULL,
    `comments` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
