/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `LocalAtendimento` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LocalAtendimento_nome_key" ON "public"."LocalAtendimento"("nome");
