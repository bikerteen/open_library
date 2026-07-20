-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pricing" TEXT NOT NULL DEFAULT 'Free & Open Source',
    "icon" TEXT NOT NULL DEFAULT '✨',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ToolTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ToolTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ToolTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tool" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ToolTags_AB_unique" ON "_ToolTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ToolTags_B_index" ON "_ToolTags"("B");
