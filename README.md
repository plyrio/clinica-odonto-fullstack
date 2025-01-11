# Clínica Odonto Fullstack
Bem-vindo ao repositório Clínica Odonto Fullstack. Este é um monorepo completo para o gerenciamento de uma aplicação de clínica odontológica, englobando backend, frontend e pacotes compartilhados. O projeto foi arquitetado para ser altamente modular e escalável, utilizando ferramentas modernas como Turborepo para otimizar o fluxo de desenvolvimento.

## Visão Geral
A aplicação foi projetada com foco em eficiência, colaboração e manutenção a longo prazo, integrando as melhores práticas do desenvolvimento fullstack. Este monorepo contém:

**Frontend (Next.js):** Aplicação web responsiva e dinâmica com design moderno, implementada com React e Tailwind CSS.
**Backend (NestJS):** API robusta e segura com Prisma ORM para gerenciamento de banco de dados PostgreSQL.
**Biblioteca Compartilhada:** Um pacote de utilitários e schemas de validação com Zod, que promove o reuso e mantém consistência entre o frontend e o backend.
Recursos Principais
Turborepo para gerenciamento de tarefas eficiente em um ambiente monorepo.
Docker para padronização e facilidade no deploy do backend.
Prisma como ORM, garantindo consultas otimizadas e facilidade na modelagem de dados.
Zod para validação tipada e compartilhada entre o frontend e o backend.
Tailwind CSS para estilização ágil e responsiva.
Swagger para documentação automática da API.
Estrutura do Repositório
plaintext
Copiar código
.
├── apps
│   ├── backend/        # API em NestJS com integração ao banco de dados
│   ├── frontend/       # Aplicação Next.js para a interface do usuário
├── packages
│   ├── core/           # Biblioteca compartilhada de schemas, utilitários e validação
├── turbo.json          # Configuração do Turborepo
├── package.json        # Configurações gerais do monorepo
└── README.md           # Documentação do projeto
Tecnologias Utilizadas
Frontend
Next.js: Framework React para renderização híbrida (SSR/SSG).
React: Biblioteca para construção de interfaces interativas.
Tailwind CSS: Framework CSS para design responsivo.
Axios: Cliente HTTP para comunicação com a API.
Backend
NestJS: Framework Node.js para APIs modulares e escaláveis.
Prisma ORM: Gerenciamento do banco de dados PostgreSQL.
Swagger: Ferramenta para documentação interativa da API.
Zod: Validação de dados e schemas.
Monorepo
Turborepo: Gerenciamento e otimização de tarefas no monorepo.
ESLint: Padronização de código.
Prettier: Formatação de código.
Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

Node.js: Recomendado >= 18.
npm: Recomendado >= 10.8.2.
Docker: Opcional para executar o backend em contêineres.
PostgreSQL: Banco de dados para armazenar informações da aplicação.
Configuração Inicial
Clone o repositório:

bash
Copiar código
git clone https://github.com/plyrio/clinica-odonto-fullstack.git
cd clinica-odonto-fullstack
Instale as dependências do monorepo:

bash
Copiar código
npm install
Configuração do banco de dados:

Configure o arquivo .env em apps/backend:
plaintext
Copiar código
DATABASE_URL=postgresql://<usuario>:<senha>@<host>:<porta>/<database>
Aplique as migrações no banco de dados:
bash
Copiar código
npx prisma migrate dev
Iniciando o Projeto
Usando o Turborepo
A maior vantagem de utilizar o Turborepo é a automação e o paralelismo das tarefas:

Iniciar o desenvolvimento:
Inicia simultaneamente o frontend e o backend:

bash
Copiar código
turbo dev
Build do monorepo:
Cria a versão de produção de todos os pacotes:

bash
Copiar código
turbo build
Lint em todos os pacotes:
Verifica o padrão de código em todos os projetos:

bash
Copiar código
turbo lint
Testes (caso implementados):

bash
Copiar código
turbo test
Executando Individualmente
Para rodar apenas uma parte do projeto, use os comandos abaixo:

Frontend (Next.js):

bash
Copiar código
cd apps/frontend
npm run dev
Backend (NestJS):

bash
Copiar código
cd apps/backend
npm run dev
Fluxo de Trabalho com Docker
Se preferir usar Docker para rodar o backend, siga os passos:

Certifique-se de que o Docker está instalado e em execução.
No diretório apps/backend, execute:
bash
Copiar código
docker build -t backend .
docker run -p 3000:3000 backend
Documentação da API
O backend possui uma documentação interativa da API acessível no navegador:

Acesse http://localhost:3000/api/docs quando o backend estiver em execução.
Dicas para Contribuição
Crie um branch para sua funcionalidade:

bash
Copiar código
git checkout -b feature/nova-funcionalidade
Siga os padrões de código definidos pelo ESLint e Prettier:

bash
Copiar código
npm run lint
npm run format
Teste suas alterações localmente antes de enviar.

Envie um pull request com uma descrição clara das alterações.

FAQ
1. Como o Turborepo otimiza o desenvolvimento?
O Turborepo utiliza cache para evitar a reexecução de tarefas em partes do código que não foram alteradas. Isso economiza tempo em builds e execução de scripts.

2. Posso usar outro banco de dados além do PostgreSQL?
O Prisma suporta múltiplos bancos de dados, mas a configuração padrão utiliza PostgreSQL. Para mudar, ajuste o arquivo schema.prisma e a variável DATABASE_URL.

3. Quais são os principais benefícios do monorepo?
Gerenciamento centralizado de dependências.
Compartilhamento de código entre pacotes.
Builds e lint otimizados com o Turborepo.
Autor
Este projeto foi desenvolvido por Pedro Lyrio (Plyrio Dev).
Para dúvidas ou sugestões, entre em contato pelo email: pedrolyrio@ucl.br.

Licença: ISC
