import { atualizarContador } from "../componentes/header.js";

const formulario = document.getElementById("contato-form");
const feedback = document.getElementById("contato-feedback");

const campos = {
    nome: document.getElementById("contato-nome"),
    email: document.getElementById("contato-email"),
    assunto: document.getElementById("contato-assunto"),
    mensagem: document.getElementById("contato-mensagem")
};

document.addEventListener("DOMContentLoaded", (e) => {
    atualizarContador();
})

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

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

function validarFormulario() {
    let valido = true;
    let primeiroInvalido = null;

    const erros = {
        nome: validarNome(campos.nome.value),
        email: validarEmail(campos.email.value),
        assunto: validarAssunto(campos.assunto.value),
        mensagem: validarMensagem(campos.mensagem.value)
    };

    Object.entries(erros).forEach(([nome, erro]) => {
        if (erro) {
            mostrarErro(nome, erro);
            valido = false;
            if (!primeiroInvalido) primeiroInvalido = campos[nome];
        } else {
            limparErro(nome);
        }
    });

    if (primeiroInvalido) primeiroInvalido.focus();
    return valido;
}

// Cada função devolve o texto do erro, ou "" quando o campo está certo
function validarNome(valor) {
    const nome = valor.trim();
    if (!nome) return "Informe seu nome.";
    if (nome.length < 2) return "O nome deve ter pelo menos 2 letras.";
    return "";
}

function validarEmail(valor) {
    const email = valor.trim();
    if (!email) return "Informe seu e-mail.";
    if (!emailValido(email)) return "Digite um e-mail válido, como nome@email.com.";
    return "";
}

function validarAssunto(valor) {
    if (!valor.trim()) return "Informe o assunto.";
    return "";
}

function validarMensagem(valor) {
    const mensagem = valor.trim();
    if (!mensagem) return "Escreva sua mensagem.";
    if (mensagem.length < 10) return "A mensagem deve ter pelo menos 10 caracteres.";
    return "";
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function mostrarErro(nome, texto) {
    document.getElementById(`erro-${nome}`).textContent = texto;
    campos[nome].setAttribute("aria-invalid", "true");
}

function limparErro(nome) {
    document.getElementById(`erro-${nome}`).textContent = "";
    campos[nome].removeAttribute("aria-invalid");
}

function mostrarFeedback(texto, sucesso) {
    feedback.textContent = texto;
    feedback.className = sucesso ? "mensagem-form sucesso" : "mensagem-form erro";
}
