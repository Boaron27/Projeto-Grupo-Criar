# Desafio Criar

## Descrição

Este é um projeto de desafio técnico que consiste em um **sistema de aplicação web**, com um backend desenvolvido em **PhP/Laravel** e um frontend em **React**. O projeto tem como objetivo demonstrar a implementação de funcionalidades práticas em ambas as tecnologias.

## Estrutura do Projeto

### Backend (PhP/Laravel)

O backend é construído utilizando o **PhP/Laravel** e tem como principais funcionalidades:

- Gestão de dados por meio de um banco de dados relacional.
- Exposição de rotas RESTful para integração com o frontend.
- Arquivos importantes:
  - **`app/`**: Contém os controladores, modelos e lógica do backend.
  - **`routes/`**: Definição das rotas da aplicação.
  - **`database/`**: Arquivos de migração e seeds para configuração do banco de dados.

### Frontend (React)

O frontend é desenvolvido utilizando **React** com **Vite** como bundler, proporcionando uma experiência de desenvolvimento rápida e eficiente.

## Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter o **Docker** instalado para rodar ambos os ambientes, backend e frontend, de maneira isolada e simplificada.

### Docker

Como explicado acima, o docker será necessario para o funcionamento do projeto

1 - Acesse a pasta

`\Desafio Criar`

2 - Execute o projeto

`docker-compose up -d --build`

Pronto! Agora o projeto será iniciado com as seguintes url:

  ### Backend
  
  O backend estará disponível em `http://localhost:8000`.
  
  ### Frontend
  
  O frontend estará disponível em `http://localhost:5174/`.
