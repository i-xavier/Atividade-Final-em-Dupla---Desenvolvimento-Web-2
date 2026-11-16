# Livraria Leia

Site de uma livraria fictícia, feito como Atividade Final da disciplina (projeto acadêmico).
A Livraria Leia reúne fantasia, ficção científica, filosofia e política, e psicologia, e fica no bairro da Liberdade, em São Paulo.

**Integrantes:**
- Igor Xavier dos Santos SP3212181

> Preencha os nomes acima antes de entregar.

---

## Tecnologias usadas e por quê

| Camada | Tecnologia | Por quê |
|---|---|---|
| Estrutura | HTML5 puro | Permite usar as tags semânticas pedidas (`header`, `nav`, `main`, `section`, `article`, `footer`) sem depender de framework. |
| Estilo | CSS puro (Flexbox, Grid e variáveis CSS) | Mantém o estilo simples e fácil de explicar; as variáveis de cor também permitem o modo escuro. |
| Estilo (só no carrinho) | Bootstrap 5.1.3 | Usado apenas no modal de finalização do pedido e nos botões do carrinho. |
| Ícones | FontAwesome 5.15.4 | Ícones de carrinho e lixeira. |
| Interatividade | JavaScript puro (módulos ES6) | Separa o código em arquivos pequenos e deixa claro o que cada parte faz. |
| Dados | Array em JavaScript (`js/data/livros.js`) | Simples para um catálogo de 12 livros; os cards são gerados por código. |
| Persistência | `localStorage` | Guarda o carrinho e o tema escolhido, que continuam ao recarregar a página. |

Não há ferramenta de build: o projeto roda direto no navegador.

---

## Estrutura do projeto

```
livraria/
├── index.html        Home (banner + vitrine de destaques)
├── catalogo.html     Catálogo com busca, filtro e ordenação
├── livro.html        Detalhes de um livro (livro.html?id=4)
├── carrinho.html     Carrinho de compras e modal de pedido
├── contato.html      Sobre a livraria + formulário de contato
├── css/
│   └── style.css     Estilo de todo o site
├── img/              Logotipo e capas dos livros
└── js/
    ├── componentes/header.js     Tema claro/escuro e contador do carrinho
    ├── data/livros.js            Lista dos 12 livros
    ├── models/carrinho.js        Classe Carrinho (itens e totais)
    ├── models/itemCarrinho.js    Classe ItemCarrinho (livro + quantidade)
    ├── repository/repositorio.js Acesso aos livros e ao localStorage
    └── pages/                    Um script por página (pgIndex, pgCatalogo, pgLivro, pgCarrinho, pgContato)
```

Todos os arquivos HTML e JavaScript têm comentários explicando o que cada trecho faz.

---

## Funcionalidades implementadas

### Páginas obrigatórias
- **Home:** cabeçalho com logotipo, nome e menu; banner "Livro do mês" (Duna); vitrine com 4 livros em destaque; rodapé com local, redes sociais e direitos autorais.
- **Catálogo:** 12 livros em cards (capa, categoria, título, autor, preço, "Ver Detalhes" e botão de adicionar ao carrinho), em 4 categorias: Fantasia, Ficção Científica, Filosofia e Política, e Psicologia.
- **Detalhes do livro:** capa ampliada, sinopse, autor, editora, ano, páginas, preço e categoria, com botão de adicionar ao carrinho e link para voltar ao catálogo. Mostra uma mensagem de erro se o id da URL não existir.
- **Carrinho:** lista de itens com preço unitário, quantidade, subtotal por item, botões `+` e `−`, remover item, limpar carrinho e valor total.
- **Contato / Sobre:** texto sobre a livraria e formulário com nome, e-mail, assunto e mensagem.

### Requisitos de JavaScript
1. **Renderização dinâmica:** os cards são criados por código a partir do array em `livros.js`.
2. **Busca:** filtra por título ou autor enquanto o usuário digita (ignora acentos e maiúsculas).
3. **Filtro por categoria:** botões que mostram só os livros da categoria escolhida; funciona junto com a busca.
4. **Carrinho funcional:** adicionar, remover e alterar quantidade, com total recalculado e contador de itens no menu.
5. **Persistência:** o carrinho é salvo no `localStorage` e continua ao recarregar.
6. **Validação do formulário:** campos obrigatórios, e-mail em formato válido, mensagem mínima de 10 caracteres, e mensagens de sucesso/erro na tela (sem `alert`).

### CSS, responsividade e acessibilidade
- Layout com Flexbox e Grid.
- Responsivo em 3 larguras: até 576 px (celular, 2 colunas), 768 px ou mais (tablet, 3 colunas) e 1200 px ou mais (desktop, 4 colunas).
- No celular o cabeçalho e o menu se empilham e centralizam.
- Paleta de cores e tipografia definidas por variáveis CSS e aplicadas em todo o site.
- Efeitos: hover nos cards, botões e links do menu; transições; animação de entrada dos cards.
- HTML semântico, um `h1` por página, todas as imagens com `alt`, campos de formulário com `label` e `aria-label` nos botões que só têm ícone.
- Cores escolhidas para ter contraste adequado nos temas claro e escuro.

### Extras (bônus)
- **Modo claro/escuro** com a preferência salva no `localStorage`.
- **Ordenação** por título (A–Z e Z–A) e por preço (crescente e decrescente).

### Ainda não implementado
- Menu hambúrguer (no celular o menu apenas se reorganiza em linhas).
- Lista de desejos, paginação, consumo de API, cupom de desconto, busca de CEP (ViaCEP) e avaliação por estrelas.

---

## Como rodar localmente

Como os scripts usam módulos ES6 (`type="module"`), o site **não funciona abrindo o HTML com duplo clique** (`file://`). É preciso servi-lo por um servidor local.

**Opção 1 — VS Code:** instale a extensão *Live Server*, abra a pasta do projeto, clique com o botão direito em `index.html` e escolha *Open with Live Server*.

**Opção 2 — Python (já vem instalado em muitos computadores):**

```bash
cd livraria
python3 -m http.server 8000
```

Depois acesse <http://localhost:8000>.

**Opção 3 — Node.js:**

```bash
cd livraria
npx serve
```

> O Bootstrap e o FontAwesome são carregados por CDN, então é necessário ter internet para o modal e os ícones aparecerem.

---

## Prints das telas

Coloque as imagens na pasta `img/prints/` e ajuste os nomes abaixo.

| Tela | Desktop | Celular |
|---|---|---|
| Home | ![Home desktop](img/prints/home-desktop.png) | ![Home celular](img/prints/home-celular.png) |
| Catálogo | ![Catálogo desktop](img/prints/catalogo-desktop.png) | ![Catálogo celular](img/prints/catalogo-celular.png) |
| Detalhes do livro | ![Livro desktop](img/prints/livro-desktop.png) | ![Livro celular](img/prints/livro-celular.png) |
| Carrinho | ![Carrinho desktop](img/prints/carrinho-desktop.png) | ![Carrinho celular](img/prints/carrinho-celular.png) |
| Contato | ![Contato desktop](img/prints/contato-desktop.png) | ![Contato celular](img/prints/contato-celular.png) |

---

## Aviso

Este é um projeto fictício desenvolvido para fins acadêmicos. Nenhuma compra é realizada de verdade.