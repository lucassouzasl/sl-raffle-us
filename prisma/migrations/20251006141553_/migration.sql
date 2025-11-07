/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `Colaborador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Colaborador_telefone_key" ON "Colaborador"("telefone");
