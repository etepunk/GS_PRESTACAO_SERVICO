document.addEventListener("DOMContentLoaded", function () {
    const cadastroForm = document.querySelector('.dropdown-menu form');
    const loginForm = document.querySelector('form'); // Vai pegar o primeiro formulário (o de login)

    // Cadastro
    cadastroForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('cadastroEmail').value.trim();
        const senha = document.getElementById('cadastroSenha').value.trim();
        const telefone = document.getElementById('cadastroTelefone').value.trim();

        if (!email || !senha || !telefone) {
            alert('Por favor, preencha todos os campos de cadastro.');
            return;
        }

        const user = {
            email,
            senha,
            telefone
        };

        console.log("Usuário cadastrado:", user);
        localStorage.setItem(email, JSON.stringify(user));
        alert('Cadastro realizado com sucesso!');
        cadastroForm.reset();
    });

    // Login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const senha = document.getElementById('loginSenha').value.trim();

        const user = JSON.parse(localStorage.getItem(email));
        console.log("Usuário encontrado no login:", user);

        if (user && user.senha === senha) {
            alert('Login realizado com sucesso!');
            // Redirecionar se quiser:
            // window.location.href = 'pagina-logado.html';
        } else {
            alert('Email ou senha inválidos!');
        }
    });
});
