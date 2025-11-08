# TMDB

Aplicação React para consulta de filmes utilizando a API do The Movie Database (TMDB). Desenvolvida com TypeScript, Vite e Styled Components.

## Pré-requisitos

**Docker Compose (Recomendado):**

- Docker 20.x+
- Docker Compose 2.x+

**Instalação Local:**

- Node.js 20.x+ (ou 22.x+)
- npm 9.x+
- NVM (Node Version Manager) - Recomendado para gerenciar versões do Node.js

### Instalando Node.js e npm

**macOS (usando Homebrew):**

```bash
brew install node
```

**Windows:**
Baixe o instalador em [nodejs.org](https://nodejs.org/) e siga o assistente de instalação.

**Verificando a instalação:**

```bash
node --version
npm --version
```

## Instalação

### Docker Compose

```bash
git clone https://github.com/gabraug/tc_react_api.git
cd tc_react_api
cp .env.example .env
# Edite o .env com suas credenciais
docker-compose up
```

Aplicação disponível em `http://localhost:5173`

### Instalação Local

```bash
git clone https://github.com/gabraug/tc_react_api.git
cd tc_react_api

# Se estiver usando NVM, use a versão do Node especificada no .nvmrc
nvm use

npm install
cp .env.example .env
# Edite o .env com suas credenciais
npm run dev
```

## Configuração

Copie `.env.example` para `.env` e configure:

```env
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_TOKEN=seu_token_aqui
```

**Obtendo o token TMDB:**

1. Acesse [TMDB](https://www.themoviedb.org/)
2. Crie uma conta ou faça login
3. Vá em **Settings > API**
4. Solicite uma API Key
5. Use o token no arquivo `.env`

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build            # Gera build de produção
npm run preview          # Visualiza build localmente

# Testes
npm test                 # Executa testes em modo watch
npm run test:all         # Executa todos os testes
npm run test:coverage    # Testes com cobertura
npm run test:ui          # Interface gráfica do Vitest

# Storybook
npm run storybook        # Inicia Storybook
npm run build-storybook  # Build estático do Storybook

# Code Quality
npm run lint             # Verifica problemas de lint
npm run lint:fix         # Corrige problemas de lint
npm run format           # Formata o código
npm run format:check     # Verifica formatação
```

## Pre-commit Hooks

O projeto utiliza **Husky** e **lint-staged** para garantir qualidade de código antes de cada commit:

- **ESLint**: Executa automaticamente com `--fix` em arquivos `.ts` e `.tsx` staged
- **Prettier**: Formata automaticamente arquivos staged (`.ts`, `.tsx`, `.json`, `.css`, `.scss`, `.md`)

Os hooks são executados automaticamente ao fazer `git commit`. Se houver erros que não podem ser corrigidos automaticamente, o commit será bloqueado até que sejam resolvidos.

**Configuração:**

- Hook pre-commit: `.husky/pre-commit`
- Configuração lint-staged: `package.json` → `lint-staged`

## Stack Tecnológica

- React 19
- TypeScript
- Vite
- React Router DOM
- Styled Components
- Axios
- Vitest
- Storybook
- ESLint
- Prettier
- Husky
- lint-staged

## Arquitetura

Aplicação baseada em componentes com separação de responsabilidades:

- **Componentes**: Componentes reutilizáveis isolados
- **Contexts**: Estado global com React Context API
- **Services**: Camada de abstração para APIs externas
- **Hooks**: Lógica reutilizável em custom hooks
- **Types**: Definições TypeScript centralizadas

## Desenvolvimento

### Adicionando Componentes

Estrutura padrão:

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.styles.ts
├── ComponentName.test.tsx
└── ComponentName.stories.tsx
```

### Testes

Testes próximos ao código. Utilize Testing Library para componentes e MSW para mocks HTTP.

### Storybook

Cada componente deve ter uma story em `ComponentName.stories.tsx`.

## Ferramentas de Desenvolvimento

### EditorConfig

O projeto utiliza `.editorconfig` para manter consistência de formatação entre diferentes editores e IDEs. As configurações incluem:

- Encoding UTF-8
- Fim de linha LF (Unix)
- Indentação com espaços (2 espaços)
- Remoção de espaços em branco no final das linhas
- Inserção de nova linha no final dos arquivos

A maioria dos editores modernos suporta EditorConfig nativamente ou através de plugins.

### NVM (.nvmrc)

O arquivo `.nvmrc` especifica a versão do Node.js recomendada para o projeto (Node.js 20). Para usar a versão correta:

```bash
# Se você usa NVM
nvm use

# Ou instale a versão especificada
nvm install
```

Isso garante que todos os desenvolvedores usem a mesma versão do Node.js, evitando problemas de compatibilidade.

## Deploy

A aplicação está deployada na **Vercel** e disponível em:

🌐 **https://tc-react-api.vercel.app**

O deploy é feito automaticamente através de integração contínua (CI/CD) sempre que há push para a branch principal do repositório.

## Autor

Gabriel Morais (Gabraug)
