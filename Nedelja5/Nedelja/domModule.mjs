// Gold/White task styling
function paintTask(isDone, domTask) {
    if(isDone) {
        domTask.classList.add('paint-gold');
        domTask.classList.remove('paint-white');
    }else {
        domTask.classList.remove('paint-gold');
        domTask.classList.add('paint-white');
    }
};
// white/Blue border styling
function borderWhite(isDone, left, right) {
    if(isDone) {
        setTimeout(() => {
            left.classList.add('white-border');
            right.classList.add('white-border');
        }, 200);
    }else {
        setTimeout(() => {
            left.classList.remove('white-border');
            right.classList.remove('white-border');
        }, 200);
    }
};
// Generating and adding task in list div in DOM
function addToDom (text, isDone, id, list) {
    const task = document.createElement('div');
    task.classList.add('task');
    task.id = id;

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');
    const rightDiv = document.createElement('div');
    rightDiv.classList.add('right-div');

    const description = document.createElement('p');
    description.textContent = text;

    const checkDiv = document.createElement('div');
    checkDiv.classList.add('check-div');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    const checkLabel = document.createElement('label');
    checkLabel.textContent = 'Done';

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('toDelete');
    btnDelete.textContent = 'Delete';

    task.append(leftDiv, rightDiv);
    leftDiv.appendChild(description);
    rightDiv.append(checkDiv, btnDelete);
    checkDiv.append(checkBox, checkLabel);
    list.appendChild(task);
    
    if(isDone === true) {
        checkBox.checked = true;
    }

    return [task, leftDiv, rightDiv, btnDelete, checkBox];
};
// Change text in DOM task targeted by id
function changeDomTask(id, text) {
    let domTasks = document.querySelectorAll('.task');
    domTasks.forEach(task => {
        if(task.id == id) {
            task.firstChild.firstChild.textContent = text;
            task.firstChild.nextSibling.firstChild.firstChild.checked = false;
            paintTask(false, task);
            borderWhite(false, task.firstChild, task.firstChild.nextSibling);
        }
    })
};
// Remove DOM task
function removeFromDom(btnDelete, domTask) {
    if(domTask.firstChild.nextSibling.firstChild.firstChild.checked === true) {
        btnDelete.parentElement.parentElement.style.background = '#ffcc00';
    }

    btnDelete.parentElement.parentElement.classList.add('move-out');
    btnDelete.parentElement.parentElement.classList.add('height-shrink');

    setTimeout(() => {
        btnDelete.parentElement.parentElement.remove();
    }, 1999);
};
// Inputs reset
function resetInputs(input1, input2) {
    input1.value = '';
    input2.value = '';
};

export let domObj = {
    paintTask,
    borderWhite,
    addToDom,
    changeDomTask,
    removeFromDom,
    resetInputs
};