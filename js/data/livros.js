// LIVROS.JS
// Dados do catálogo: lista com os 12 livros (3 em cada categoria).
// Nenhum card é escrito no HTML: as páginas leem este array e criam os cards por JavaScript.
//
// Campos de cada livro:
//   id         -> número único (usado na URL: livro.html?id=4)
//   titulo, autor, editora, ano, paginas, preco, sinopse -> informações exibidas
//   categoria  -> usada pelos botões de filtro (precisa ser igual ao data-id do botão)
//   imagem/alt -> caminho da capa e texto alternativo (acessibilidade)
//   destaque   -> true = aparece na vitrine da página inicial
export const livrosDefault = [
    // Fantasia
    { id: 1, titulo: "Mistborn: O Império Final", autor: "Brandon Sanderson", editora: "Leya", ano: 2006, paginas: 560, preco: 69.90, categoria: "Fantasia", sinopse: "Em um mundo dominado há mil anos por um imperador imortal, uma jovem ladra descobre que tem o poder de queimar metais e se une a uma equipe disposta a derrubar o regime.", imagem: "img/mistborn.jpg", alt: "Capa do livro Mistborn: O Império Final", destaque: false },
    { id: 2, titulo: "O Caminho dos Reis", autor: "Brandon Sanderson", editora: "Trama", ano: 2010, paginas: 1008, preco: 89.90, categoria: "Fantasia", sinopse: "Em Roshar, terra de tempestades devastadoras, um escravo, um príncipe guerreiro e uma jovem estudiosa se veem ligados a uma guerra e a segredos de uma ordem de cavaleiros esquecida.", imagem: "img/caminho-dos-reis.jpg", alt: "Capa do livro O Caminho dos Reis", destaque: true },
    { id: 3, titulo: "O Nome do Vento", autor: "Patrick Rothfuss", editora: "Arqueiro", ano: 2007, paginas: 656, preco: 59.90, categoria: "Fantasia", sinopse: "Kvothe, um lendário mago e músico que vive disfarçado como estalajadeiro, conta a verdadeira história de sua vida, da infância numa trupe de artistas até a Universidade.", imagem: "img/nome-do-vento.jpg", alt: "Capa do livro O Nome do Vento", destaque: false },

    // Ficção Científica
    { id: 4, titulo: "Duna", autor: "Frank Herbert", editora: "Aleph", ano: 1965, paginas: 680, preco: 94.90, categoria: "Sci-fi", sinopse: "Paul Atreides e sua família assumem o governo do planeta desértico Arrakis, única fonte da especiaria mais valiosa do universo, e se veem no centro de uma disputa política e religiosa.", imagem: "img/duna.jpg", alt: "Capa do livro Duna", destaque: true },
    { id: 5, titulo: "Androides Sonham com Ovelhas Elétricas?", autor: "Philip K. Dick", editora: "Aleph", ano: 1968, paginas: 272, preco: 54.90, categoria: "Sci-fi", sinopse: "Em um mundo devastado, o caçador de recompensas Rick Deckard precisa eliminar androides fugitivos quase idênticos aos humanos, e começa a questionar o que significa ser humano.", imagem: "img/androides.jpg", alt: "Capa do livro Androides Sonham com Ovelhas Elétricas?", destaque: false },
    { id: 6, titulo: "Fundação", autor: "Isaac Asimov", editora: "Aleph", ano: 1951, paginas: 256, preco: 49.90, categoria: "Sci-fi", sinopse: "Com o Império Galáctico prestes a ruir, o matemático Hari Seldon cria um plano para encurtar os séculos de barbárie que virão e preservar o conhecimento da humanidade.", imagem: "img/fundacao.jpg", alt: "Capa do livro Fundação", destaque: false },

    // Filosofia e Política
    { id: 7, titulo: "Manifesto Comunista", autor: "Karl Marx e Friedrich Engels", editora: "Boitempo", ano: 1848, paginas: 144, preco: 29.90, categoria: "Filosofia-politica", sinopse: "Texto histórico que apresenta a análise de Marx e Engels sobre a luta de classes e o capitalismo, e que influenciou movimentos políticos no mundo todo.", imagem: "img/manifesto-comunista.jpg", alt: "Capa do livro Manifesto Comunista", destaque: true },
    { id: 8, titulo: "O Príncipe", autor: "Nicolau Maquiavel", editora: "Penguin-Companhia", ano: 1532, paginas: 176, preco: 34.90, categoria: "Filosofia-politica", sinopse: "Clássico do pensamento político renascentista, com conselhos a um governante sobre como conquistar e manter o poder.", imagem: "img/o-principe.jpg", alt: "Capa do livro O Príncipe", destaque: false },
    { id: 9, titulo: "Meditações", autor: "Marco Aurélio", editora: "Penguin-Companhia", ano: 180, paginas: 224, preco: 39.90, categoria: "Filosofia-politica", sinopse: "Anotações pessoais do imperador romano sobre disciplina, virtude e aceitação, um dos textos centrais do estoicismo.", imagem: "img/meditacoes.jpg", alt: "Capa do livro Meditações", destaque: false },

    // Psicologia
    { id: 10, titulo: "Tipos Psicológicos", autor: "Carl Gustav Jung", editora: "Vozes", ano: 1921, paginas: 576, preco: 119.90, categoria: "Psicologia", sinopse: "Obra em que Jung apresenta sua teoria das atitudes (introversão e extroversão) e das funções psicológicas, base de muitas tipologias de personalidade.", imagem: "img/tipos-psicologicos.jpg", alt: "Capa do livro Tipos Psicológicos", destaque: true },
    { id: 11, titulo: "O Homem e Seus Símbolos", autor: "Carl Gustav Jung", editora: "Harper Collins", ano: 1964, paginas: 464, preco: 79.90, categoria: "Psicologia", sinopse: "Jung e colaboradores explicam, em linguagem acessível, o papel dos sonhos, dos arquétipos e do inconsciente na vida das pessoas.", imagem: "img/homem-e-seus-simbolos.jpg", alt: "Capa do livro O Homem e Seus Símbolos", destaque: false },
    { id: 12, titulo: "Rápido e Devagar: Duas Formas de Pensar", autor: "Daniel Kahneman", editora: "Objetiva", ano: 2011, paginas: 608, preco: 84.90, categoria: "Psicologia", sinopse: "O Nobel de Economia explica os dois sistemas que guiam o pensamento, o intuitivo e o deliberado, e como eles influenciam nossas decisões e erros de julgamento.", imagem: "img/rapido-e-devagar.jpg", alt: "Capa do livro Rápido e Devagar: Duas Formas de Pensar", destaque: false }
];