/*
Zadatak
Treba implementirati simulaciju kupovine.

U kupovini najpre postoje grupe proizvoda (ProductGroup), svaka grupa ima sledeca polja:
    - title (naziv grupe, string koji nije prazan)
    - vat (Value Added Tax ili na srpskom PDV, decimalni broj veci od nule manji od 100
        predstavlja visinu PDV-a izrazenog u procentima koju ima svaki proizvod koji pripada grupi)

Tu su i proizvodi (Product), svaki proizvod karakterise sledece:
    - barCode (Bar kod proizvoda, celobrojna vrednost koja je veca od nule)
    - title (naziv proizvoda, string koji nije prazan)
    - price (decimalna vrednost veca od nule, predstavlja cenu proizvoda BEZ PDV-a!!!!!!)
    - group (polje koje ukazuje na grupu kojoj proizvod pripada)

Prilikom kupovine kreira se korpa (ShoppingCart) koja sadrzi stavke (ShoppingCartItem).
Svaka korpa (ShoppingCart)  u sebi moze da ima vise stavki (ShoppingCartItem - a) i cuva ih u atributu "items".

Svaka stavka korpe (ShoppingCartItem) sadrzi sledece:
    - product (polje koje ukazuje na proizvod)
    - quantity (decimalna vrednost veca od nule, koja ukazuje na kolicinu proizvoda u korpi)

Svaka korpa (ShoppingCart) treba da ima sledecu funkcionalnost:
    - addProduct(product, quantity = 1) - metoda kojom se neki proizvod (product)
        dodaje u korpu za odredjenu kolicinu (quantity). Prilikom dodavanja u korpu, ukoliko proizvod
        nije ranije bio dodat kreira se nova stavka korpe (ShoppingCartItem) i upisuje se kolicina koja se dodaje.
        Ukoliko je proizvod ranije vec dodat u korpu, u stavci na kojoj se nalazi proizvod uvecava se postojeca kolicina za onu koju dodajemo.

Na kraju kupovine odlazi se na kasu (Checkout).
Kasa (Checkout) ima mogucnost da stampa fiskalni racun za korpu kroz sledecu funkcionalnost:
    - printCheck(shoppingCart)
Fiskalni racun se stampa u HTML tabeli koja ima sledeci format (data vam je html struktura sa tabelom samo sa hederom):

*********************************************************************************************
Prod Group	        Product	                Price	        Quantity	    VAT	    Subtotal
Mlecni proizvodi	Mleko	                100	            2	            20	    200
Mlecni proizvodi	Pavlaka	                50	            2	            10	    100
Bezalkoholno pice	Sok od pomorandze 1l	120	            6	            40  	720
Sveze meso	        Juneci but kg	        800	            0.5	            30	    400
Konditori	        Cokolada Milka 300g	    280	            3	            100	    840

VAT/TOTAL	200/2260
*********************************************************************************************

Jedan red u tabeli predstavlja jednu stavku iz korpe.
U koloni "Prod. Group" se upisuje naziv grupe proizvoda.
U koloni "Product" se upisuje naziv proizvoda.
U koloni "Price" upisuje se cena po komadu SA PDV-om!!!
U koloni "Quantity" upisuje se kolicina proizvoda u korpi tj stavci korpe.
U koloni "VAT" upisuje se ukupan porez za unetu kolicinu proizvoda
U kolonu "Subtotal" upisuje se ukupan iznos za unetu kolicinu proizvoda.

Nakon ispisa stavki tabele u tfoot-u tabele ispisuje se ukupan porez i ukupnan iznos za celu korpu, u poslednje dve kolone.

Kreirati dve grupe proizvoda i 4 proizvoda.
Kreirati jednu korpu.
Dodati svaki proizvod u korpu vise puta.
Kreirati kasu i prikazati fiskalni racun.
*/

//------------------------------------------------------------------------------------------------------------------------

const container = document.querySelector('.container');
const tableBody = document.querySelector('.tbody');

class ProductGroup {
    title       // string != ''
    vat         // decimalan broj > 0 && < 100 (PDV u %)

