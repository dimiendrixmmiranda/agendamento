-- AlterTable
ALTER TABLE "public"."Profissional" ADD COLUMN     "restricoes" TEXT[] DEFAULT ARRAY[]::TEXT[];
