/*
  Warnings:

  - You are about to drop the column `diaSemana` on the `Disponibilidade` table. All the data in the column will be lost.
  - Added the required column `data` to the `Disponibilidade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Disponibilidade" DROP COLUMN "diaSemana",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Profissional" ALTER COLUMN "corCalendario" DROP NOT NULL;

-- DropEnum
DROP TYPE "DiaSemana";
