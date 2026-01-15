# Altaa Store - Desafio Técnico Frontend

![Coverage](https://img.shields.io/badge/Test_Coverage-100%25-green)

Aplicação de E-commerce desenvolvida como parte do processo seletivo para Desenvolvedor Frontend na **Altaa Digital**. O projeto consome a **Fake Store API** e demonstra domínio técnico em arquitetura front-end, boas práticas e testes automatizados.

🔗 **Deploy (Live Demo):** https://altaa-store.vercel.app/

---

## 🚀 Funcionalidades

O projeto atende a todos os requisitos funcionais e diferenciais propostos:

- **Listagem de Produtos:** Exibição em grid responsivo com imagem, título, preço e categoria.
- **Filtros e Ordenação:**
  - Filtragem dinâmica por categorias.
  - Ordenação por Preço (Crescente/Decrescente) e Nome (A-Z).
- **Detalhes do Produto:** Página dedicada com descrição completa, rating (nota e quantidade) e botão de ação.
- **Experiência do Usuário (UX):**
  - **Loading States:** Uso de Skeletons claros durante o carregamento de dados.
  - **Error Handling:** Tratamento visual amigável para falhas na API.
  - **Empty States:** Feedback visual quando a busca/filtro não retorna resultados.

---

## 🛠️ Tecnologias e Decisões Técnicas

Conforme solicitado no desafio, justifico abaixo as escolhas da stack tecnológica:

### 1. Framework: Next.js (App Router)
A escolha pelo **Next.js** em vez de Vite (SPA) deve-se à maturidade exigida para aplicações de E-commerce:
- **Server-Side Rendering (SSR):** Garante que o conteúdo crítico chegue renderizado ao navegador, otimizando SEO e performance inicial.
- **Otimização de Imagens:** O componente `next/image` converte e redimensiona imagens automaticamente, vital para a performance do layout de listagem.
- **App Router:** Utilizado para criar uma estrutura de rotas robusta e organizada (`/product/[id]`).

### 2. Estilização: Tailwind CSS
Utilizado para garantir desenvolvimento ágil e consistência visual. A abordagem *utility-first* facilita a criação de um layout responsivo e mobile-first sem a sobrecarga de CSS-in-JS em tempo de execução.

### 3. Qualidade e Testes: Vitest
- **Ferramenta:** Optei pelo **Vitest** + **React Testing Library** devido à sua velocidade superior em comparação ao Jest e integração nativa com o ecossistema Vite/Next.js.
- **Cobertura:** O projeto alcançou **>90% de cobertura de testes** nos Hooks principais e componentes críticos, garantindo a confiabilidade da lógica de negócios.

### 4. Arquitetura
O projeto segue uma separação clara de responsabilidades:
- `src/services`: Camada isolada para comunicação com a API (Padrão Adapter).
- `src/hooks`: Custom hooks (`useProductFilter`) para isolar a lógica de filtragem e ordenação da UI.
- `src/components`: Componentes visuais puros (Dumb Components) focados em apresentação e reuso.
- **Tipagem:** Uso estrito de TypeScript para todas as interfaces de dados (Produto, Rating, Props).

---

## ⚖️ Trade-offs

Decisões tomadas considerando o prazo e o escopo do desafio:

- **Gerenciamento de Estado:** Optei por usar **React Hooks nativos** (`useState`, `useMemo`) em vez de introduzir complexidade com Redux ou Zustand. **Motivo:** O estado da aplicação é local ou de pouca profundidade (prop-drilling mínimo), e essa abordagem evita *overengineering*.
- **Componentes UI:** Construí os componentes do zero com Tailwind em vez de usar bibliotecas pesadas (MUI, Bootstrap). **Motivo:** Menor bundle size e controle total sobre a acessibilidade e semântica HTML.

---

## 📦 Como rodar o projeto

Pré‑requisitos: Node.js 18+.

Clone o repositório e instale dependências:

```bash
git clone https://github.com/SEU-USUARIO/altaa-store.git
cd altaa-store
npm install
```

Rodar em desenvolvimento:

```bash
npm run dev
```

Abra http://localhost:3000

Rodar testes e gerar relatório de coverage:

```bash
npm run test:coverage
```

## 🏆 Diferenciais Alcançados

Além dos requisitos obrigatórios, o projeto implementou os seguintes diferenciais valorizados:

- ✅ Testes Automatizados: Implementação de testes unitários e de integração com Vitest, cobrindo >90% da lógica de negócios (Hooks) e renderização de componentes.

- ✅ Otimização de Performance: Uso de Server-Side Rendering (SSR) para carregamento inicial rápido e `next/image` para otimização automática de imagens (formato WebP e Lazy Loading), garantindo altos scores no Lighthouse.

- ✅ Acessibilidade Básica: Utilização de HTML semântico (`main`, `article`, `h1`–`h6`), textos alternativos em imagens e elementos focáveis para navegação por teclado.

- ✅ Pequeno Design System: Consistência visual mantida através de tokens do Tailwind CSS e componentização reutilizável (`ProductCard`, `Button`), facilitando a manutenção e escalabilidade.

- ✅ Deploy Contínuo: Configurado na Vercel com CI/CD integrado ao GitHub.

## 🔮 Pontos de melhoria

Com mais tempo, implementaria:

- Carrinho de compras com contexto global e persistência (localStorage).
- TanStack Query (React Query) para cache e revalidação avançada.
- Testes E2E com Cypress ou Playwright para fluxos críticos.
- Melhorias de acessibilidade (a11y) e navegação por teclado.

---

Autor: Desenvolvido por Ivan Costa