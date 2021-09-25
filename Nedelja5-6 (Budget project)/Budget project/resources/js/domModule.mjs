const displayDate = document.querySelector('.display__date');
const displaySum = document.querySelector('.display__sum');
const displayTotalIncome = document.querySelector('.display__total-income p');
const displayTotalExpense = document.querySelector('.display__total-expenses p');
const displayTotalPercentage = document.querySelector('.display__percent p');

const incList = document.querySelector('.lists-left');
const expList = document.querySelector('.lists-right');

// PRIVATE --------------------------------------------------------------

// Formating number for display (incomes, expenses): 12500 => 12,500.00
function formatNumber(number, type) {
    let strNum, part1, part2, sign;

    number = Math.abs(number); // To avoid double sign on display later
    number = number.toFixed(2); // For getting 2 decimals

    strNum = number.split('.'); // Separating integers and decimals
    part1 = strNum[0];
    part2 = strNum[1];

    // Putting comma before 3rd number from back in integer
    if(part1.length > 3) {
        part1 = part1.slice(0, part1.length - 3) + ',' + part1.slice(part1.length - 3);
    }

    // Deciding what sign needs to be added before number
    if(type === 'inc') {
        sign = '+ ';
    }else {
        sign = '- ';
    }

    return sign + part1 + '.' + part2;
};

// DOM id counters
let domIdIncome = 0;
let domIdExpense = 0;

// Generating and assembling html elements for incomes and expenses
function generateItem(type, des, val) {
    const item = document.createElement('div');
    item.classList.add('item');

    if(type === 'inc') {
        item.id = 'inc-' + domIdIncome;
        domIdIncome++;
    }else if(type === 'exp') {
        item.id = 'exp-' + domIdExpense;
        domIdExpense++;
    }

    const border = document.createElement('div');
    border.classList.add('item__border', 'item__border--green');

    const desc = document.createElement('p');
    desc.classList.add('item__description');
    desc.textContent = des;

    const rightDiv = document.createElement('div');
    rightDiv.classList.add('item__info');

    const value = document.createElement('p');
    value.classList.add('item__value', 'item__value--green');
    value.textContent = formatNumber(val, type);

    const btnDel = document.createElement('button');
    btnDel.classList.add('item__btn-delete', 'item__btn-delete--green');
    btnDel.textContent = 'x';

    item.appendChild(border);
    border.append(desc, rightDiv);
    rightDiv.appendChild(value);

    if(type === 'exp') {
        border.classList.remove('item__border--green');
        border.classList.add('item__border--red');

        btnDel.classList.remove('item__btn-delete--green');
        btnDel.classList.add('item__btn-delete--red');

        value.classList.remove('item__value--green');
        value.classList.add('item__value--red');

        const percentageContainer = document.createElement('div');
        percentageContainer.classList.add('item__percentage');
        const percentage = document.createElement('p');

        percentageContainer.appendChild(percentage);
        rightDiv.appendChild(percentageContainer);
    }

    rightDiv.appendChild(btnDel);

    return item;
};

// PUBLIC ---------------------------------------------------------------

// Generating new date for every initialization of the app
function generateDate() {
    let today, month, year;
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();

    let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    displayDate.textContent = allMonths[month] + ' ' + year;
};

// Adding generated item to specific list in DOM
function addToDom(type, desc, value) {
    let item = generateItem(type, desc, value);

    if(type === 'inc') {
        incList.appendChild(item);
    }else if(type === 'exp') {
        expList.appendChild(item);
    }
};

// Removing item from list in DOM
function deleteFromDom(target) {
    target.parentElement.parentElement.parentElement.remove();
};

// Updating all numbers on the DOM
function updateDisplayNumbers(budget, totalIncome, totalExpense, totalPercentage) {
    let type;
    // Deciding what sign will go in front of the budget label (total of all)
    if(budget > 0) {
        type = 'inc';
    }else {
        type = 'exp';
    }

    displaySum.textContent = formatNumber(budget, type);
    displayTotalIncome.textContent = formatNumber(totalIncome, 'inc');
    displayTotalExpense.textContent = formatNumber(totalExpense, 'exp');
    displayTotalPercentage.textContent = totalPercentage + '%';
};

// Passing expense percentage values from data to coresponding percentage labels on DOM
function updateAllPercentages(percList) {
    let percentageDomList = expList.querySelectorAll('.item__percentage p');
    
    percentageDomList.forEach((p, i) => {
        p.textContent = percList[i] + '%';
    });
};

function changeBtnColor(type, btn) {
    if(type == 'inc') {
        btn.classList.remove('form__btn--red');
        btn.classList.add('form__btn--green');
    }else if(type == 'exp') {
        btn.classList.remove('form__btn--green');
        btn.classList.add('form__btn--red');
    }
}

// Reseting form inputs
function resetInputs(select, inputDescription, inputValue) {
    select.value = 'inc';
    inputDescription.value = '';
    inputValue.value = '';
};


export let domObj = {
    generateDate,
    addToDom,
    deleteFromDom,
    updateDisplayNumbers,
    updateAllPercentages,
    changeBtnColor,
    resetInputs
};