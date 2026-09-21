-- CreateTable
CREATE TABLE "CreatureFavorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "creatureId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreatureFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CreatureFavorite_userId_idx" ON "CreatureFavorite"("userId");

-- CreateIndex
CREATE INDEX "CreatureFavorite_creatureId_idx" ON "CreatureFavorite"("creatureId");

-- CreateIndex
CREATE UNIQUE INDEX "CreatureFavorite_userId_creatureId_key" ON "CreatureFavorite"("userId", "creatureId");

-- AddForeignKey
ALTER TABLE "CreatureFavorite" ADD CONSTRAINT "CreatureFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatureFavorite" ADD CONSTRAINT "CreatureFavorite_creatureId_fkey" FOREIGN KEY ("creatureId") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
