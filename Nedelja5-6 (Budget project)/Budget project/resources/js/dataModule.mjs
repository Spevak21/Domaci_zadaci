// PRIVATE --------------------------------------------------------------

let data = {
    allItems: {
        inc: [],
        exp: []
    },
    total: {
        inc: 0,
        exp: 0
    },
    budget: 0,
    percentage: 0,
    idCounters: {
        inc: 0,
        exp: 0
    }
};

// Income function constructor
let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
};

// Expense function constructor
let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = 0;
};

// Method for calculating percentage for given expense
Expense.prototype.calculatePercentage = function(totalInc) {
    if(totalInc > 0) {
        this.percentage = Math.round((this.value / totalInc) * 100);
    }else {
        this.percentage = '/ ';
    }
};

// Method for getting percentage property for given expense
Expense.prototype.getPercentage = function() {
    return this.percentage;
};

// Function for total income or total expense calculation
function calculateTotal(type) {
    let sum = 0;
    data.allItems[type].forEach(item => {
        sum += item.value;
    });
    data.total[type] = sum;
};

// PUBLIC ---------------------------------------------------------------

// Adding new item to according 'allItems' array in data object
function addToArrays(type, description, value) {
    let newItem;
    let id = type + '-' + data.idCounters[type];

    if(type === 'inc') {
        newItem = new Income(id, description, value);
    }else if(type === 'exp') {
        newItem = new Expense(id, description, value);
    }

    data.allItems[type].push(newItem);
    data.idCounters[type]++;
    // console.log(data);
};

// Deleting item from data object targeted by id
function deleteFromArray(type, id) {
    data.allItems[type].forEach((item, i) => {
        if(item.id == id) {
            data.allItems[type].splice(i, 1);
        }
    });
};

// Function for recalculating total income, total expense and expense percentage
function calculateBudget() {
    calculateTotal('inc');
    calculateTotal('exp');

    data.budget = data.total['inc'] - data.total['exp'];

    if(data.total.inc > 0) {
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
    }else {
        data.percentage = '/ ';
    }
};

// Function for fetching necessary data object properties needed for DOM update
function getNecessaryData() {
    return {
        budget: data.budget,
        totalIncome: data.total.inc,
        totalExpense: data.total.exp,
        percentage: data.percentage
    }
};

// Function for recalculating of all individual expenses percentages
function calculateAllPercentages() {
    data.allItems.exp.forEach(expense => {
        expense.calculatePercentage(data.total.inc);
    });
};

// Function for calling percentage method on each expense and collecting percentages and putting them into array
function getPercentagesList() {
    let percentagesArray = data.allItems.exp.map(item => {
        return item.getPercentage();
    });

    return percentagesArray;
};

export let dataObj = {
    addToArrays,
    deleteFromArray,
    calculateBudget,
    getNecessaryData,
    calculateAllPercentages,
    getPercentagesList
};