// Aplikacija TO-DO lista
// Zavrsiti sa casa (26.08.2021) zapocetu aplikaziju za to-do listu koja treba da poseduje sledece funkcionalnosti:
// 1. Podaci iz niza se prikazuju na stranici (lista to-do itema)
// 2. Ima formu/input za unos novih podataka (to-do itema) u niz (automatski se azurira i prikaz na stranici)
// 3. Svaki item sadrzi sledece :
//      - id
//      - opis (desc)
//      - iformaciju da li je uradjen ili ne (done)
// 4. Na stranici za svaki item se prikazuje text - opis i checkbox polje koje menja stanje itema (uradjeno-neuradjeno), 
// kao i dugme za brisanje itema. Kada je item uradjen (done == true) tekst (desc) itema se precrta (ili se na neki drugi 
// nacin naznaci da je item uradjen).

import { dataObj } from "./dataModule.mjs";
import { domObj } from "./domModule.mjs";

const form = document.querySelector('#form');
const inputText = document.querySelector('#input-text');
const inputId = document.querySelector('#input-id');
const divList = document.querySelector('#list');

// Looping and taking care of predefined items in data array
dataObj.data.forEach((task, i) => {
    let elements = domObj.addToDom(task.text, task.done, i+1, divList);
    domObj.paintTask(task.done, elements[0]);
    domObj.borderWhite(task.done, elements[1], elements[2]);

    elements[3].addEventListener('click', event => {
        dataObj.deleteById(i + 1);
        domObj.removeFromDom(event.target, elements[0]);
    });

    elements[4].addEventListener('change', event => {
        dataObj.changeDone(event.target.checked, i + 1);
        domObj.paintTask(event.target.checked, event.target.parentElement.parentElement.parentElement);
        domObj.borderWhite(event.target.checked, event.target.parentElement.parentElement, event.target.parentElement.parentElement.previousElementSibling);
    });
});

form.addEventListener('submit', event => {
    event.preventDefault();

    if(inputText.value.trim() !== '') {
        if(inputId.value === '') {
            let item = {text: inputText.value , done: false};
            let id = dataObj.addToArray(item)
            let elements = domObj.addToDom(item.text, item.done, id, divList);
    
            // Event listener for Delete buttons
            elements[3].addEventListener('click', event => {
                dataObj.deleteById(id);
                domObj.removeFromDom(event.target, elements[0]);
            });

            // Event listener for check boxes
            elements[4].addEventListener('change', event => {
                dataObj.changeDone(event.target.checked, id);
                domObj.paintTask(event.target.checked, event.target.parentElement.parentElement.parentElement);
                domObj.borderWhite(event.target.checked, event.target.parentElement.parentElement, event.target.parentElement.parentElement.previousElementSibling);
            });

        }else if(inputId.value.trim() !== '') {
            let id = Number(inputId.value)
            let item = {id: id ,text: inputText.value , done: false};
            
            if(dataObj.changeById(id, item)) {
                domObj.changeDomTask(id, item.text);
            }
        }
    }

    domObj.resetInputs(inputText, inputId);
});