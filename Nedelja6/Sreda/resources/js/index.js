/* Prodavnica

1. Korisnik unosi username i password i na klik Login dugmeta se kreira objekat klase Kupac.
Klasa kupac sadrzi ime ,sifru i korpu .
Div korpa se prikazuje tek kada se korisnik ulogovao.

2. Na stranici su sve vreme izlistani svi dostupni proizvodi iz niza proizvoda kreiranih klasom Proizvod

jedan proizvod treba da sadrzi naziv , cenu , dostupnu kolicinu 

proizvod moze biti prehrambeni ili bela tehnika

ako je bela tehnika ima i garanciju

ako je prehrambeni ima rok trajanja

3. Korisnik moze da doda proizvod u korpu , ako unese kolicinu vecu od dostupne kolicine ispisati poruku o gresci 
Proizvod iz korpe moze da se obrise klikom na dugme Obrisi iz korpe

DODATNO , NE MORA:
4. Ako je korisnik admin moze da doda nov proizvod */

import { select } from "./selectionModule.mjs";
import { User, Customer, Admin } from "./usersModule.mjs";
import { Product, Food, Appliance } from "./productsModule.mjs";
import { DOM } from "./domModule.mjs";

// console.log(User.registeredCustomers);
// console.log('-----------------------------------------');
// Product.allProducts.forEach(product => console.log(product.toString()))

//-----------------------------------------------------------------------------------

DOM.ProductDOM.addProductsToDOM();
// submitControl = true;

select.loginForm.addEventListener('submit', event => {
    event.preventDefault();

    let loggedUser = User.registeredCustomers.find(user => user.username == select.userName.value && user.password == select.userPassword.value);

    if(loggedUser) {
        console.log(loggedUser)

        DOM.UserDOM.addUserInterface(loggedUser);
        DOM.ProductDOM.addProductsToDOM(loggedUser);

        DOM.toggleLoginForm(loggedUser);
    }else {
        DOM.toggleLoginForm(loggedUser);
        DOM.UserDOM.removeUserInterface();
        // console.log('You are not registered')
    }
});


// Removing focus state because :hover and :focus have same css style therefore style get 'stuck' when unhovering button button after click
select.btnSubmit.addEventListener('click', event => [
    event.target.blur()
]);


// Popraviti vracanje proizvoda iz korpe kada admin izmeni proizvod