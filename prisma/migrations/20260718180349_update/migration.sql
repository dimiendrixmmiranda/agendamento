/*
  Warnings:

  - You are about to drop the `Profissional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Disponibilidade" DROP CONSTRAINT "Disponibilidade_profissionalId_fkey";

-- DropTable
DROP TABLE "public"."Profissional";

-- CreateTable
CREATE TABLE "public"."Agendamento" (
    "id" TEXT NOT NULL,
    "tipo" "public"."TipoProfissional" NOT NULL,
    "nome" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "descricao" TEXT,
    "corCalendario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Disponibilidade" ADD CONSTRAINT "Disponibilidade_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "public"."Agendamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
