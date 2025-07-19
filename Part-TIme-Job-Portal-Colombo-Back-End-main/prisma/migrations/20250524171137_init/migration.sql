/*
  Warnings:

  - You are about to drop the column `candidateId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `CandidateResume` DROP FOREIGN KEY `CandidateResume_jobTitleId_fkey`;

-- DropIndex
DROP INDEX `CandidateResume_jobTitleId_fkey` ON `CandidateResume`;

-- AlterTable
ALTER TABLE `CandidateResume` MODIFY `description` TEXT NULL,
    MODIFY `minRate` DOUBLE NULL,
    MODIFY `experience` DOUBLE NULL,
    MODIFY `skills` JSON NULL,
    MODIFY `jobTitleId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `candidateId`;

-- AddForeignKey
ALTER TABLE `CandidateResume` ADD CONSTRAINT `CandidateResume_jobTitleId_fkey` FOREIGN KEY (`jobTitleId`) REFERENCES `JobTitles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
