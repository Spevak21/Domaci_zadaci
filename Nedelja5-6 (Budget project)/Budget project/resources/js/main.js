import { dataObj } from "./dataModule.mjs";
import { domObj } from "./domModule.mjs";
import { logObj } from "./logModule.mjs";

const type = document.querySelector('.form__type');
const inputDescription = document.querySelector('.form__description');
const inputValue = document.querySelector('.form__value');
const btnSubmit = document.querySelector('.form__btn');
const listsContainer = document.querySelector('.lists');

domObj.generateDate();

// Main ADD function encapsulating group of functions needed for addition of item on whole app
function addMain() {
    dataObj.addToArrays(type.value, inputDescription.value, Number(inputValue.value));
    domObj.addToDom(type.value, inputDescription.value, Number(inputValue.value));
}

// Main DELETE function encapsulating group of functions needed for removal of item on whole app
function deleteMain(event) {
    let wholeId = event.target.parentElement.parentElement.parentElement.id;
    let idParts = wholeId.split('-');
    let type = idParts[0];

    dataObj.deleteFromArray(type, wholeId);
    domObj.deleteFromDom(event.target);
}

// Main function regarding calculation and update of new values in whole app
function budgetMain() {
    dataObj.calculateBudget();
    let data = dataObj.getNecessaryData();
    domObj.updateDisplayNumbers(data.budget, data.totalIncome, data.totalExpense, data.percentage);
}

// Main function regarding calculation and update of all the percentages on whole app
function percentagesMain() {
    dataObj.calculateAllPercentages();
    let dataPercentageList = dataObj.getPercentagesList();
    domObj.updateAllPercentages(dataPercentageList);
}

// Event Listener for item addition
btnSubmit.addEventListener('click', event => {
    if(inputDescription.value.trim() !== '' && inputValue.value.trim() !== '' && Number(inputValue.value) > 0) {
        addMain();
        budgetMain();
        percentagesMain();

        logObj.collectLog(type.value, inputDescription.value, Number(inputValue.value));

        domObj.resetInputs(type, inputDescription, inputValue);
        domObj.changeBtnColor(type.value, btnSubmit);
    }else {
        console.log('Invalid entry');
    }
});

// Event Listener for item removal
listsContainer.addEventListener('click', event => {
    if(event.target.classList.contains('item__btn-delete')) {
        deleteMain(event);
        budgetMain();
        percentagesMain();
    }
});

// Event Listener for change of submit button style (income - green, expense - red)
type.addEventListener('change', event => {
    domObj.changeBtnColor(event.target.value, btnSubmit);
});

// Event Listener that checks if there are previous entrys with similar description
inputDescription.addEventListener('input', event => {
    logObj.checkLog(type.value, event.target);
});