import { select } from "./selectionModule.mjs";
import { User, Customer, Admin } from "./usersModule.mjs";
import { Product, Food, Appliance } from "./productsModule.mjs";

let cartList;

class UserDOM {

    constructor() {

    }

    static addUserInterface(user) {
        if(user instanceof Customer) {

            if(select.userContainer.innerHTML === '') {
                const label = document.createElement('h3');
                label.textContent = 'Your cart:';

                cartList = document.createElement('div');
                cartList.classList.add('cart__list');

                select.userContainer.append(label, cartList);
            }else {
                cartList.innerHTML = '';
            }

            user.cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart__item');

                let totalItemPrice = item.product.price * item.addedQty;
                const p1 = document.createElement('p');
                const p2 = document.createElement('p');
                const p3 = document.createElement('p');
                p1.innerHTML = `<span>NAME:</span> ${item.product.name}`;
                p2.innerHTML = `<span>NAME:</span> ${totalItemPrice} dinars`;
                p3.innerHTML = `<span>PCS:</span> ${item.addedQty} <hr>`;

                const btnDelete = document.createElement('button');
                btnDelete.textContent = 'Delete';

                btnDelete.addEventListener('click', () => {
                    user.removeFromCart(item);
                    UserDOM.addUserInterface(user);

                    item.product.addToStock(item.addedQty);
                    ProductDOM.addProductsToDOM(user);
                });

                cartItem.append(p1, p2, p3, btnDelete);
                cartList.appendChild(cartItem);
            });

        }else if(user instanceof Admin) {

            const adminForm = document.createElement('form');
            adminForm.classList.add('admin-form');

            const adminFormSelect = document.createElement('select');
            adminFormSelect.classList.add('admin-form__select');
            adminFormSelect.required = true;
            const optionDefault = document.createElement('option');
            optionDefault.value = '';

            optionDefault.selected = true;
            optionDefault.disabled = true;
            optionDefault.hidden = true;
            optionDefault.textContent = 'Chose product type';

            adminFormSelect.appendChild(optionDefault)

            let productTypes = ['Food', 'Appliance'];
            for (let i = 0; i < productTypes.length; i++) {
                const option = document.createElement('option')
                option.value = productTypes[i];
                option.textContent = productTypes[i];

                adminFormSelect.appendChild(option);
            }

            let expDateOrWarranty;
            adminFormSelect.addEventListener('change', event => {

                if(event.target.value == 'Food') {
                    expDateOrWarranty = document.createElement('input');
                    expDateOrWarranty.classList.add('additional-input');
                    expDateOrWarranty.required = true;
                    expDateOrWarranty.type = 'date';

                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();
                    today = yyyy + '-' + mm + '-' + dd;

                    expDateOrWarranty.min = today;

                    adminForm.childNodes.forEach(node => {
                        if(node.classList.contains('additional-input')) {
                            node.remove();
                        }
                    });
                    
                    adminForm.insertBefore(expDateOrWarranty, btnATP);

                }else if (event.target.value == 'Appliance') {
                    expDateOrWarranty = document.createElement('input');
                    expDateOrWarranty.classList.add('additional-input');
                    expDateOrWarranty.required = true;
                    expDateOrWarranty.type = 'number';
                    expDateOrWarranty.placeholder = 'Enter appliance warranty years';

                    adminForm.childNodes.forEach(node => {
                        if(node.classList.contains('additional-input')) {
                            node.remove();
                        }
                    });
                    
                    adminForm.insertBefore(expDateOrWarranty, btnATP);
                }
            })

            const productName = document.createElement('input');
            productName.classList.add('admin-form__product-name');
            productName.required = true;
            productName.type = 'text';
            productName.placeholder = 'Enter product name';

            const productPrice = document.createElement('input');
            productPrice.classList.add('admin-form__product-price');
            productPrice.required = true;
            productPrice.min = 0;
            productPrice.type = 'number';
            productPrice.placeholder = 'Enter product price';

            const productStock = document.createElement('input');
            productStock.classList.add('admin-form__product-stock');
            productStock.required = true;
            productStock.type = 'number';
            productStock.placeholder = 'Enter product stock quantity';

            const btnATP = document.createElement('input');
            btnATP.classList.add('admin-form__btn-ATP');
            btnATP.type = 'submit';
            btnATP.value = 'Add To Products';

            btnATP.addEventListener('click', event => {
                event.preventDefault();

                if(adminFormValidation(adminFormSelect, productName, productPrice, productStock, expDateOrWarranty)) {
                    return
                }
                console.log( typeof adminFormSelect.value)
                console.log( typeof productName.value)
                console.log( typeof productPrice.value)
                console.log( typeof productStock.value)
                console.log( typeof expDateOrWarranty.value)

                let newProduct;
                let name = productName.value.charAt(0).toUpperCase() + productName.value.substring(1).toLowerCase();

                if(adminFormSelect.value === 'Food') {
                    let expDate = expDateOrWarranty.value.replace(/-/g, '.') + '.';
                    newProduct = new Food(name, productPrice.value, Number(productStock.value), expDate);
                }else if(adminFormSelect.value === 'Appliance') {
                    newProduct = new Appliance(name, Number(productPrice.value), Number(productStock.value), expDateOrWarranty.value);
                }

                Product.addNewProduct(newProduct);
                ProductDOM.addProductsToDOM(user);
                clearAdminForm([adminFormSelect, productName, productPrice, productStock, expDateOrWarranty]);

            });

            adminForm.append(adminFormSelect, productName, productPrice, productStock, btnATP);
            select.userContainer.appendChild(adminForm);

            setTimeout(() => {
            adminForm.classList.add('admin-form--show');
            }, 1000);
        }
    }

    static removeUserInterface() {
        console.log('brisi UI')

        document.querySelector('.admin-form').classList.remove('admin-form--show');

        setTimeout(() => {
            select.userContainer.innerHTML = '';
        
            document.querySelectorAll('.product__item').forEach(product => {
                product.classList.remove('admin');
            })
        }, 1000);
        
    }
}

