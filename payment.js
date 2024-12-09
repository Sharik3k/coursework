document.addEventListener("DOMContentLoaded", () => {
const paymentData = JSON.parse(localStorage.getItem("paymentData")) || {
<div class="iphone16"> name: "iPhone 16", 
    price: "60000"
    <div/>
    <div class="iphone15pro"> name: "iPhone 15 pro", 
    price: "47999"
    <div/>
    <div class="galaxya35"> name: "Galaxy A35", 
    price: "15399"
    <div/>
    <div class="galaxya25"> name: "Galaxy A25", 
    price: "27999"
    <div/>

}
    document.getElementById("payment-form").addEventListener("submit", (event) => {
        event.preventDefault();
        alert(`Оплата ${paymentData.name} на суму ${paymentData.price} грн успішно виконана!`);
        localStorage.removeItem("paymentData");
        window.location.href = "index.html"
    });
});
