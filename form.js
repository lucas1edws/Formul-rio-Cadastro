const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("informar senha");
const mensagemErro = document.getElementById("mensagemErro");
const nascimento = document.getElementById("nascimento");


nascimento.addEventListener("input", function () {
    let valor = nascimento.value.replace(/\D/g, "");
    let posicao = nascimento.selectionStart;
    let digitosAntes = nascimento.value
        .slice(0, posicao)
        .replace(/\D/g, "").length;

    if (valor.length > 8) {
        valor = valor.slice(0, 8);
    }

    if (valor.length >= 5) {
        valor = valor.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    } else if (valor.length >= 3) {
        valor = valor.replace(/(\d{2})(\d{2})/, "$1/$2");
    }

    nascimento.value = valor;

    let novaPosicao = 0;
    let contador = 0;

    while (novaPosicao < valor.length && contador < digitosAntes) {
        if (/\d/.test(valor[novaPosicao])) {
            contador++;
        }
        novaPosicao++;
    }

    if (valor[novaPosicao] === "/") {
        novaPosicao++;
    }

    nascimento.setSelectionRange(novaPosicao, novaPosicao);

    if (valor.length < 10) {
        nascimento.classList.remove("valido", "invalido");
        nascimento.setCustomValidity("");
        return;
    }

    const [dia, mes, ano] = valor.split("/").map(Number);

    const data = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (
        data.getFullYear() !== ano ||
        data.getMonth() !== mes - 1 ||
        data.getDate() !== dia ||
        data > hoje
    ) {
        nascimento.classList.add("invalido");
        nascimento.classList.remove("valido");
        nascimento.setCustomValidity("Digite uma data válida e que não seja futura!");
    } else {
        nascimento.classList.add("valido");
        nascimento.classList.remove("invalido");
        nascimento.setCustomValidity("");
    }
});

function compararSenhas() {
    const valorSenha = senha.value;
    const valorConfirmar = confirmarSenha.value;

    if (valorConfirmar === "") {
        mensagemErro.textContent = "";
        return true;
    }

    if (valorSenha === valorConfirmar) {
        console.log("As senhas são iguais!");
        mensagemErro.textContent = "";
        return true;

    } else {
        console.log("As senhas são diferentes!");

        mensagemErro.innerHTML = '<i class="bi bi-exclamation-circle-fill"></i> As senhas não coincidem!';

        mensagemErro.classList.remove("animar");
        void mensagemErro.offsetWidth;
        mensagemErro.classList.add("animar");
        return false;
    }

}

confirmarSenha.addEventListener("input", function () {
    mensagemErro.textContent = "";
});

senha.addEventListener("input", function () {
    mensagemErro.textContent = "";
});

const formulario = document.getElementById("formulario");
const sucesso = document.getElementById("sucesso");
const todosInputs = document.querySelectorAll(".campo input");

todosInputs.forEach(function (input) {
    input.addEventListener("input", function () {

        const campo = input.closest(".campo");
        const erro = campo.querySelector(".erro");

        if (input.value.trim() !== "") {
            erro.textContent = "";
        }

        if (input.name === "nome" || input.name === "ultimo_nome") {
            input.value = input.value.replace(/[^a-zA-ZÀ-ÿ\s-]/g, "");
        }

        if (input.type === "email") {

            input.value = input.value.trim();

            if (input.value.trim() === "") {
                input.classList.remove("valido", "invalido");

            } else if (input.checkValidity()) {
                input.classList.add("valido");
                input.classList.remove("invalido");

            } else {
                input.classList.add("invalido");
                input.classList.remove("valido");
            }

        } else if (input.name === "senha") {

            if (input.value.length < 8) {
                input.classList.add("invalido");
                input.classList.remove("valido");
            } else {
                input.classList.add("valido");
                input.classList.remove("invalido");
            }

            if (confirmarSenha.value !== "") {
                if (confirmarSenha.value !== senha.value || senha.value.length < 8) {
                    confirmarSenha.classList.add("invalido");
                    confirmarSenha.classList.remove("valido");
                } else {
                    confirmarSenha.classList.add("valido");
                    confirmarSenha.classList.remove("invalido");
                }

            }


        } else if (input.name === "confirmar_senha") {

            if (input.value.trim() === "") {
                input.classList.remove("valido", "invalido");

            } else if (input.value !== senha.value || senha.value.length < 8) {
                input.classList.add("invalido");
                input.classList.remove("valido");

            } else {
                input.classList.add("valido");
                input.classList.remove("invalido");
            }


        } else if (input.name === "nascimento") {
            // A validação da data será feita no evento próprio.

        } else if (input.value.trim() !== "") {
            input.classList.add("valido");
            input.classList.remove("invalido");

        } else {
            input.classList.remove("valido", "invalido");
        }

    });
});


formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    let temErro = false;
    let primeiroCampoComErro = null;

    const generoSelecionado = document.querySelector('input[name="genero"]:checked');

    if (!generoSelecionado) {
        temErro = true;

        const erroGenero = document.getElementById("erroGenero");

        erroGenero.innerHTML = '<i class="bi bi-exclamation-circle-fill"></i> Selecione um gênero!';

        erroGenero.classList.remove("animar");
        void erroGenero.offsetWidth;
        erroGenero.classList.add("animar");

    } else {
        document.getElementById("erroGenero").textContent = "";
    }

    const campos = document.querySelectorAll(".campo");

    campos.forEach(function (campo) {
        const input = campo.querySelector("input");
        const erro = campo.querySelector(".erro");

        if (input.value.trim() === "") {
            erro.innerHTML = '<i class="bi bi-exclamation-circle-fill"></i> Preencha este campo!';

            erro.classList.remove("animar");
            void erro.offsetWidth;
            erro.classList.add("animar");

            temErro = true;

            if (!primeiroCampoComErro) {
                primeiroCampoComErro = input;
            }

        } else if (input.name === "senha" && input.value.length < 8) {

            erro.innerHTML = '<i class="bi bi-exclamation-circle-fill"></i> A senha deve ter pelo menos 8 caracteres!';

            erro.classList.remove("animar");
            void erro.offsetWidth;
            erro.classList.add("animar");

            input.classList.add("invalido");
            input.classList.remove("valido");

            temErro = true;
            if (!primeiroCampoComErro) {
                primeiroCampoComErro = input;
            }

        } else if (
            input.type === "email" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value)
        ) {

            erro.innerHTML = '<i class="bi bi-exclamation-circle-fill"></i> Digite um e-mail válido!';

            erro.classList.remove("animar");
            void erro.offsetWidth;
            erro.classList.add("animar");

            input.classList.add("invalido");
            input.classList.remove("valido");

            temErro = true;

        } else {
            erro.textContent = "";
        }

    });


    if (nascimento.value.trim() !== "" && (nascimento.value.length !== 10 || !nascimento.checkValidity())) {
        nascimento.classList.add("invalido");
        nascimento.classList.remove("valido");

        const erroNascimento = nascimento.closest(".campo").querySelector(".erro");

        erroNascimento.innerHTML = '<i class="bi bi-exclamation-circle-fill"></i> Digite uma data válida!';
        erroNascimento.classList.remove("animar");
        void erroNascimento.offsetWidth;
        erroNascimento.classList.add("animar");

        temErro = true;

        if (!primeiroCampoComErro) {
            primeiroCampoComErro = nascimento;
        }
    }
    if (senha.value !== confirmarSenha.value) {
        compararSenhas();

        temErro = true;

        if (!primeiroCampoComErro) {
            primeiroCampoComErro = confirmarSenha;
        }
    }

    if (primeiroCampoComErro) {
        primeiroCampoComErro.focus();
    }

    if (temErro) {
        return;
    }

    if (senha.value !== confirmarSenha.value) {
        return;
    }

    formulario.style.display = "none";
    sucesso.style.display = "block";
})

document.querySelectorAll(".alternar-senha").forEach(function (botao) {
    botao.addEventListener("click", function () {
        const campo = botao.closest(".campo");
        const input = campo.querySelector("input");
        const icone = botao.querySelector("i");

        if (input.type === "password") {
            input.type = "text";
            icone.classList.replace("bi-eye", "bi-eye-slash");
            botao.setAttribute("aria-label", "Ocultar senha");
        } else {
            input.type = "password";
            icone.classList.replace("bi-eye-slash", "bi-eye");
            botao.setAttribute("aria-label", "Mostrar senha");
        }
    });
});