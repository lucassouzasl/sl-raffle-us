BEGIN;
DELETE FROM "Premio";
INSERT INTO "Premio" ("nome", "observacao", "tipo", "empresa") VALUES
('Cem reais', '', 1, 'SLM'),
('Quinhentos reais', '', 1, 'SLM'),
('Mil reais', '', 0, 'ND'),
('Bicicleta', '', 0, 'SLM'),
('JBL', '', 0, 'SP'),
('Viagem', '', 0, 'SLL'),
('Televisão', '', 0, 'JD');
COMMIT;    
