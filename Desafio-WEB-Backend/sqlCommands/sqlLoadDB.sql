-- ============================================================
-- CARGA DE DADOS PARA O SISTEMA DE ESTADOS, CIDADES, GRUPOS,
-- CAMPANHAS, DESCONTOS E PRODUTOS
-- ============================================================


-- ============================
-- ESTADOS
-- ============================
INSERT INTO estados (nome, sigla) VALUES
('São Paulo', 'SP'),
('Rio de Janeiro', 'RJ'),
('Minas Gerais', 'MG');


-- ============================
-- CIDADES
-- ============================
-- Cidades de São Paulo
INSERT INTO cidades (nome, estado_id) VALUES
('São Paulo', 1),
('Campinas', 1),
('Santos', 1);

-- Cidades do Rio de Janeiro
INSERT INTO cidades (nome, estado_id) VALUES
('Rio de Janeiro', 2),
('Niterói', 2),
('Petrópolis', 2);

-- Cidades de Minas Gerais
INSERT INTO cidades (nome, estado_id) VALUES
('Belo Horizonte', 3),
('Uberlândia', 3),
('Juiz de Fora', 3);


-- ============================
-- GRUPOS DE CIDADES (CLUSTERS)
-- ============================
INSERT INTO grupos_cidades (nome) VALUES
('Cluster Litoral'),
('Cluster Capitais'),
('Cluster Interior');


-- ============================
-- RELAÇÃO GRUPO x CIDADE
-- ============================

-- Cluster Litoral
INSERT INTO grupo_cidade (grupo_id, cidade_id) VALUES
(1, 3),  -- Santos
(1, 5);  -- Niterói

-- Cluster Capitais
INSERT INTO grupo_cidade (grupo_id, cidade_id) VALUES
(2, 1),  -- São Paulo
(2, 4),  -- Rio de Janeiro
(2, 7);  -- Belo Horizonte

-- Cluster Interior
INSERT INTO grupo_cidade (grupo_id, cidade_id) VALUES
(3, 2),  -- Campinas
(3, 6),  -- Petrópolis
(3, 8),  -- Uberlândia
(3, 9);  -- Juiz de Fora


-- ============================
-- CAMPANHAS
-- ============================
-- Regra: somente 1 ativa por grupo

INSERT INTO campanhas (grupo_id, nome, ativa) VALUES
(1, 'Campanha de Verão Litoral', TRUE),
(2, 'Campanha Grandes Capitais', TRUE),
(3, 'Campanha Interior 2025', TRUE);


-- ============================
-- DESCONTOS
-- ============================
-- Apenas valor OU percentual

INSERT INTO descontos (campanha_id, valor_desconto, percentual_desconto) VALUES
(1, 10.00, NULL),  -- R$10 off para o Litoral
(2, NULL, 15.00),  -- 15% off para Capitais
(3, 5.00, NULL);   -- R$5 off no Interior


-- ============================
-- PRODUTOS
-- ============================
INSERT INTO produtos (nome, preco) VALUES
('Notebook Gamer X15', 6500.00),
('Smartphone Pro Max', 5200.00),
('Headset Surround', 350.00),
('Cadeira Ergonômica Ultra', 1200.00),
('Monitor 29 UltraWide', 1600.00);

