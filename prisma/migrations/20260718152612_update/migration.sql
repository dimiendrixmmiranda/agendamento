/*
  Warnings:

  - Added the required column `slug` to the `LocalAtendimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."LocalAtendimento" ADD COLUMN     "slug" TEXT NOT NULL;
