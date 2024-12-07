const products = [
    {
        id: 1,
        name: "Samsung Galaxy A35",
        brand: "Samsung",
        price: 15399,
        image: "https://content.rozetka.com.ua/goods/images/big/417139066.jpg"
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        brand: "Apple",
        price: 47999,
        image: "https://content1.rozetka.com.ua/goods/images/big/364827001.jpg"
    },
    {
        id: 3,
        name: "Galaxy A25",
        brand: "Samsung",
        price: 11499,
        image: "https://content.rozetka.com.ua/goods/images/big/405185286.jpg"
    },
    {
        id: 4,
        name: "iPhone 16 Pro Max",
        brand: "Apple",
        price: 49999,
        image: "https://content.rozetka.com.ua/goods/images/big/468886057.jpg"
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
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} грн</p>
            <button class="buy-button">Купити</button>
        `;
        productElement.querySelector(".buy-button").addEventListener("click", () => openModal(product));
        productsContainer.appendChild(productElement);
    });
}

// Відкриття модального вікна
function openModal(product) {
    modalImage.src = product.image;
    modalDescription.textContent = `Назва: ${product.name}\nЦіна: ${product.price} грн`;
    modal.style.display = "block";

    confirmBuyButton.onclick = () => {
        const selectedColor = colorSelect.value;
        const selectedMemory = memorySelect.value;
        alert(`Ви купили ${product.name} у кольорі ${selectedColor} з пам'яттю ${selectedMemory}`);
        modal.style.display = "none";
    };
}

// Закриття модального вікна
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


renderProducts(products);
