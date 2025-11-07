-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Colaborador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Colaborador" ("createdAt", "data", "empresa", "flag", "funcao", "id", "matricula", "nome", "observacao", "premio", "published", "setor", "situacao", "supervisor", "tipo", "updatedAt") SELECT "createdAt", coalesce("data", '') AS "data", "empresa", "flag", coalesce("funcao", '') AS "funcao", "id", coalesce("matricula", '') AS "matricula", coalesce("nome", '') AS "nome", coalesce("observacao", '') AS "observacao", coalesce("premio", '') AS "premio", "published", coalesce("setor", '') AS "setor", coalesce("situacao", '') AS "situacao", "supervisor", "tipo", "updatedAt" FROM "Colaborador";
DROP TABLE "Colaborador";
ALTER TABLE "new_Colaborador" RENAME TO "Colaborador";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
