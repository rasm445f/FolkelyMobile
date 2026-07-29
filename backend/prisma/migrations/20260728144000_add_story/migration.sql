-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "body" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priority" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);
