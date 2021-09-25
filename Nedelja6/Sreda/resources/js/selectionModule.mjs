const loginForm = document.querySelector('.form');
const userName = document.querySelector('#username');
const userPassword = document.querySelector('#password');
const userLabel = document.querySelector('.form__user');
const btnSubmit = document.querySelector('input[type="submit"]');

const userContainer = document.querySelector('.user-container');
const productContainer = document.querySelector('.product-container');
// const cartList = document.querySelector('.cart__list');
const productList = document.querySelector('.product__list');


export let select = {
    loginForm,
    userName,
    userPassword,
    userLabel,
    btnSubmit,
    userContainer,
    productContainer,
    // cartList,
    productList
}