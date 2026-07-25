/*
  Warnings:

  - You are about to drop the column `especialidade` on the `Agendamento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Agendamento" DROP COLUMN "especialidade",
ADD COLUMN     "especialidades" TEXT[];
