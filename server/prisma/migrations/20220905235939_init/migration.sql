-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('FILE', 'FOLDER');

-- CreateTable
CREATE TABLE "SystemNode" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "NodeType" NOT NULL DEFAULT 'FILE',
    "parentId" INTEGER NOT NULL,
    "content" TEXT,

    CONSTRAINT "SystemNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "experience" TEXT NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SystemNode" ADD CONSTRAINT "SystemNode_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "SystemNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
