// Napisati validaciju za formu koja sadrzi polja: 
// input-text(name, surname, password, passwordConfirm)                                 CHECKED
// checkbox(courses)                                                                    CHECKED
// select(city)                                                                         CHECKED
// radiobutton(gender)                                                                  CHECKED
// Za polje name => obavezno, minimum 5 karaktera, maksimum 15                          CHECKED
// Za polje surname => obavezno, minimum 5 karaktera, maksimum 20                       CHECKED
// Za polje password => obavezno, minimum 8 karaktera, da sadrzi broj i veliko slovo    CHECKED
// Za polje passwordConfirm => da je isto kao i password                                CHECKED
// Za polje course => obavezno                                                          CHECKED

//klikom na register ako validacija ne prodje ispisati greske ispod polja (za svako polje ponaosob)                             CHECKED
//ako validacija prodje, kreirati objekat user ubaciti ga u niz users i ispisati ga na ekranu (ispisati ceo niz)                CHECKED
//kada se kreira user: 1. ime i prezime mora biti trimovano i setovati samo prvo slovo kao veliko a sva ostala da budu mala     CHECKED
//nakon svakog unosa potrebno je ispisati novog user-a i obrisati sve inpute (staviti ih na pocetne vrednosti)

//HTML I CSS po sopstvenom izboru!!!!!!!!!!!!!!!

const inputName = document.querySelector('#name');
const inputSurname = document.querySelector('#surname');
const inputPassword = document.querySelector('#password');
const inputPasswordConfirm = document.querySelector('#password-confirm');

const check1 = document.querySelector('#check-1');
const check2 = document.querySelector('#check-2');
const check3 = document.querySelector('#check-3');
const check4 = document.querySelector('#check-4');
let checkArray = [check1, check2, check3, check4];

const menu = document.querySelector('#city');

const radio1 = document.querySelector('#gender-male');
const radio2 = document.querySelector('#gender-female');
const radio1Label = document.querySelector('.lRadio-1');
const radio2Label = document.querySelector('.lRadio-2');

const btnSub = document.querySelector('.submit');

const usersContainer = document.querySelector('.users-list');

// Error labels
const labelName = document.querySelector('.lName');
const labelSurname = document.querySelector('.lSurname');
const labelPassword = document.querySelector('.lPassword');
const labelPasswordConfirm = document.querySelector('.lPassword-confirm');
const labelCheckboxes = document.querySelector('.lCheckbox-error');
const labelMenu = document.querySelector('.lCity');
const labelGender = document.querySelector('.lGender');

let allUsers = [];

// Universal length check (NAME, SURNAME and PASSWORD)
function minMaxChar (word, input, errorLabel, min, max) {
    let str = input.value;
    if(str.length < min) {
        input.classList.remove('validated');
        if(word !== 'Password') {
            errorLabel.textContent = `${word} must have more than ${min - 1} characters`;
        }else {
            return `${word} must have more than ${min - 1} characters`;
        }
    }else if(str.length > max){
        input.classList.remove('validated');
        if(word !== 'Password') {
            errorLabel.textContent = `${word} must have less than ${max + 1} characters`;
        }else {
            return `${word} must have less than ${max + 1} characters`;
        }
    }else {
        if(word !== 'Password') {
            input.classList.add('validated');
            errorLabel.textContent = '';
        }else {
            return true;
        }
    }
}

// Password NUMBER check
function checkForNumber(str) {
    let arr2 = str.split('').filter(letter => Number(letter));

    if(arr2.length == 0){
        return 'Password must include atleast one number';
    }else {
        return true;
    }
}

// Password CAPITAL letter check
function checkForCapital(str) {
    if(!(str !== str.toLowerCase())) {
        return 'Password must include atleast one capital letter';
    }else {
        return true;
    }
}

// Password validation (including all 3 validation functions)
function checkPassword() {
    let tmp1 = minMaxChar('Password', inputPassword, labelPassword, 8);
    let tmp2 = checkForNumber(inputPassword.value);
    let tmp3 = checkForCapital(inputPassword.value);

    if(typeof tmp1 == 'boolean' && typeof tmp2 == 'boolean' && typeof tmp3 == 'boolean') {
        inputPassword.classList.add('validated');
        labelPassword.textContent = '';
    }else if(typeof tmp1 == 'string') {
        inputPassword.classList.remove('validated');
        labelPassword.textContent = tmp1;
    }else if(typeof tmp2 == 'string') {
        inputPassword.classList.remove('validated');
        labelPassword.textContent = tmp2;
    }else if(typeof tmp3 == 'string') {
        inputPassword.classList.remove('validated');
        labelPassword.textContent = tmp3;
    }
}

