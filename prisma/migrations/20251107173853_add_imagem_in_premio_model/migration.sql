-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Premio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL DEFAULT '',
    "empresa" TEXT NOT NULL DEFAULT '',
    "observacao" TEXT NOT NULL DEFAULT '',
    "imagem" TEXT NOT NULL DEFAULT '',
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Premio" ("createdAt", "empresa", "id", "nome", "observacao", "published", "tipo", "updatedAt") SELECT "createdAt", "empresa", "id", "nome", "observacao", "published", "tipo", "updatedAt" FROM "Premio";
DROP TABLE "Premio";
ALTER TABLE "new_Premio" RENAME TO "Premio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
