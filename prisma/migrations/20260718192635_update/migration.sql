-- CreateTable
CREATE TABLE "public"."Profissional" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Especialidade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Especialidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Exame" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Exame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProfissionalEspecialidade" (
    "profissionalId" TEXT NOT NULL,
    "especialidadeId" TEXT NOT NULL,

    CONSTRAINT "ProfissionalEspecialidade_pkey" PRIMARY KEY ("profissionalId","especialidadeId")
);

-- CreateTable
CREATE TABLE "public"."ProfissionalExame" (
    "profissionalId" TEXT NOT NULL,
    "exameId" TEXT NOT NULL,

    CONSTRAINT "ProfissionalExame_pkey" PRIMARY KEY ("profissionalId","exameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Especialidade_nome_key" ON "public"."Especialidade"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Exame_nome_key" ON "public"."Exame"("nome");

-- AddForeignKey
ALTER TABLE "public"."ProfissionalEspecialidade" ADD CONSTRAINT "ProfissionalEspecialidade_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "public"."Profissional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfissionalEspecialidade" ADD CONSTRAINT "ProfissionalEspecialidade_especialidadeId_fkey" FOREIGN KEY ("especialidadeId") REFERENCES "public"."Especialidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfissionalExame" ADD CONSTRAINT "ProfissionalExame_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "public"."Profissional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfissionalExame" ADD CONSTRAINT "ProfissionalExame_exameId_fkey" FOREIGN KEY ("exameId") REFERENCES "public"."Exame"("id") ON DELETE CASCADE ON UPDATE CASCADE;