// Password comparison
function isPasswordMatching(password, repeat) {
    if(password !== repeat) {
        inputPasswordConfirm.classList.remove('validated');
        labelPasswordConfirm.textContent = 'Password is not matching';
    }else {
        if(inputPasswordConfirm.value != '') {
            inputPasswordConfirm.classList.add('validated');
        }
        labelPasswordConfirm.textContent = '';
    }
}

// Looking for at least one checked checkbox
function anyChecked() {
    labelCheckboxes.textContent = 'Chose at least one course'
    for (let i = 0; i < checkArray.length; i++) {
        if(checkArray[i].checked) {
            labelCheckboxes.textContent = '';
            break;
        }
    }
}

// Checking if default option is still selected
function selectCity() {
    if(menu.value == 0) {
        labelMenu.textContent = 'Select city';
    }else {
        labelMenu.textContent = '';
    }
}

// Checking if both radio buttons are not checked
function selectGender() {
    if(!radio1.checked && !radio2.checked) {
        labelGender.textContent = 'Select gender';
    }else {
        labelGender.textContent = '';
    }
}

// Fetching all checked courses names (returns string containing names)
function getAllChecked() {
    let allCheckLabels = document.querySelectorAll('.lCheckbox');
    let str = '';
    checkArray.forEach((check, i) => {
        if(check.checked) {
            if(str == ''){
                str = allCheckLabels[i].textContent;
            }else {
                str += ', ' + allCheckLabels[i].textContent;
            }
        }
    })
    return str;
}

// Returning checked radio button's label text content
function getGender() {
    if(radio1.checked) {
        return radio1Label.textContent;
    }else if(radio2.checked) {
        return radio2Label.textContent;
    }
}

function addToArr() {
    if(labelName.textContent == '' && labelSurname.textContent == '' && labelPassword.textContent == '' && labelPasswordConfirm.textContent == '' && labelCheckboxes.textContent == '' && labelMenu.textContent == '' && labelGender.textContent == '') {
        let user = {
            name: inputName.value.trim().charAt(0).toUpperCase() + inputName.value.trim().slice(1).toLowerCase(),
            surname: inputSurname.value.trim().charAt(0).toUpperCase() + inputSurname.value.trim().slice(1).toLowerCase(),
            password: inputPassword.value,
            courses: getAllChecked(),
            city: menu.options[menu.selectedIndex].text,
            gender: getGender()
        }

        allUsers.push(user);

        // Formatiranje console ispisa
        console.log('All user objects:');
        console.log(allUsers);
        console.log('-------------------------------------');
        console.log('Newly created object:');
        console.log(user);
        console.log('-------------------------------------');

        return true;
    }
}

function addToDom() {
    usersContainer.innerHTML = '';
    allUsers.forEach(user => {
        let userDom = `<div class="user">
        <p>Name: ${user.name}</p>
        <p>Surname: ${user.surname}</p>
        <p>Password: ${user.password}</p>
        <p>Courses: ${user.courses}</p>
        <p>City: ${user.city}</p>
        <p>Gender: ${user.gender}</p>
    </div>`

    usersContainer.innerHTML += userDom;
    })
}

function resetInputs() {
    inputName.value = '';
    inputSurname.value = '';
    inputPassword.value = '';
    inputPasswordConfirm.value = '';
    [check1, check2, check3, check4].forEach(check => {
        check.checked = false;
    })
    menu.value = 0;
    radio1.checked = false;
    radio2.checked = false;

    inputName.classList.remove('validated');
    inputSurname.classList.remove('validated');
    inputPassword.classList.remove('validated');
    inputPasswordConfirm.classList.remove('validated');
}

btnSub.addEventListener('click', event => {
    // Validation part
    minMaxChar('Name', inputName, labelName, 5, 15);
    minMaxChar('Surname', inputSurname, labelSurname, 5, 20);
    checkPassword();
    isPasswordMatching(inputPassword.value, inputPasswordConfirm.value);
    anyChecked();
    selectCity();
    selectGender();

    if(addToArr()) {
        btnSub.classList.add('btn-green');
        setTimeout(() => {
            btnSub.classList.remove('btn-green');
        }, 1000);
        addToDom();
        resetInputs();
    }else {
        btnSub.classList.add('btn-red');
        setTimeout(() => {
            btnSub.classList.remove('btn-red');
        }, 1000);
    }
})