/*
  Warnings:

  - You are about to drop the `Especialidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfissionalEspecialidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfissionalExame` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `tipo` on the `Profissional` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."EspecialidadeMedica" AS ENUM ('CARDIOLOGIA', 'ORTOPEDIA', 'PSIQUIATRIA', 'GINECOLOGIA');

-- CreateEnum
CREATE TYPE "public"."TipoExame" AS ENUM ('MAPA', 'HOLTER', 'ULTRASSONOGRAFIA_ARTICULACAO', 'ULTRASSONOGRAFIA_ABDOMEM');

-- DropForeignKey
ALTER TABLE "public"."ProfissionalEspecialidade" DROP CONSTRAINT "ProfissionalEspecialidade_especialidadeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProfissionalEspecialidade" DROP CONSTRAINT "ProfissionalEspecialidade_profissionalId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProfissionalExame" DROP CONSTRAINT "ProfissionalExame_exameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProfissionalExame" DROP CONSTRAINT "ProfissionalExame_profissionalId_fkey";

-- AlterTable
ALTER TABLE "public"."Profissional" ADD COLUMN     "especialidades" "public"."EspecialidadeMedica"[],
ADD COLUMN     "exames" "public"."TipoExame"[],
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "public"."TipoProfissional" NOT NULL;

-- DropTable
DROP TABLE "public"."Especialidade";

-- DropTable
DROP TABLE "public"."Exame";

-- DropTable
DROP TABLE "public"."ProfissionalEspecialidade";

-- DropTable
DROP TABLE "public"."ProfissionalExame";
