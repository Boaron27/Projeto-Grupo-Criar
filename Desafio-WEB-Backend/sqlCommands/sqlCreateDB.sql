-- ============================
-- TABELA: ESTADOS
-- ============================
CREATE TABLE estados (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sigla CHAR(2) NOT NULL UNIQUE
);

-- ============================
-- TABELA: CIDADES
-- ============================
CREATE TABLE cidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    estado_id INT NOT NULL,

    FOREIGN KEY (estado_id) REFERENCES estados(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ============================
-- TABELA: GRUPOS DE CIDADES (CLUSTERS)
-- ============================
CREATE TABLE grupos_cidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL UNIQUE
);

-- ============================
-- TABELA ASSOCIATIVA: GRUPO x CIDADE
-- ============================
CREATE TABLE grupo_cidade (
    id SERIAL PRIMARY KEY,
    grupo_id INT NOT NULL,
    cidade_id INT NOT NULL,

    FOREIGN KEY (grupo_id) REFERENCES grupos_cidades(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (cidade_id) REFERENCES cidades(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    UNIQUE (grupo_id, cidade_id)
);

-- ============================
-- TABELA: CAMPANHAS
-- ============================
CREATE TABLE campanhas (
    id SERIAL PRIMARY KEY,
    grupo_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    ativa BOOLEAN NOT NULL DEFAULT TRUE,

    FOREIGN KEY (grupo_id) REFERENCES grupos_cidades(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Regra: só pode haver 1 campanha ativa por grupo
CREATE UNIQUE INDEX ux_campanha_ativa_por_grupo
ON campanhas (grupo_id)
WHERE ativa = TRUE;

-- ============================
-- TABELA: DESCONTOS
-- ============================
CREATE TABLE descontos (
    id SERIAL PRIMARY KEY,
    campanha_id INT NOT NULL,

    valor_desconto NUMERIC(10,2),
    percentual_desconto NUMERIC(5,2),

    FOREIGN KEY (campanha_id) REFERENCES campanhas(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Regra: apenas valor OU percentual
ALTER TABLE descontos
ADD CONSTRAINT chk_valor_ou_percentual
CHECK (
    (valor_desconto IS NOT NULL AND percentual_desconto IS NULL) OR
    (valor_desconto IS NULL AND percentual_desconto IS NOT NULL)
);

-- ============================
-- TABELA: PRODUTOS
-- ============================
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    preco NUMERIC(10,2) NOT NULL
);

--- Prompt Utilizado para criação desse arquivo está disponivel em Prompt's.txt