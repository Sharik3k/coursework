//інформація про товар
const products = [
    {
        id: 1,
        name: "Samsung Galaxy A35",
        brand: "Samsung",
        basePrice: 15399,
        images: {
            black: "https://content.rozetka.com.ua/goods/images/big/417139066.jpg",
            white: "https://content.rozetka.com.ua/goods/images/big/417135781.jpg",
            blue: "https://content.rozetka.com.ua/goods/images/big/417133239.jpg",
            purple: "https://content2.rozetka.com.ua/goods/images/big/417137667.jpg "
        },
        memoryOptions: {
            "64GB": 0,
            "128GB": 1500,
            "256GB": 3000,
        }
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        brand: "Apple",
        basePrice: 47999,
        images: {
            black: "https://content1.rozetka.com.ua/goods/images/big/364827001.jpg",
            white: "https://content.rozetka.com.ua/goods/images/big/364824487.jpg",
            blue: "https://content.rozetka.com.ua/goods/images/big/364623740.jpg",
            purple: "https://content1.rozetka.com.ua/goods/images/big/364623617.jpg"
        },
        memoryOptions: {
            "64GB": 0,
            "128GB": 3000,
            "256GB": 6000,
        }
    },
    {
        id: 3,
        name: "Samsung Galaxy A25",
        brand: "Samsung",
        basePrice: 27999,
        images: {
            black: "https://content.rozetka.com.ua/goods/images/big/405185286.jpg",
            white: "https://content.rozetka.com.ua/goods/images/big/417135781.jpg",
            blue: "https://images.prom.ua/4166602712_w600_h600_4166602712.jpg",
            purple: "https://images.prom.ua/4166602712_w600_h600_4166602712.jpg"
        },
        memoryOptions: {
            "64GB": 0,
            "128GB": 7000,
            "256GB": 10000,
        }
    },
    {
        id: 4,
        name: "iPhone 16",
        brand: "Apple",
        basePrice: 60000,
        images: {
            black: "https://content1.rozetka.com.ua/goods/images/big/468886429.jpg",
            white: "https://content1.rozetka.com.ua/goods/images/big/468886645.jpg",
            blue: "https://content2.rozetka.com.ua/goods/images/big/468888032.jpg",
            purple: "https://content1.rozetka.com.ua/goods/images/big/468887116.jpg"
        },
        memoryOptions: {
            "64GB": 0,
            "128GB": 12000,
            "256GB": 14000,
        }
    }

];

const productsContainer = document.getElementById("products");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");
const colorSelect = document.getElementById("color-select");
const memorySelect = document.getElementById("memory-select");
const confirmBuyButton = document.getElementById("confirm-buy");
const closeModal = document.querySelector(".close");

// Відображення товарів
function renderProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <img src="${product.images.black}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.basePrice} грн</p>
            <button class="buy-button">Купити</button>
        `;
        productElement.querySelector(".buy-button").addEventListener("click", () => openModal(product));
        productsContainer.appendChild(productElement);
    });
}

// Відкриття модального вікна
function openModal(product) {
    let currentPrice = product.basePrice;
    modalImage.src = product.images.black;
    modalDescription.textContent = `Назва: ${product.name}\nЦіна: ${currentPrice} грн`;

    memorySelect.onchange = () => {
        const selectedMemory = memorySelect.value;
        currentPrice = product.basePrice + product.memoryOptions[selectedMemory];
        modalDescription.textContent = `Назва: ${product.name}\nЦіна: ${currentPrice} грн`;
    };

    colorSelect.onchange = () => {
        const selectedColor = colorSelect.value;
        modalImage.src = product.images[selectedColor];
    };

    confirmBuyButton.onclick = () => {
        const selectedColor = colorSelect.value;
        const selectedMemory = memorySelect.value;
        alert(`Ви купили ${product.name} у кольорі ${selectedColor} з пам'яттю ${selectedMemory} за ${currentPrice} грн`);
        modal.style.display = "none";
    };

    modal.style.display = "block";
}

// Закриття модального вікна
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
const cart = [];
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const closeCartModal = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const addToCartButton = document.getElementById("add-to-cart");
const checkoutButton = document.getElementById("checkout");

// Відкриття модального вікна кошика
cartIcon.onclick = () => {
    renderCart();
    cartModal.style.display = "block";
};

// Закриття модального вікна кошика
closeCartModal.onclick = () => cartModal.style.display = "none";

// Додавання товару до кошика
function addToCart(product, selectedColor, selectedMemory, finalPrice) {
    cart.push({ product, selectedColor, selectedMemory, finalPrice });
    cartCount.textContent = cart.length;
    alert(`${product.name} додано до кошика`);
}

// Рендеринг кошика
function renderCart() {
    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.textContent = `${item.product.name}, Колір: ${item.selectedColor}, Пам'ять: ${item.selectedMemory}, Ціна: ${item.finalPrice} грн`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Видалити";
        removeButton.onclick = () => {
            cart.splice(index, 1);
            renderCart();
            cartCount.textContent = cart.length;
        };
        cartItem.appendChild(removeButton);
        cartItemsContainer.appendChild(cartItem);
    });
}

// Обробка оформлення замовлення
checkoutButton.onclick = () => {
    if (cart.length === 0) {
        alert("Ваш кошик порожній!");
    } else {
        alert("Ваше замовлення оформлено!");
        cart.length = 0;
        renderCart();
        cartCount.textContent = 0;
        cartModal.style.display = "none";
    }
};

// Інтеграція з модальним вікном товару
addToCartButton.onclick = () => {
    const selectedColor = colorSelect.value;
    const selectedMemory = memorySelect.value;
    const finalPrice = parseInt(modalDescription.textContent.match(/Ціна: (\d+)/)[1]);
    addToCart(products.find(p => p.name === modalDescription.textContent.match(/Назва: (.+)/)[1]), selectedColor, selectedMemory, finalPrice);
    modal.style.display = "none";
};


// Ініціалізація
renderProducts(products);
