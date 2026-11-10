# Mapa de Empresas | De Crateús para o mundo

Mapa mundial interativo em HTML5 para explorar empresas e locais ao redor do planeta, partindo de Crateús (CE). Passe o mouse sobre os pins para ver as informações, clique para selecionar o local e vote no seu favorito. Tudo roda no navegador, sem backend e sem build.

## Funcionalidades

- **Mapa mundial interativo** — mapa vetorial (SVG) com zoom e pan ("arraste para mover, role para aproximar"), pins clicáveis e legendas
- **Ponto de partida destacado** — Crateús recebe um pin pulsante e não pode ser excluído
- **Países destacados** — Brasil, Estados Unidos, França e Suécia recebem destaque visual com siglas
- **Painel lateral** — ao passar o mouse ou clicar em um pin, exibe categoria, cidade/país, descrição e ações do local
- **Votação** — botão "Votar (+1)" incrementa o contador do local selecionado (votos ilimitados, sem autenticação)
- **Ranking dinâmico** — lista "Locais da rota" ordenada por número de votos (decrescente), com desempate pela ordem de inserção; o ponto de partida só ocupa o topo se tiver votos iguais ou superiores; badge "Partida" identifica a origem da rota
- **Cadastro de local** — modal com nome, país (seletor pesquisável com nomes em português via `Intl.DisplayNames`), cidade, categoria, endereço/referência, descrição e latitude/longitude opcionais
- **Geocodificação automática** — ao cadastrar sem coordenadas manuais, a cidade é buscada via Nominatim/OpenStreetMap (com cache em memória e timeout); em caso de falha, o pin é posicionado no centro do país com deslocamento
- **Exclusão de local** — confirmação via modal; a exclusão de locais embutidos e adicionados persiste entre recarregamentos
- **Resetar votos** — limpa todos os votos armazenados
- **Estatísticas** — total de locais e total de votos no topo da página (formato `pt-BR`)
- **Feedback e acessibilidade** — notificações (toasts), atributos ARIA nos diálogos e seletor de país, layout responsivo (desktop, tablet e mobile)

## Como executar

Não há build nem dependências de instalação. Basta servir os arquivos como site estático:

```bash
# na raiz do projeto
python3 -m http.server
```

Depois abra `http://localhost:8000` no navegador. Também é possível abrir `index.html` diretamente, mas um servidor local é recomendado.

> **Nota:** o mapa funciona offline. A conexão com a internet só é necessária ao cadastrar um local **sem** latitude/longitude manual, para a geocodificação via OpenStreetMap.

## Estrutura do projeto

```
index.html            Marcação da página e referências aos recursos
css/
  styles.css          Estilos da aplicação
js/
  map-data.js         Locais iniciais, dados auxiliares e configuração do mapa (simplemaps_worldmap_mapdata)
  app.js              Lógica da aplicação (votação, CRUD, ranking, geocodificação, modais)
worldmap.js           Biblioteca Simplemaps HTML5 World Map v4.53 (inclui Raphaël e Shifty)
mapdata.js            Dados de exemplo da Simplemaps (214 países + 3 locais); usados apenas pelo test.html, não pelo index.html
test.html             Página de demonstração da biblioteca do mapa
documentation.html    Redireciona para a documentação oficial da Simplemaps
license.txt           Termos da licença Simplemaps
```

> **Ordem de carregamento:** `js/map-data.js` define o objeto `simplemaps_worldmap_mapdata`, lido pela biblioteca `worldmap.js` no momento em que ela carrega; por isso ele é incluído antes no `<head>`. Já o `js/app.js` depende do DOM e da biblioteca, e é incluído no fim do `<body>`.

## Dados e persistência

Os locais iniciais vêm embutidos em `js/map-data.js`:

1. **Crateús** — ponto de partida (Partida, Brasil, com pin pulsante)
2. **Microsoft** — Big Tech, Redmond, EUA
3. **Meta** — Big Tech, Menlo Park, EUA
4. **Spotify** — Streaming, Estocolmo, Suécia
5. **Ubisoft** — Games, Paris, França
6. **Nubank** — Fintech, São Paulo, Brasil

Não há backend. Toda a persistência é feita no navegador via `localStorage`:

| Chave | Conteúdo |
| --- | --- |
| `mapa-empresas-locais-v1` | Locais adicionados pelo usuário e IDs dos locais embutidos removidos (limite de 500 por lista) |
| `mapa-empresas-votos-v1` | Contadores de votos por ID de local |

Locais cadastrados, exclusões e votos sobrevivem ao recarregamento da página no mesmo navegador.

## Limitações conhecidas

- Não é possível **editar** um local existente (apenas cadastrar e excluir)
- Votos são ilimitados (não há restrição de um voto por usuário)
- Não há exportação/importação de dados nem sincronização entre dispositivos
- A função "Resetar votos" apaga todos os votos sem possibilidade de desfazer

## Licença e créditos

- O mapa é gerado pela biblioteca **Simplemaps HTML5 World Map v4.53** (`worldmap.js`), licenciada nos termos da [Simplemaps](https://simplemaps.com/license) — versão *branded*, destinada a uso acadêmico, sem fins lucrativos ou pessoal, mantendo a atribuição à Simplemaps. Os termos completos estão em `license.txt`.
- O restante do código da aplicação (`index.html`, `css/styles.css`, `js/map-data.js` e `js/app.js`) não possui declaração de licença específica.
