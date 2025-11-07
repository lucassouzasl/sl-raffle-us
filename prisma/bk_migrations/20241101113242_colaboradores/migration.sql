-- CreateTable
CREATE TABLE "Colaborador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empresa" TEXT NOT NULL,
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "flag" INTEGER NOT NULL DEFAULT 0,
    "supervisor" INTEGER NOT NULL DEFAULT 0,
    "nome" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "premio" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false
);
