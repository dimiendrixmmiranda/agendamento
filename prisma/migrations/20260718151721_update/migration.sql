/*
  Warnings:

  - You are about to drop the column `endereco` on the `LocalAtendimento` table. All the data in the column will be lost.
  - Added the required column `bairro` to the `LocalAtendimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `LocalAtendimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `LocalAtendimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LocalAtendimento` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."LocalAtendimento_nome_key";

-- AlterTable
ALTER TABLE "public"."LocalAtendimento" DROP COLUMN "endereco",
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "numero" TEXT NOT NULL,
ADD COLUMN     "observacao" TEXT,
ADD COLUMN     "pontoDeReferencia" TEXT,
ADD COLUMN     "rua" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
