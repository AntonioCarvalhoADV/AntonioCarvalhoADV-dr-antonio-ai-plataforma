# Plataforma Dr. Antonio AI - Frontend Next.js

Este projeto é o frontend da Plataforma Dr. Antonio AI, desenvolvido com Next.js e Tailwind CSS.

## Funcionalidades Principais

- Autenticação de usuários (simulada)
- Upload de documentos (simulado com processamento mockado de NEP/NLP)
- Painel de visualização de leads gerados
- Detalhamento de documentos e leads
- Rotas protegidas que exigem login

## Estrutura do Projeto

- `/pages`: Contém as páginas da aplicação (roteamento baseado em arquivos do Next.js).
- `/components`: Contém os componentes React reutilizáveis.
- `/contexts`: Contém os contextos React (ex: AuthContext para autenticação).
- `/services`: Contém os serviços para interagir com APIs (atualmente mockados, ex: nepService.js, nlpService.js).
- `/styles`: Contém os estilos globais (globals.css).
- `/public`: Contém os ativos estáticos (imagens, favicons, etc.).

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm run dev`

Executa a aplicação em modo de desenvolvimento.
Abra [http://localhost:3000](http://localhost:3000) para visualizá-la no navegador.

A página será recarregada se você fizer edições.
Você também verá quaisquer erros de lint no console.

### `npm run build`

Compila a aplicação para produção na pasta `.next`.
Ele otimiza a aplicação para melhor performance.

### `npm run start`

Inicia a aplicação em modo de produção após o build.

## Deploy no Render.com (ou similar)

Para fazer o deploy desta aplicação Next.js como um Web Service dinâmico (Node.js) no Render.com ou plataforma similar:

1.  **Conecte seu Repositório Git:** Conecte o repositório Git que contém este código à sua plataforma de deploy.
2.  **Configurações de Build e Start:**
    *   **Ambiente (Environment):** Node
    *   **Comando de Build (Build Command):** `npm install && npm run build`
    *   **Comando de Início (Start Command):** `npm run start`
    *   **Diretório Raiz (Root Directory):** Deixe em branco ou aponte para a raiz do projeto Next.js.
3.  **Variáveis de Ambiente:** Configure quaisquer variáveis de ambiente necessárias (nenhuma específica para a simulação atual, mas APIs reais exigiriam URLs, chaves, etc.).
4.  **Deploy:** Inicie o processo de deploy.

## Usuários de Teste (Simulados)

Para fins de teste, os seguintes usuários estão configurados no `AuthContext.js`:

- **Email:** `gestor@drantonio.ai`
- **Senha:** `password123`

- **Email:** `consultor@drantonio.ai`
- **Senha:** `password123`

