// Слайдер
const images = document.querySelectorAll('#slider img');
let currentSlide = 0;
setInterval(() => {
    images[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % images.length;
    images[currentSlide].style.display = 'block';
}, 3000);

const productsContainer = document.getElementById("products");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");
const colorSelect = document.getElementById("color-select");
const memorySelect = document.getElementById("memory-select");
const confirmBuyButton = document.getElementById("confirm-buy");
const closeModal = document.querySelector(".close");
const cart = [];
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const closeCartModal = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const addToCartButton = document.getElementById("add-to-cart");
const checkoutButton = document.getElementById("checkout");

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
            purple: "https://content2.rozetka.com.ua/goods/images/big/417137667.jpg"
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

    addToCartButton.onclick = () => {
        cart.push({ ...product, selectedMemory: memorySelect.value, selectedColor: colorSelect.value, finalPrice: currentPrice });
        updateCart();
        closeModalFunction();
    };

    modal.style.display = "block";
}

// Оновлення кошика
function updateCart() {
    cartCount.textContent = cart.length;
    cartItemsContainer.innerHTML = "";
    cart.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.textContent = `${item.name} (${item.selectedMemory}, ${item.selectedColor}) - ${item.finalPrice} грн`;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Закриття модального вікна
closeModal.onclick = closeModalFunction;
function closeModalFunction() {
    modal.style.display = "none";
}

closeCartModal.onclick = () => {
    cartModal.style.display = "none";
};

// Відкриття кошика
cartIcon.addEventListener("click", () => {
    cartModal.style.display = "block";
});

// Оформлення замовлення
checkoutButton.addEventListener("click", () => {
    window.location.href = "payment.html";
});

renderProducts(products);
