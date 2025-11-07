-- This is an empty migration.

BEGIN;

INSERT INTO "Premio" ("nome", "observacao", "tipo") VALUES
('Cem reais', '', 2),
('Quinhentos reais', '', 1),
('Mil reais', '', 1),
('Bicicleta', '', 1),
('JBL', '', 1),
('Viagem', '', 1),
('Televisão', '', 1);

COMMIT;    
