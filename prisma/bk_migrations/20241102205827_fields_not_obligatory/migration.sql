-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Colaborador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empresa" TEXT,
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "flag" INTEGER NOT NULL DEFAULT 0,
    "supervisor" INTEGER NOT NULL DEFAULT 0,
    "nome" TEXT,
    "funcao" TEXT,
    "setor" TEXT,
    "matricula" TEXT,
    "situacao" TEXT,
    "data" TEXT,
    "observacao" TEXT,
    "premio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Colaborador" ("createdAt", "data", "empresa", "flag", "funcao", "id", "matricula", "nome", "observacao", "premio", "published", "setor", "situacao", "supervisor", "tipo", "updatedAt") SELECT "createdAt", "data", "empresa", "flag", "funcao", "id", "matricula", "nome", "observacao", "premio", "published", "setor", "situacao", "supervisor", "tipo", "updatedAt" FROM "Colaborador";
DROP TABLE "Colaborador";
ALTER TABLE "new_Colaborador" RENAME TO "Colaborador";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
