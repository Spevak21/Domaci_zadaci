class Product {
    static allProducts = []
    
    name
    price
    stock

    constructor(name, price, stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // toString() {
    //     return `Name: ${this.name} <br> Price: ${this.price} dinars <br> In stock: ${this.stock}`
    // }

    subtractFromStock(value) {
        this.stock = this.stock - value;
    }

    addToStock(value) {
        this.stock = this.stock + value;
        // console.log('added quantity')
    }

    static addNewProduct(newProduct) {
        let control = true;

        this.allProducts.forEach(product => {
            if(product.name === newProduct.name) {
                this.allProducts.splice(this.allProducts.indexOf(product), 1, newProduct)
                control = false;
            }
        }) 
        
        if(control) {
            this.allProducts.push(newProduct);
        }
    }
}

class Food extends Product {
    expDate

    constructor(name, price, stock, expDate) {
        super(name, price, stock)
        this.expDate = expDate;
    }

    // toString() {
    //     return super.toString() + ` <br> Exp. date: ${this.expDate}`
    // }
}

class Appliance extends Product {
    warranty

    constructor(name, price, stock, warranty) {
        super(name, price, stock)
        this.warranty = warranty
    }

    // toString() {
    //     let year = 'years';
    //     if(this.warranty == 1) {
    //         year = 'year';
    //     }
    //     return super.toString() + ` <br> Warranty: ${this.warranty} ${year}`
    // }
}

Product.allProducts.push(
    new Food('Milk', 100, 10, '21.3.2023.'),
    new Food('Bread', 50, 20, '17.9.2021.'),
    new Appliance('Stove', 30000, 7, '5'),
    new Appliance('Toaster', 5000, 12, '3')
)

export { Product, Food, Appliance }