class ProductDOM {

    constructor() {

    }

    static addProductsToDOM(user) {

        select.productList.innerHTML = '';

        Product.allProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product__item');

            for (const [key, value] of Object.entries(product)) {
                const productInfo = document.createElement('p');
                let tmp = '';

                if(key == 'warranty' && value > 1) {
                    tmp = 'years';
                }else if(key === 'warranty') {
                    tmp = 'year';
                }else if(key === 'price') {
                    tmp = 'dinars';
                }

                productInfo.innerHTML = `<span>${key.toUpperCase()}:</span> ${value} ${tmp}`;
                productItem.appendChild(productInfo);
            }

            if(user instanceof Customer) {
                const inputQuantity = document.createElement('input');
                inputQuantity.type = 'number';
                inputQuantity.placeholder = 'Enter desired quantity';

                const btnATC = document.createElement('button');
                btnATC.textContent = 'Add To Cart';

                btnATC.addEventListener('click', () => {
                    if(product.stock >= Number(inputQuantity.value) && product.stock !== 0 && inputQuantity.value !== '' && Number(inputQuantity.value) >= 1) {
                        user.addToCart(product, Math.round(inputQuantity.value));
                        UserDOM.addUserInterface(user);

                        product.subtractFromStock(Math.round(Number(inputQuantity.value)));
                        ProductDOM.addProductsToDOM(user);
                    }else {
                        console.log('Not enough in stock!');
                    }
                });
    
                productItem.append(inputQuantity, btnATC);
            }

            if(user instanceof Admin) {
                setTimeout(() => {
                    productItem.classList.add('admin');
                }, 500);
                
            }

            select.productList.appendChild(productItem);
        });
    }
}

// Additional custom DOM manupulations ---------------------------------------------------------------------------------------------


function displayCart() {
    cartList.classList.remove('cart-list--hidden');
}

function adminFormValidation(adminFormSelect, productName, productPrice, productStock, expDateOrWarranty) {

    let control = false;

    if(adminFormSelect.value === '') {

        adminFormSelect.classList.add('error')
        setTimeout(() => {
            adminFormSelect.classList.remove('error');
        }, 1000);

        control = true
    }

    if(productName.value.trim() === ''){

        productName.classList.add('error')
        setTimeout(() => {
            productName.classList.remove('error');
        }, 1000);

        control = true
    }

    if(Number(productPrice.value) <= 0 || isNaN(productPrice.value)) {
        
        productPrice.classList.add('error');
        setTimeout(() => {
            productPrice.classList.remove('error');
        }, 1000);

        control = true
    }

    if(Number(productStock.value) <= 0 || isNaN(productStock.value)) {
        
        productStock.classList.add('error');
        setTimeout(() => {
            productStock.classList.remove('error');
        }, 1000);

        control = true
    }

    if(expDateOrWarranty !== undefined) {
        if(expDateOrWarranty.type === 'date') {

            if(expDateOrWarranty.value === '') {
            
                expDateOrWarranty.classList.add('error');
                setTimeout(() => {
                    expDateOrWarranty.classList.remove('error');
                }, 1000);
        
                control = true
            }
    
        }else if(expDateOrWarranty.type === 'number') {
    
            if(expDateOrWarranty.value === '' || Number(expDateOrWarranty.value) <= 0) {
            
                expDateOrWarranty.classList.add('error');
                setTimeout(() => {
                    expDateOrWarranty.classList.remove('error');
                }, 1000);
        
                control = true
            }
        }
    }

    return control;
}

function clearAdminForm(array) {
    array.forEach(input => {
        input.value = '';
    })
}

function toggleLoginForm(user) {

    let inputs = select.loginForm.getElementsByTagName('div');
    console.log(inputs)

    if(user) {

        inputs[0].classList.add('hide');//
        inputs[1].classList.add('hide');//

        setTimeout(() => {
            if(user instanceof Admin) {
                select.loginForm.classList.add('admin');
            }
            select.loginForm.classList.add('form--shrink');//
            
            
    
            setTimeout(() => {
                inputs[0].style.visibility = 'hidden';//
                inputs[1].style.visibility = 'hidden';//
            }, 10);
        }, 500);
        
        setTimeout(() => {
    
            select.userLabel.classList.remove('form__user--hidden');//
            select.userLabel.textContent = select.userName.value;
            // console.log(select.btnSubmit)
            select.btnSubmit.setAttribute('value', 'Log Out');
            
            select.userName.value = '';
            select.userPassword.value = '';
            
        },1000);

    }else if(!user) {
        select.userLabel.classList.add('form__user--hidden');
        
        setTimeout(() => {
            inputs[0].style.visibility = 'visible';
            inputs[1].style.visibility = 'visible';

            setTimeout(() => {
                inputs[0].classList.remove('hide');
                inputs[1].classList.remove('hide');

                select.loginForm.classList.remove('form--shrink');
                select.loginForm.classList.remove('admin');
                select.userLabel.textContent = '';
                

                select.btnSubmit.setAttribute('value', 'Log In');

                setTimeout(() => {
                    
                }, 500);
            }, 10);
        }, 500);

    }  
}

export let DOM = {
    UserDOM,
    ProductDOM,
    displayCart,
    toggleLoginForm
}