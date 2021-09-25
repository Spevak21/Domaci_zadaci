class User {
    static registeredCustomers = []
    
    username
    password

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    checkUser() {
        let control = false;
        let customerIndex;

        registeredCustomers.forEach((customer, i) => {
            if(customer.name == 'admin' && customer.password == 'admin') {
                control = 'admin';
            }
            else if(customer.name == this.name && customer.password == this.password) {
                control = 'customer';
                customerIndex = i;
            }
        });
        return [control, customerIndex];
    }
}

class Customer extends User {
    #cart

    constructor(username, password) {
        super(username, password)
        this.#cart = []
    }

    get cart() {
        return this.#cart
    }

    addToCart(product, quantity) {
        let control = true;

        this.#cart.forEach(cartItem => {

            if(cartItem.product.name == product.name) {

                cartItem.addedQty += Number(quantity);
                control = false;
            }
        });

        if(control) {
            this.#cart.push({product: product, addedQty: quantity});
        }
        
        console.log('Korpa: ----------------------------------------------------')
        console.log(this.#cart)
    }

    removeFromCart(item) {
        this.#cart.splice(this.#cart.indexOf(item), 1);
        console.log('Korpa: ----------------------------------------------------')
        console.log(this.#cart)
    }
}

class Admin extends User {

    constructor(username, password) {
        super(username, password)
    }
}

User.registeredCustomers.push(
    new Admin('a', 'a'),
    new Customer('Jovana', '1'),
    new Customer('Danijel', 'danijel2'),
    new Customer('Tamara', 'tamara3')
)

export { User, Customer, Admin }