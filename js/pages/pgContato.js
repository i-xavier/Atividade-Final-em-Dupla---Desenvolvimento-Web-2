// PGCONTATO.JS
// Script da página de contato (contato.html).
// Valida o formulário (campos obrigatórios e e-mail válido) e mostra
// mensagens de erro/sucesso na própria tela, sem usar alert.

import { atualizarContador } from "../componentes/header.js";

const formulario = document.getElementById("contato-form");
const feedback = document.getElementById("contato-feedback"); // mensagem geral abaixo do botão

// Agrupa os 4 campos do formulário em um objeto, para tratar todos de forma parecida
const campos = {
    nome: document.getElementById("contato-nome"),
    email: document.getElementById("contato-email"),
    assunto: document.getElementById("contato-assunto"),
    mensagem: document.getElementById("contato-mensagem")
};

// Quando a página carrega: só atualiza o contador do carrinho no menu
document.addEventListener("DOMContentLoaded", (e) => {
    atualizarContador();
})

// Ao enviar o formulário: valida; se estiver tudo certo mostra sucesso e limpa os campos,
// se não, mostra a mensagem de erro geral
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // impede a página de recarregar

    if (validarFormulario()) {
        mostrarFeedback("Mensagem enviada com sucesso! Responderemos em breve.", true);
        formulario.reset();
    } else {
        mostrarFeedback("Não foi possível enviar. Corrija os campos destacados.", false);
    }
});

// Ao digitar de novo num campo com erro, o erro daquele campo some
Object.entries(campos).forEach(([nome, campo]) => {
    campo.addEventListener("input", () => limparErro(nome));
});

// Roda a validação de todos os campos.
// Devolve true se tudo está certo e false se algum campo tem erro.
function validarFormulario() {
    let valido = true;
    let primeiroInvalido = null; // guarda o primeiro campo com erro para dar foco nele

    // Cada validador devolve o texto do erro (ou "" se está ok)
    const erros = {
        nome: validarNome(campos.nome.value),
        email: validarEmail(campos.email.value),
        assunto: validarAssunto(campos.assunto.value),
        mensagem: validarMensagem(campos.mensagem.value)
    };

    // Para cada campo: se tem erro, mostra embaixo do campo; senão, limpa
    Object.entries(erros).forEach(([nome, erro]) => {
        if (erro) {
            mostrarErro(nome, erro);
            valido = false;
            if (!primeiroInvalido) primeiroInvalido = campos[nome];
        } else {
            limparErro(nome);
        }
    });

    // Leva o cursor ao primeiro campo com problema (ajuda quem usa teclado)
    if (primeiroInvalido) primeiroInvalido.focus();
    return valido;
}

// Cada função devolve o texto do erro, ou "" quando o campo está certo

// Nome: obrigatório e com pelo menos 2 letras
function validarNome(valor) {
    const nome = valor.trim();
    if (!nome) return "Informe seu nome.";
    if (nome.length < 2) return "O nome deve ter pelo menos 2 letras.";
    return "";
}

// E-mail: obrigatório e em formato válido
function validarEmail(valor) {
    const email = valor.trim();
    if (!email) return "Informe seu e-mail.";
    if (!emailValido(email)) return "Digite um e-mail válido, como nome@email.com.";
    return "";
}

// Assunto: apenas obrigatório
function validarAssunto(valor) {
    if (!valor.trim()) return "Informe o assunto.";
    return "";
}

// Mensagem: obrigatória e com pelo menos 10 caracteres
function validarMensagem(valor) {
    const mensagem = valor.trim();
    if (!mensagem) return "Escreva sua mensagem.";
    if (mensagem.length < 10) return "A mensagem deve ter pelo menos 10 caracteres.";
    return "";
}

// Confere o formato do e-mail com uma expressão regular:
// texto + @ + texto + ponto + pelo menos 2 letras, sem espaços (ex.: nome@email.com)
function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// Escreve o erro no <p> abaixo do campo e marca o campo como inválido
// (o CSS usa aria-invalid para colocar a borda vermelha)
function mostrarErro(nome, texto) {
    document.getElementById(`erro-${nome}`).textContent = texto;
    campos[nome].setAttribute("aria-invalid", "true");
}

// Apaga o erro do campo e tira a marca de inválido
function limparErro(nome) {
    document.getElementById(`erro-${nome}`).textContent = "";
    campos[nome].removeAttribute("aria-invalid");
}

// Mostra a mensagem geral (sucesso = verde, erro = vermelho)
function mostrarFeedback(texto, sucesso) {
    feedback.textContent = texto;
    feedback.className = sucesso ? "mensagem-form sucesso" : "mensagem-form erro";
}