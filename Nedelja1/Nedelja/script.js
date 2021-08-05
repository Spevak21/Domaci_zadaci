// Data su 4 stringa. 
let string1 = "neki prvi string"
let string2 = "neki drugi string koji je i duzi string"
let string3 = "neki treci string koji je dugacak"
let string4 = "neki cetvrti"
//1. Proveriti koji je string najduzi i ispisati samo njega

if(string1.length > string2.length && string1.length > string3.length && string1.length > string4.length) {
    console.log(string1);
}else if (string2.length > string3.length && string2.length > string4.length) {
    console.log(string2);
}else if (string3.length > string4.length) {
    console.log(string3);
}else {
    console.log(string4);
}

console.log('----------------------------------------------------------------------------');
//2. Ispisati najkraci string koji sadrzi rec "string"

let prvi, drugi, treci, cetvrti;

if(string1.includes('string')) {
    prvi = string1.length;
}else {
    prvi = Infinity;
}

if(string2.includes('string')) {
    drugi = string2.length;
}else {
    drugi = Infinity;
}

if(string3.includes('string')) {
    treci = string3.length;
}else {
    treci = Infinity;
}

if(string4.includes('string')) {
    cetvrti = string4.length;
}else {
    cetvrti = Infinity;
}

let najkracaDuzina = Math.min(prvi, drugi, treci, cetvrti);

if(string1.length === najkracaDuzina) {
    console.log(string1);
}else if(string2.length === najkracaDuzina) {
    console.log(string2);
}else if(string3.length === najkracaDuzina) {
    console.log(string3);
}else {
    console.log(string4);
}

console.log('----------------------------------------------------------------------------');
//3. sastaviti sve stringove bez prve reci "neki" osim ako string sadrzi deo recenice "string koji je", takve stringove izostaviti

let subStr1, subStr2, subStr3, subStr4;

if(!string1.includes('string koji je')) {
    subStr1 = string1.replace('neki ', '');
}else {
    subStr1 = '';
}

if(!string2.includes('string koji je')) {
    subStr2 = string2.replace('neki ', '');
}else {
    subStr2 = '';
}

if(!string3.includes('string koji je')) {
    subStr3 = string3.replace('neki ', '');
}else {
    subStr3 = '';
}

if(!string4.includes('string koji je')) {
    subStr4 = string4.replace('neki ', '');
}else {
    subStr4 = '';
}

console.log(`${subStr1}${subStr2}${subStr3}${subStr4}`);
console.log('----------------------------------------------------------------------------');
//SA CASA ZADACI

//1. Na osnovu kolicine i cene artikla ispisati ukupnu cenu
//Kolicina je zadata u gramima
//cena je zadata po kilogramu

let kolicina = 500;
let cena = 150;
let ukupnaCena;

ukupnaCena = (kolicina / 1000) * cena;
console.log(`Ukupna cena je: ${ukupnaCena}`);

console.log('----------------------------------------------------------------------------');
//2. Dopuniti 4. zadatak sa casa kolicinom novca, i ispisati racun (ako nema dovoljno novca ispisati poruku)

let kolicinaNovca = 200;
let kusur;

if(ukupnaCena < kolicinaNovca) {
    console.log(`Vas kusur je: ${kolicinaNovca - ukupnaCena}`);
}else {
    console.log(`Nemate dovoljno novca!`)
}