/*
  Warnings:

  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,parentId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."categories_name_key";

-- DropIndex
DROP INDEX "public"."categories_slug_key";

-- AlterTable
ALTER TABLE "public"."categories" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "slug",
DROP COLUMN "updatedAt";

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_parentId_key" ON "public"."categories"("name", "parentId");
