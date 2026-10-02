# EnzoToffanin.dev

Portfólio pessoal para compartilhar projetos e aprendizados em desenvolvimento web. Feito com HTML, CSS e JavaScript puro, sem etapa de build.

## Executar localmente

Abra a pasta do projeto em um servidor HTTP e acesse `index.html`. Se você já tiver Python instalado, pode iniciar um servidor na raiz do projeto com:

```sh
python -m http.server 8000
```

Depois, abra `http://localhost:8000`. Abrir o arquivo diretamente com `file://` impede o carregamento dos arquivos JSON via `fetch` em navegadores comuns.

## Organização

- `index.html`: estrutura e conteúdo principal da página.
- `src/css/style.css`: visual e layout base.
- `src/css/animations.css`: animações e transições.
- `src/css/responsive.css`: ajustes para tablet e celular; carregado por último.
- `src/js/main.js`: inicialização, rolagem suave entre seções, menu mobile e entrada suave do conteúdo.
- `src/js/projects.js` e `src/data/projects.json`: exibição e dados dos projetos.
- `src/js/apollo.js` e `src/data/apollo-messages.json`: comportamento e falas do Apollo.
- `src/js/apollo-chat.js`: painel de perguntas e comunicação com o backend do Apollo AI.
- `api/apollo.js`: endpoint do Apollo AI, executado somente no servidor da Vercel.
- `package.json` e `package-lock.json`: dependência do backend e versões instaladas.
- `.env.example`: exemplo da variável de ambiente, sem chave real.
- `assets/`: imagens e ícones usados pela página.

## Adicionar um projeto

Adicione um objeto em `src/data/projects.json`, seguindo os exemplos do arquivo. Os projetos aparecem na ordem em que estão listados. Preencha `name`, `slug`, `description`, `image`, `imageAlt`, `status`, `technologies`, `demo` e `github`. O campo `imageAlt` descreve o que aparece na captura de tela. Use `"featured": false` para manter um projeto no JSON sem exibi-lo na página.

## Editar as falas do Apollo

As frases ficam em `src/data/apollo-messages.json`, nos grupos `common`, `rare` e `legendary`. O Apollo sorteia uma fala ao clicar, evita repetições até percorrer as mensagens e mostra o texto com efeito de digitação. Mantenha o arquivo em JSON válido ao editar.

## Publicação

O frontend é estático e pode ser publicado na Vercel sem comando de build. Use o preset **Other**, deixe o comando de build vazio e mantenha a raiz do projeto como diretório de saída (`.`). A pasta `api/` contém a função do Apollo AI, e a Vercel instala o SDK a partir do `package.json`. O backend usa Node.js 22.

As metas básicas de SEO estão em `index.html`. Uma URL canônica e uma imagem de compartilhamento podem ser adicionadas quando o endereço de produção e uma imagem adequada estiverem definidos.

## Apollo AI

`POST /api/apollo` recebe `{ "message": "...", "history": [...] }`, valida a pergunta e o histórico e faz uma única chamada à Interactions API usando o SDK oficial `@google/genai`. Retorna `{ "reply": "...", "thoughtSignatures": [...] }`. O clique, as frases locais e as animações do Apollo continuam funcionando como antes.

### Painel de perguntas — etapa 2

O botão **Apollo AI**, ao lado de **Sobre** no cabeçalho, abre o painel de conversa. No celular, ele aparece dentro do menu e fecha o menu ao abrir o painel. O visitante pode perguntar sobre Enzo e os projetos, enviar com Enter ou inserir uma quebra de linha com Shift+Enter. O painel também funciona no celular e pode ser fechado pelo botão ou pela tecla Escape; o foco retorna ao botão de abertura ou ao botão do menu mobile.

As mensagens do visitante aparecem em balões roxos à direita; as do Apollo, em balões escuros à esquerda. Ao enviar, o campo é limpo imediatamente e continua disponível para escrever a próxima pergunta. Apenas o botão de envio fica desabilitado enquanto Apollo responde, para evitar envios duplicados. A resposta não apaga um novo rascunho.

Falhas de conexão ou uma espera de mais de 30 segundos mostram uma mensagem de erro. A pergunta enviada permanece na conversa e não volta ao campo de digitação; qualquer novo rascunho é preservado. Mensagens são inseridas como texto, sem interpretar HTML.

As perguntas e respostas ficam visíveis enquanto a página estiver aberta, inclusive depois de fechar e reabrir o painel. Para contexto, o JavaScript mantém em memória as últimas 16 mensagens de trocas concluídas (8 perguntas e respostas) e envia essa janela junto da nova pergunta. Cada entrada contém `role: "user"` ou `role: "model"` e `text`. A pergunta atual é enviada uma única vez, fora de `history`. Falhas, avisos, loading e a saudação inicial da interface não entram no histórico. Recarregar a página limpa a conversa; não há `sessionStorage` ou `localStorage`.

