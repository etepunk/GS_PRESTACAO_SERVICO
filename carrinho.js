document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const badge = document.getElementById('cartCountBadge');
        const cartButton = document.getElementById('cartButton');

        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline' : 'none';
        }

        if (cartButton) {
            cartButton.classList.toggle('btn-primary', count > 0);
        }
    }

    function displayCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');

        if (!cartItemsContainer || !cartTotalElement) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
            cartTotalElement.textContent = 'R$ 0,00';
            return;
        }

        let total = 0;
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
                <p>Quantidade: <span class="item-quantity">${item.quantity}</span></p>
                <button class="btn btn-danger remove-item" data-id="${item.id}">Remover</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `R$ ${total.toFixed(2)}`;
        updateCartCount();
    }

    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        saveCart();
        displayCart();
        updateCartCount();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        displayCart();
        updateCartCount();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price').replace(",", "."));
            addToCart(id, name, price);
        });
    });

    document.getElementById('cartItems').addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-item')) {
            const id = e.target.getAttribute('data-id');
            removeFromCart(id);
        }
    });

    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('hidden.bs.modal', function () {
            document.body.style.overflow = '';
        });
    }

    const finalizeButton = document.getElementById('checkoutButton');
    if (finalizeButton) {
        finalizeButton.addEventListener('click', function () {
            window.location.href = 'form.html';
        });
    }

    displayCart();
});
