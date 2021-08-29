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

const inputText = document.querySelector('#input-text');
const inputId = document.querySelector('#input-id');
const form = document.querySelector('#form');
const divList = document.querySelector('#list');

let todos = [
    {
        id: 'loaded-1',
        text: 'Already exist 1',
        done: true
    },
    {
        id: 'loaded-2',
        text: 'Already exist 2',
        done: false
    },
    {
        id: 'loaded-3',
        text: 'Already exist 3',
        done: true
    }
]

function paintTask(done, element) {
    if(done) {
        element.classList.add('paint-gold');
        element.classList.remove('paint-white');
    }else {
        element.classList.remove('paint-gold');
        element.classList.add('paint-white');
    }
}

function borderWhite(done, left, right) {
    if(done) {
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
}

function changeTask() {
    let control = false;
    let domTodos = document.querySelectorAll('.task');

    todos.forEach((todo, i) => {
        if(todo.id == inputId.value) {
            todo.text = inputText.value;
            domTodos[i].firstChild.firstChild.textContent = inputText.value;

            domTodos[i].firstChild.nextSibling.firstChild.firstChild.checked = false;
            todo.done = false;
            paintTask(todo.done, domTodos[i]);
            borderWhite(todo.done, domTodos[i].firstChild, domTodos[i].firstChild.nextSibling);

            control = true;
        }
    })

    return control;
}

function addToDom (text, done, id) {
    const task = document.createElement('div');
    task.classList.add('task');

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
    divList.appendChild(task);
    
    if(done === true) {
        checkBox.checked = true;
    }

    btnDelete.addEventListener('click', event => {
        let allBtns = document.querySelectorAll('.toDelete');

        allBtns.forEach((btn, i) => {
            if(event.target == btn) {
                todos.splice(i, 1);
                console.log(todos);

                if(document.querySelectorAll('.task')[i].firstChild.nextSibling.firstChild.firstChild.checked === true) {
                    event.target.parentElement.parentElement.style.background = '#ffcc00';
                }
            }
        });

        event.target.parentElement.parentElement.classList.add('move-out');
        event.target.parentElement.parentElement.classList.add('height-shrink');

        setTimeout(() => {
            event.target.parentElement.parentElement.remove();
        }, 1999);
        
    });

    checkBox.addEventListener('change', event => {
        paintTask(event.target.checked, event.target.parentElement.parentElement.parentElement);
        borderWhite(event.target.checked, event.target.parentElement.parentElement, event.target.parentElement.parentElement.previousElementSibling)
    });

    return [task, leftDiv, rightDiv];
}

todos.forEach(todo => {
    let elements = addToDom(todo.text, todo.done, todo.id);
    paintTask(todo.done, elements[0]);
    borderWhite(todo.done, elements[1], elements[2]);
});

let count = 0;

form.addEventListener('submit', event => {
    event.preventDefault();

    let control = false;

    if(inputId.value != '') {
        control = changeTask();
    }

    if(!control) {
        let item = {id: count++ , text: inputText.value , done: false};
        todos.push(item);
        console.log(todos);

        addToDom(item.text, item.id);
    }

    inputText.value = '';
    inputId.value = '';
});