O backend converte as mensagens para os passos `user_input` e `model_output` da Interactions API. As assinaturas opacas de raciocínio retornadas pelo Gemini são preservadas em `thoughtSignatures` junto da resposta correspondente, conforme exigido pela API. Elas não são exibidas nem interpretadas pela interface; resumos de raciocínio não são solicitados ou enviados como mensagens. O servidor valida quantidade, ordem dos papéis e tamanho dos textos e metadados antes de consultar o Gemini.

O modelo fica na constante `APOLLO_MODEL` em `api/apollo.js`, inicialmente `gemini-3.5-flash-lite`. A constante `APOLLO_INSTRUCTIONS` define a personalidade e o contexto de Enzo. Os projetos são carregados diretamente de `src/data/projects.json`, sem copiar suas descrições manualmente. Alterações no JSON passam a fazer parte do contexto após reiniciar o ambiente local ou publicar uma nova versão.

A chamada pede uma ou duas frases por padrão e limita a saída a 300 tokens. Não envia ferramentas nem `previous_interaction_id`, e usa `store: false` com o histórico recente em cada chamada. O prompt de sistema é enviado uma única vez por requisição, separado da conversa. O visitante não pode escolher modelo, prompt, ferramentas ou configuração de geração; esses campos continuam definidos pelo servidor.

### Configurar localmente

Instale Node.js 22 com npm. Na raiz do projeto:

```powershell
npm install
Copy-Item .env.example .env.local
```

Edite `.env.local` e preencha `GEMINI_API_KEY` com uma chave criada no [Google AI Studio](https://aistudio.google.com/apikey). Esse arquivo é ignorado pelo Git. A chave é lida somente por `process.env.GEMINI_API_KEY` no backend; nunca a coloque em `src/`, HTML ou JSON público.

Inicie o ambiente local da Vercel:

```powershell
node --env-file=.env.local -e "require('node:child_process').execSync('npx.cmd vercel dev', { stdio: 'inherit' })"
```

Esse comando carrega `.env.local` no processo antes de iniciar a Vercel. Neste projeto, iniciar apenas com `npx vercel dev` não disponibilizou a chave local para a função quando ela não estava cadastrada no ambiente Development.

Na primeira execução, a CLI pode solicitar login e vínculo com o projeto Vercel. Use o projeto existente do portfólio. Acesse o endereço mostrado no terminal, normalmente `http://localhost:3000`. O servidor HTTP usado para visualizar apenas o frontend não executa a função `/api/apollo`.

### Configurar na Vercel

No projeto, abra **Settings → Environment Variables** e cadastre `GEMINI_API_KEY` com o valor da sua chave. Selecione **Production**, **Preview** e **Development** conforme os ambientes que pretende usar. Publique uma nova versão para aplicar a variável. Não use prefixos de variáveis públicas.

O `vercel dev` também carrega as variáveis do ambiente Development do projeto vinculado. Reinicie o comando depois de alterar a configuração local.

### Testar o endpoint

Com `vercel dev` em execução, abra outro terminal PowerShell:

```powershell
[System.Net.ServicePointManager]::Expect100Continue = $false
$body = @{ message = "O que é o Operion?" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/apollo" `
  -Method Post -ContentType "application/json; charset=utf-8" `
  -Body ([System.Text.Encoding]::UTF8.GetBytes($body))
```

Em produção, substitua `http://localhost:3000` pelo endereço do portfólio. Uma chamada válida retorna HTTP 200 e a propriedade `reply` com a fala do Apollo.

| Situação | Resposta |
| --- | --- |
| `message` ausente ou de outro tipo | HTTP 400 |
| Mensagem vazia após `trim()` | HTTP 400 |
| Mais de 500 caracteres após `trim()` | HTTP 400 |
| JSON malformado | HTTP 400 |
| Histórico inválido, mais de 16 mensagens ou papéis fora de ordem | HTTP 400 |
| Método diferente de POST | HTTP 405, com `Allow: POST` |
| Chave ausente, falha da API, interação não concluída ou resposta sem texto | HTTP 500, com `{ "error": "Apollo ficou offline por alguns instantes." }` |

Erros internos e a chave não são devolvidos ao visitante. O servidor registra nome, status e uma mensagem controlada para depuração, sem imprimir a chave ou detalhes da requisição à API.

Referências: [Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview), [Gemini 3.5 Flash-Lite](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite), [Vercel Functions em Node.js](https://vercel.com/docs/functions/runtimes/node-js) e [variáveis de ambiente da Vercel](https://vercel.com/docs/environment-variables).
