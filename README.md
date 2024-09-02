Aqui está um modelo detalhado para o seu `README.md`:

---

# API de Pessoas

Esta é uma API para gerenciamento de informações de pessoas. Ela permite a criação, leitura, atualização e exclusão de registros, bem como a busca por termos específicos. A API foi desenvolvida utilizando Node.js com SQLite.

## Índice

- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Endpoints](#endpoints)
- [Requisitos](#requisitos)
- [Instalação e Inicialização](#instalação-e-inicialização)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Testes](#testes)
- [Observações](#observações)

## Descrição

Esta API fornece endpoints para gerenciar pessoas com os seguintes atributos:

- `apelido` (string, obrigatório, único)
- `nome` (string, obrigatório)
- `nascimento` (string, obrigatório, formato AAAA-MM-DD)
- `stack` (array de strings, opcional)

## Funcionalidades

1. **Criar uma nova pessoa** - `POST /pessoas`
2. **Consultar informações de uma pessoa** - `GET /pessoas/:id`
3. **Buscar pessoas por termo** - `GET /pessoas?t=:termo`
4. **Atualizar informações de uma pessoa** - `PUT /pessoas/:id`
5. **Excluir uma pessoa** - `DELETE /pessoas/:id`

## Endpoints

### 1. Criar uma nova pessoa

- **Método**: `POST /pessoas`
- **Corpo da Requisição**:
  ```json
  {
    "apelido": "string",
    "nome": "string",
    "nascimento": "YYYY-MM-DD",
    "stack": ["string1", "string2", ...]
  }
  ```
- **Respostas**:
  - `201 Created`: Requisição bem-sucedida.
  - `422 Unprocessable Entity`: Dados inválidos.
  - `400 Bad Request`: Erro de requisição.

### 2. Consultar informações de uma pessoa

- **Método**: `GET /pessoas/:id`
- **Parâmetros**: `id` (int) - Identificador da pessoa.
- **Respostas**:
  - `200 OK`: Detalhes da pessoa.
  - `404 Not Found`: Pessoa não encontrada.

### 3. Buscar pessoas por termo

- **Método**: `GET /pessoas?t=:termo`
- **Parâmetros**: `termo` (string) - Termo para busca.
- **Respostas**:
  - `200 OK`: Lista de pessoas que correspondem ao termo.
  - `400 Bad Request`: Termo não informado.

### 4. Atualizar informações de uma pessoa

- **Método**: `PUT /pessoas/:id`
- **Parâmetros**: `id` (int) - Identificador da pessoa.
- **Corpo da Requisição**:
  ```json
  {
    "apelido": "string",
    "nome": "string",
    "nascimento": "YYYY-MM-DD",
    "stack": ["string1", "string2", ...]
  }
  ```
- **Respostas**:
  - `200 OK`: Pessoa atualizada com sucesso.
  - `422 Unprocessable Entity`: Dados inválidos.

### 5. Excluir uma pessoa

- **Método**: `DELETE /pessoas/:id`
- **Parâmetros**: `id` (int) - Identificador da pessoa.
- **Respostas**:
  - `204 No Content`: Exclusão bem-sucedida.
  - `400 Bad Request`: Erro na exclusão.

## Requisitos

- Node.js (versão 18 ou superior)
- npm (versão 8 ou superior)
- SQLite (a base de dados é criada automaticamente)

## Instalação e Inicialização

1. **Clone o repositório**:

   ```bash
   git clone git@github.com:LeandroMedvedev/desafio-medfutura.git
   cd desafio-medfutura
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Crie o arquivo `.env`**:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```env
   DB_PATH=./config/database.sqlite
   PORT=
   ```

4. **Inicie o servidor**:
   Use o comando abaixo para iniciar a aplicação. O servidor estará disponível em `http://localhost:3000`:

   ```bash
   npm start
   ```

## Estrutura do Projeto

- **`src/`**: Código fonte da aplicação
  - **`services/`**: Serviços de manipulação de dados e lógica de negócios
  - **`controllers/`**: Manipuladores das rotas
  - **`routes/`**: Definições das rotas da API
- **`config/`**: Configurações e arquivos de banco de dados
  - **`database.sqlite`**: Arquivo do banco de dados SQLite
- **`tests/`**: Testes
  - **`integration/`**: Testes de integração
  - **`unit/`**: Testes unitários
- **`initDb.js`**: Script para inicializar o banco de dados
- **`.env`**: Arquivo de configuração de ambiente
- **`nodemon.json`**: Arquivo de configuração do Nodemon
- **`schema.sql`**: Script SQL para criar as tabelas do banco de dados
- **`package.json`**: Dependências e scripts do projeto
- **`README.md`**: Documentação do projeto

## Testes

Os testes são escritos usando o Jest e estão localizados na pasta `tests/`. Para executar os testes, use o comando:

```bash
npm test
```

## Observações

- A API foi desenvolvida utilizando Node.js e SQLite.
- Caso algum endpoint não esteja funcionando como esperado ou algum recurso não tenha sido implementado, consulte o código fonte e a documentação para mais detalhes.
- Se houver problemas ou dúvidas, por favor, entre em contato para assistência.

## Arquivos Importantes

- **`schema.sql`**: Script SQL para a criação das tabelas no banco de dados.
- **`.env`**: Contém informações sobre o ambiente de execução da aplicação.
- **`package.json`**: Lista as bibliotecas e suas versões usadas no desenvolvimento.
