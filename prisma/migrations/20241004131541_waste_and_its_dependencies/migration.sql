-- CreateTable
CREATE TABLE `CollectPoints_Wastes` (
    `id` VARCHAR(191) NOT NULL,
    `collectPoint_id` VARCHAR(191) NULL,
    `waste_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `disabled_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wastes` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `classification` ENUM('Alto', 'Médio', 'Baixo', 'Sem grau de Periculosidade') NOT NULL,
    `unit_of_measure` ENUM('Quilograma', 'Grama', 'Tonelada', 'Litro', 'Mililitro', 'Unidade', 'Pacote', 'Barril', 'Metro Quadrado') NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `disabled_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CollectPoints_Wastes` ADD CONSTRAINT `CollectPoints_Wastes_collectPoint_id_fkey` FOREIGN KEY (`collectPoint_id`) REFERENCES `CollectPoint`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollectPoints_Wastes` ADD CONSTRAINT `CollectPoints_Wastes_waste_id_fkey` FOREIGN KEY (`waste_id`) REFERENCES `Wastes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
