# Boas vindas ao repositório do Trybe Futebol Clube!

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  Foi desenvolvido uma API (utilizando o método `TDD`) e também integrando *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, contém **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. E sua API deve ser capaz de ser consumida por um front-end já provido e que foi disponíbilizado pela escola Trybe nesse projeto.

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

  O back-end tem implementadas regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Um container docker MySQL configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Roda na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - A aplicação é inicializada a partir do arquivo `app/backend/src/server.ts`;
 - O `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Todas as dependências extras (tal como `joi`, `cors`, `@types/cors`...) foram listadas em `app/backend/packages.npm`.

3️⃣ **Front-end:**
  - O front foi didponibilizado pela escola Trybe para que fosse feita a integração com o back-end.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db);
  - As `Dockerfiles` foram configuradas corretamente nas raízes do `front-end` e `back-end`, para conseguir inicializar a aplicação;

</details>

# Orientações

## Antes de começar
Leia essa parte atentamente, pois aqui você encontrará informações importantes para executar corretamente o projeto.

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Use esse [link de referência para realizar a instalação corretamente no ubuntu](https://app.betrybe.com/course/back-end/docker/orquestrando-containers-com-docker-compose/6e8afaef-566a-47f2-9246-d3700db7a56a/conteudo/0006a231-1a10-48a2-ac82-9e03e205a231/instalacao/abe40727-6310-4ad8-bde6-fd1e919dadc0?use_case=side_bar);
  * Acesse o [link da documentação oficial com passos para desinstalar] (https://docs.docker.com/compose/install/#uninstallation) caso necessário.

</details>

<details id='Variaveis-de-ambiente'>
<summary><strong> ⚙️ Variáveis de ambiente </strong></summary><br />

  **No diretório `app/backend/` crie o arquivo `.env e configure os valores de acordo com o cenário do seu ambiente (credenciais de banco de dados, secrets desejadas e etc)**. Isso vai permitir que você inicialize a aplicação fora do _container_ e ela se conecte com seu banco local caso deseje.
 > `./app/backend/.env`
  ```txt
  JWT_SECRET=jwt_secret
  APP_PORT=3001
  DB_USER=seu_user (altere aqui)
  DB_PASS=sua_senha (altere aqui)
  DB_HOST=localhost
  DB_PORT=3306
  ```

  **⚠️ Não defina variável de ambiente para o nome do banco, o mesmo deve se manter com o nome `TRYBE_FUTEBOL_CLUBE`. ⚠️**

</details>

<details>
<summary><strong> 🔰 Iniciando o projeto</strong></summary><br />

  1. Clone o repositório `git@github.com:oelithon/projeto-trybe-futebol-clube.git`

- Entre na pasta do repositório que você acabou de clonar:
  * `cd projeto-trybe-futebol-clube`

  2. Instale as dependências
  *`npm install`

  3. Execute o projeto com o comando
  *`npm run compose:up`

</details>

<details id='testes-de-cobertura'>
  <summary><strong> Testes de cobertura </strong></summary><br/>

  A construção de testes de cobertura no back-end foi feita em *TypeScript*, utilizando `mocha`, `chai` e `sinon`, na pasta `app/backend/src/tests/`:

  Para rodar testes de cobertura do back-end, utilize os comandos: `npm run test` ou `npm run test:coverage`.

</details>

# Sobre as Rotas
