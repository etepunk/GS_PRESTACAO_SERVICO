document.addEventListener("DOMContentLoaded", function () {
    const cadastroForm = document.querySelector('.dropdown-menu form');
    const loginForm = document.querySelector('form');
    const cartButton = document.getElementById('cartButton');
    const cartCountBadge = document.getElementById('cartCountBadge');
    const finalizePurchaseButton = document.getElementById('finalizePurchaseButton');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartMessage = document.getElementById('cartMessage');

    // ==== Função de cadastro ====
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('cadastroEmail').value.trim();
            const senha = document.getElementById('cadastroSenha').value.trim();
            const telefone = document.getElementById('cadastroTelefone').value.trim();

            if (!email || !senha || !telefone) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos obrigatórios',
                    text: 'Por favor, preencha todos os campos de cadastro.'
                });
                return;
            }

            const user = { email, senha, telefone };
            localStorage.setItem(email, JSON.stringify(user));

            Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado!',
                text: `Bem-vindo(a), ${email}! Seu cadastro foi efetuado com sucesso.`,
            });

            cadastroForm.reset();
        });
    }

    // ==== Função de login ====
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const senha = document.getElementById('loginSenha').value.trim();

            const user = JSON.parse(localStorage.getItem(email));

            if (user && user.senha === senha) {
                localStorage.setItem('userLogado', email);
                Swal.fire({
                    icon: 'success',
                    title: 'Login realizado!',
                    text: `Seja bem-vindo(a), ${email}!`,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao fazer login',
                    text: 'Email ou senha inválidos.',
                });
            }
        });
    }

    // ==== Funções do Carrinho ====

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0); // garante fallback pra quantity = 1
        const badge = document.getElementById('cartCountBadge');
        const cartButton = document.getElementById('cartButton');
    
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline' : 'none';
        }
    
        if (cartButton) {
            if (count > 0) {
                cartButton.classList.add('btn-primary');
            } else {
                cartButton.classList.remove('btn-primary');
            }
        }
    }
    

    function displayCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsList.innerHTML = '';

        if (cart.length > 0) {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - R$ ${item.price}`;
                cartItemsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = "Seu carrinho está vazio.";
            cartItemsList.appendChild(li);
        }

        // Garante que a mensagem final fique oculta ao abrir o carrinho
        cartMessage.style.display = 'none';
        cartItemsList.style.display = 'block';
    }

    if (finalizePurchaseButton) {
        finalizePurchaseButton.addEventListener('click', function () {
            const userLogado = localStorage.getItem('userLogado');

            if (!userLogado) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Login necessário',
                    text: 'Você precisa estar logado para finalizar a compra.'
                });
                return;
            }

            cartItemsList.style.display = 'none';
            cartMessage.style.display = 'block';

            Swal.fire({
                icon: 'success',
                title: 'Compra Finalizada!',
                text: 'Sua compra foi efetuada, vamos entrar em contato pelo Email/Whatsapp para prosseguir com a mesma.',
            });

            localStorage.removeItem('cart');
            updateCartCount();
        });
    }

    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('show.bs.modal', function () {
            displayCartItems();
        });
    }

    updateCartCount(); // Inicializa o badge ao carregar
});
