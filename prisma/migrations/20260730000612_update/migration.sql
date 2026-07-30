-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'ANGIOLOGIA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'DERMATOLOGIA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'ENDOCRINOLOGIA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'FONOAUDIOLOGO';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'GASTROENTEROLOGIA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'INFECTOLOGISTA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'HEMATOLOGISTA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'MASTOLOGISTA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'NEFROLOGISTA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'PROTESE';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'ENDODONTIA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'ODONTOPEDIATRA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'EXODONTIA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'OTORRINO';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'OFTALMO';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'PNEUMOLOGIA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'PSICOLOGA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'UROLOGISTA';
ALTER TYPE "public"."EspecialidadeMedica" ADD VALUE 'REUMATOLOGIA';
