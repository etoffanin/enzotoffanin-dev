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
- `src/js/main.js`: inicialização, menu mobile e entrada suave das seções.
- `src/js/projects.js` e `src/data/projects.json`: exibição e dados dos projetos.
- `src/js/apollo.js` e `src/data/apollo-messages.json`: comportamento e falas do Apollo.
- `assets/`: imagens e ícones usados pela página.

## Adicionar um projeto

Adicione um objeto em `src/data/projects.json`, seguindo os exemplos do arquivo. Os projetos aparecem na ordem em que estão listados. Preencha `name`, `slug`, `description`, `image`, `imageAlt`, `status`, `technologies`, `demo` e `github`. O campo `imageAlt` descreve o que aparece na captura de tela. Use `"featured": false` para manter um projeto no JSON sem exibi-lo na página.

## Editar as falas do Apollo

As frases ficam em `src/data/apollo-messages.json`, nos grupos `common`, `rare` e `legendary`. O Apollo sorteia uma fala ao clicar, evita repetições até percorrer as mensagens e mostra o texto com efeito de digitação. Mantenha o arquivo em JSON válido ao editar.

## Publicação

O site é estático e pode ser publicado na Vercel sem comando de build. As metas básicas de SEO estão em `index.html`. Uma URL canônica e uma imagem de compartilhamento podem ser adicionadas quando o endereço de produção e uma imagem adequada estiverem definidos.
