-- CreateEnum
CREATE TYPE "ThreatLevel" AS ENUM ('LOW', 'MODERATE', 'HIGH', 'EXTREME');

-- CreateEnum
CREATE TYPE "CreatureStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "AffinityType" AS ENUM ('WEAKNESS', 'RESISTANCE');

-- CreateEnum
CREATE TYPE "AffinityTargetType" AS ENUM ('ELEMENT', 'DAMAGE_TYPE', 'BODY_PART');

-- CreateTable
CREATE TABLE "Creature" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT,
    "description" TEXT NOT NULL,
    "threatLevel" "ThreatLevel" NOT NULL,
    "status" "CreatureStatus" NOT NULL DEFAULT 'DRAFT',
    "behavior" TEXT,
    "lifeCycle" TEXT,
    "attackStyle" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habitat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "Habitat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatureHabitat" (
    "creatureId" TEXT NOT NULL,
    "habitatId" TEXT NOT NULL,

    CONSTRAINT "CreatureHabitat_pkey" PRIMARY KEY ("creatureId","habitatId")
);

-- CreateTable
CREATE TABLE "Diet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatureDiet" (
    "creatureId" TEXT NOT NULL,
    "dietId" TEXT NOT NULL,

    CONSTRAINT "CreatureDiet_pkey" PRIMARY KEY ("creatureId","dietId")
);

-- CreateTable
CREATE TABLE "CreatureImage" (
    "id" TEXT NOT NULL,
    "creatureId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "caption" TEXT,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CreatureImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatureAffinity" (
    "id" TEXT NOT NULL,
    "creatureId" TEXT NOT NULL,
    "type" "AffinityType" NOT NULL,
    "targetType" "AffinityTargetType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CreatureAffinity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DamageType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "DamageType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Element" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyPart" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "BodyPart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Creature_slug_key" ON "Creature"("slug");

-- CreateIndex
CREATE INDEX "Creature_authorId_idx" ON "Creature"("authorId");

-- CreateIndex
CREATE INDEX "Creature_status_idx" ON "Creature"("status");

-- CreateIndex
CREATE INDEX "Creature_name_idx" ON "Creature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Habitat_name_key" ON "Habitat"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Diet_name_key" ON "Diet"("name");

-- CreateIndex
CREATE INDEX "CreatureImage_creatureId_idx" ON "CreatureImage"("creatureId");

-- CreateIndex
CREATE INDEX "CreatureAffinity_creatureId_idx" ON "CreatureAffinity"("creatureId");

-- CreateIndex
CREATE INDEX "CreatureAffinity_targetType_targetId_idx" ON "CreatureAffinity"("targetType", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "DamageType_name_key" ON "DamageType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Element_name_key" ON "Element"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BodyPart_name_key" ON "BodyPart"("name");

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatureHabitat" ADD CONSTRAINT "CreatureHabitat_creatureId_fkey" FOREIGN KEY ("creatureId") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatureHabitat" ADD CONSTRAINT "CreatureHabitat_habitatId_fkey" FOREIGN KEY ("habitatId") REFERENCES "Habitat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatureDiet" ADD CONSTRAINT "CreatureDiet_creatureId_fkey" FOREIGN KEY ("creatureId") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatureDiet" ADD CONSTRAINT "CreatureDiet_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatureImage" ADD CONSTRAINT "CreatureImage_creatureId_fkey" FOREIGN KEY ("creatureId") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatureAffinity" ADD CONSTRAINT "CreatureAffinity_creatureId_fkey" FOREIGN KEY ("creatureId") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
