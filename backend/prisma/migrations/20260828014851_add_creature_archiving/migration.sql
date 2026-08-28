-- DropIndex
DROP INDEX "Creature_authorId_idx";

-- DropIndex
DROP INDEX "Creature_name_idx";

-- DropIndex
DROP INDEX "Creature_status_idx";

-- AlterTable
ALTER TABLE "Creature" ADD COLUMN     "archivedAt" TIMESTAMP(3);
