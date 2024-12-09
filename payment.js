document.addEventListener("DOMContentLoaded", () => {
const paymentData = JSON.parse(localStorage.getItem("paymentData")) || {
name: "iPhone 16",
price: "1312313"
}
    document.getElementById("payment-form").addEventListener("submit", (event) => {
        event.preventDefault();
        alert(`Оплата ${paymentData.name} на суму ${paymentData.price} грн успішно виконана!`);
        localStorage.removeItem("paymentData");
        window.location.href = "index.html";
        return;
    });
});
