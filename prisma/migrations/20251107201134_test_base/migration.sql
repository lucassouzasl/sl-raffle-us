-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colaborador" (
    "id" SERIAL NOT NULL,
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "flag" INTEGER NOT NULL DEFAULT 0,
    "supervisor" INTEGER NOT NULL DEFAULT 0,
    "nome" TEXT NOT NULL DEFAULT '',
    "empresa" TEXT NOT NULL DEFAULT '',
    "funcao" TEXT NOT NULL DEFAULT '',
    "setor" TEXT NOT NULL DEFAULT '',
    "matricula" TEXT NOT NULL DEFAULT '',
    "situacao" TEXT NOT NULL DEFAULT '',
    "data" TEXT NOT NULL DEFAULT '',
    "observacao" TEXT NOT NULL DEFAULT '',
    "premio" TEXT NOT NULL DEFAULT '',
    "telefone" TEXT NOT NULL DEFAULT '',
    "confirmedIn" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Colaborador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL DEFAULT '',
    "empresa" TEXT NOT NULL DEFAULT '',
    "observacao" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Premio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL DEFAULT '',
    "empresa" TEXT NOT NULL DEFAULT '',
    "observacao" TEXT NOT NULL DEFAULT '',
    "imagem" TEXT NOT NULL DEFAULT '',
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Premio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColaboradorPremio" (
    "id" SERIAL NOT NULL,
    "colaboradorId" INTEGER NOT NULL,
    "premioId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL DEFAULT '',
    "observacao" TEXT NOT NULL DEFAULT '',
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ColaboradorPremio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Colaborador_telefone_key" ON "Colaborador"("telefone");

-- AddForeignKey
ALTER TABLE "ColaboradorPremio" ADD CONSTRAINT "ColaboradorPremio_premioId_fkey" FOREIGN KEY ("premioId") REFERENCES "Premio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColaboradorPremio" ADD CONSTRAINT "ColaboradorPremio_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "Colaborador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