    constructor(title, vat) {

        if(title.trim() !== '' && vat > 0 && vat <= 100) {
            this.title = title;
            this.vat = vat;
        }else{
            console.log('Wrong input for Product Group');
        }
    }
}

class Product {
    barCode     // ceo broj > 0
    title       // strin != 0
    price       // decimalan broj > 0 (bez PDV)
    group       // ukazuje kojoj grupi pripada proizvod (object)

    constructor(barCode, title, price, group) {

        if(barCode > 0 && title.trim() !== '' && price > 0 && group.constructor === ProductGroup) {
            this.barCode = barCode;
            this.title = title;
            this.price = price;
            this.group = group;
        }else{
            console.log('Wrong input for Product');
        }
    }
}

class ShoppingCart {
    items = []  // niz shopping itema (objects)

    constructor() {

    }

    addProduct(product, quantity = 1) {     // Dodaje novi item ako ne postoji vec takav proivod ili dodaje na kolicinu vec postojeceg item-a

        if(product.constructor === Product && quantity > 0) {
            let control = false;

            this.items.forEach(item => {
                if(item.product.barCode == product.barCode) {
                    item.quantity += quantity;
                    control = true;
                }
            });

            if(!control) {
                let item = new ShoppingCartItem(product, quantity);
                this.items.push(item);
            }
        }else{
            console.log('Wrong input while adding product to cart');
        }
    }
}

class ShoppingCartItem {
    product     // ukazuje na proizvod (object)
    quantity    // decimalan broj > 0

    constructor(product, quantity) {

        if(product.constructor == Product && quantity > 0) {
            this.product = product;
            this.quantity = quantity;
        }else{
            console.log('Wrong input for Cart Item');
        }
    }
}

class Checkout {

    constructor() {

    }

    static printCheck(cart) {

        if(container.querySelector('.total') !== null) {
            container.querySelector('.total').remove();
            tableBody.innerHTML = '';
        }

        let totalVat = 0;
        let totalPrice = 0;

        cart.items.forEach((item, i) => {

            const tableRow = document.createElement('tr');
            // tableRow.classList.add('table-row--' + i);

            let vatPrice = item.product.price * item.quantity * item.product.group.vat;
            let subTotal = item.product.price * item.quantity;
            totalVat += vatPrice;
            totalPrice += subTotal;

            let propertiesForDisplay = [item.product.group.title, item.product.title, item.product.price, item.quantity, vatPrice, subTotal]

            for (let j = 0; j < propertiesForDisplay.length; j++) {
                const tableCell = document.createElement('td');
                tableCell.textContent = propertiesForDisplay[j];
                tableRow.appendChild(tableCell);
            }

            tableBody.appendChild(tableRow);
        });

        const vatAndTotal = document.createElement('p');
        vatAndTotal.classList.add('total');
        vatAndTotal.textContent = 'VAT/TOTAL: ' + totalVat + ' / ' + totalPrice
        container.appendChild(vatAndTotal);
    }
}

// Kreiranje grupa 
let pGroup1 = new ProductGroup('Mlecni proizvodi', .15);
let pGroup2 = new ProductGroup('Meso', .2);
console.log(pGroup1, pGroup2);

// Kreiranje proizvoda
let product1 = new Product('1101010010', 'Pilece meso 1kg', 350, pGroup2);
let product2 = new Product('1001110110', 'Svinjsko meso 1kg', 400, pGroup2);
let product3 = new Product('0101111010', 'Pavlaka 700g', 180, pGroup1);
let product4 = new Product('0011001100', 'Mleko 1l', 120, pGroup1);
console.log(product1, product2, product3, product4) //  Pitati zasto se binarni ispis barkoda menja u conzoli kada broj pocinje sa 0 (ako nije u string vec broj)

// Kreiranje korpe
let cart = new ShoppingCart();

document.querySelector('.btn-print').addEventListener('click', event => {
    
    cart.addProduct(product1, 5);
    cart.addProduct(product2);
    cart.addProduct(product3, 2);
    cart.addProduct(product4, 1);

    cart.addProduct(product1);
    cart.addProduct(product2, 2);
    cart.addProduct(product3);
    cart.addProduct(product4);

    console.log(cart);

    Checkout.printCheck(cart);
});