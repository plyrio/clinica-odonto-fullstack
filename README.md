# 🏥 Clínica Odonto Fullstack

Bem-vindo ao repositório **Clínica Odonto Fullstack**! Este é um **monorepo fullstack** para o gerenciamento de uma clínica odontológica, englobando **backend, frontend** e **pacotes compartilhados**. O projeto foi arquitetado para ser altamente modular e escalável, utilizando ferramentas modernas como **Turborepo** para otimizar o fluxo de desenvolvimento.

---

## 📌 Visão Geral

A aplicação foi projetada com foco em **eficiência**, **colaboração** e **manutenção a longo prazo**, integrando as melhores práticas do desenvolvimento fullstack. Este monorepo contém:

- **Frontend (Next.js)** → Aplicação web responsiva e dinâmica com **React** e **Tailwind CSS**.
- **Backend (NestJS)** → API robusta e segura com **Prisma ORM** para gerenciamento do banco de dados **PostgreSQL**.
- **Biblioteca Compartilhada** → Pacote de **utilitários** e **schemas de validação** com **Zod**, promovendo reutilização e consistência entre o frontend e o backend.

---

## 📷 Demonstração

### Front-end
#### Desktop
![Desktop](https://res.cloudinary.com/dn5yfai0g/image/upload/v1742908669/Cl%C3%ADnica_Odonto_3_sckpzi.png)

#### Mobile
![Mobile](https://res.cloudinary.com/dn5yfai0g/image/upload/v1742908398/Cl%C3%ADnica_Odonto_2_vl5p3h.png)

### Back-end
![Documentação com Swagger](https://res.cloudinary.com/dn5yfai0g/image/upload/v1742916008/Swagger_UI_lsfcih.png)


---

## 🚀 Tecnologias Utilizadas

### 🔹 Frontend  
- **Next.js** → Framework React para renderização híbrida (SSR/SSG).  
- **React** → Biblioteca para interfaces interativas.  
- **Tailwind CSS** → Estilização ágil e responsiva. 
- **Tabler Icon** → Icones react

### 🔹 Backend  
- **NestJS** → Framework modular para construção de APIs escaláveis.  
- **Prisma ORM** → Gerenciamento do banco de dados **PostgreSQL**.  
- **Swagger** → Documentação interativa da API.  
- **Zod** → Validação de dados e schemas.  

### 🔹 Monorepo  
- **Turborepo** → Gerenciamento eficiente de múltiplos pacotes.  
- **ESLint** → Padronização de código.  
- **Prettier** → Formatação de código.  

---

## 📂 Estrutura do Repositório  

```plaintext
.
├── apps
│   ├── backend/        # API em NestJS com integração ao banco de dados
│   ├── frontend/       # Aplicação Next.js para a interface do usuário
├── packages
│   ├── core/           # Biblioteca compartilhada de schemas, utilitários e validação
├── turbo.json          # Configuração do Turborepo
├── package.json        # Configurações gerais do monorepo
└── README.md           # Documentação do projeto
```

---

## 🛠️ Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

**Node.js** → Recomendado >= 18

**npm** → Recomendado >= 10.8.2

**Docker** → Opcional para rodar o backend em contêineres

**PostgreSQL** → Banco de dados da aplicação



---

## ⚙️ Configuração Inicial
### 🔹1. Clone o repositório
```bash
git clone https://github.com/plyrio/clinica-odonto-fullstack.git

cd clinica-odonto-fullstack
```

### 🔹 2. Instale as dependências do monorepo
```bash
npm install
```
### 🔹3. Configure o banco de dados

Crie um arquivo .env dentro da pasta apps/backend e adicione:
```bash
DATABASE_URL=postgresql://<usuario>:<senha>@<host>:<porta>/<database>
```
Agora, aplique as migrações no banco de dados:
```bash
npx prisma migrate dev
```

---

## 🚀 Iniciando o Projeto

### 🔹 Usando o Turborepo

O **Turborepo** permite executar tarefas simultaneamente:

- **Iniciar o desenvolvimento (Frontend + Backend)**
```bash
turbo dev
```
- **Build do monorepo**
```bash
turbo build
```
- **Lint em todos os pacotes**
```bash
turbo lint
```
- **Testes (caso implementados)**

```bash
turbo test
```
### 🔹 Executando individualmente

- **Frontend (Next.js)**

```bash
cd apps/frontend

npm run dev
```
- **Backend (NestJS)**

```bash
cd apps/backend
npm run dev
````

---

## 📄 Documentação da API

O backend possui uma documentação interativa acessível no navegador, com todos endpoints da API e os dtos:

**URL**: [http://localhost:3000/api
](http://localhost:3000/api)


---

## 🤝 Contribuição

### 1. Crie um **branch** para sua funcionalidade:
```bash
git checkout -b feature/nova-funcionalidade
```
### 2. Siga os padrões de código definidos pelo **ESLint** e **Prettier**:
```bash
npm run lint
npm run format
```
### 3. Teste suas alterações localmente antes de enviar.


### 4. Envie um **pull request** com uma descrição clara das alterações.




---

## ❓ FAQ

### 🔹 Como o Turborepo otimiza o desenvolvimento?

O Turborepo usa **cache inteligente**, evitando a reexecução de tarefas em partes do código que não foram alteradas. Isso economiza tempo em builds e execuções de scripts.

 ### 🔹 Posso usar outro banco de dados além do PostgreSQL?

Sim! O **Prisma** suporta múltiplos bancos de dados. Para mudar, ajuste o arquivo schema.prisma e a variável DATABASE_URL.

### 🔹 Quais os principais benefícios do monorepo?

- Gerenciamento centralizado de dependências

- Compartilhamento de código entre pacotes

- Execução eficiente de builds e testes



---

## 👨‍💻 Autor

**Pedro Lyrio (Plyrio Dev)**
**📧 Email: pedrolyrio@ucl.br**
**🔗 GitHub: [github.com/plyrio](github.com/plyrio)**
**🔗 LinkedIn: [linkedin.com/in/plyrio](linkedin.com/in/plyrio)**

**Licença**: ISC