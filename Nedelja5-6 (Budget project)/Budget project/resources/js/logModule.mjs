let inputDesc = document.querySelector('.form__description');
let inputVal = document.querySelector('.form__value');

let formContainer = document.querySelector('.form__container');
let suggestions = document.createElement('div');
suggestions.classList.add('form__container--suggestions');

let logs = {
    inc: [],
    exp: [],
};

// Log function constructor
let Log = function(description, value) {
    this.description = description;
    this.value = value;
};

// Method for description self check
Log.prototype.isExisting = function(description) {
    return this.description == description;
};

// Collecting item to logs object in certain array if it is NOT a copy
function collectLog(type, description, value) {
    let desc = description.trim();

    if(logs[type].filter(log => log.isExisting(desc)).length == 0) {
        logs[type].push(new Log(desc, value));
    }
}

// Comparing log data with description input value and generating suggestion list under it
function checkLog(type, input) {
    let str = input.value;
    let include = logs[type].filter(log => log.description.includes(str));

    if(include.length !== 0 || str !== '') {

        if(!formContainer.contains(suggestions)) {
            formContainer.appendChild(suggestions);
        }

        suggestions.innerHTML = '';
        
        include.forEach(log => {
            let logItem = document.createElement('p');
            logItem.classList.add('sugestion');
            logItem.textContent = log.description;

            logItem.addEventListener('click', event => {
                input.value = event.target.textContent;
                inputVal.value = log.value;
                suggestions.innerHTML = '';
            });

            suggestions.appendChild(logItem);
        });
    }
}

// Removing suggestion list for click on any other element expect description input or suggestion list
document.addEventListener('click', event => {
    if(event.target !== inputDesc && event.target !== suggestions) {
        suggestions.innerHTML = '';
    }
});

// Removing suggestion list on input value focus (tab)
inputVal.addEventListener('focus', event => {
    suggestions.innerHTML = '';
});

export let logObj = {
    collectLog,
    checkLog
};