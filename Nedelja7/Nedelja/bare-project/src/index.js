import Countries from "./components/Countries";
import { getAllCountries } from "./service";
/*
## Апликација за приказ информација о државама

https://restcountries.eu/

    Za domaci kreirati api za drzave koji smo radili na casu
    ispisati sliku, naziv i glavni grad

    prikazati 15 RANDOM drzava

    na klik na zastavu treba da se ukloni prikaz drzava i da se na ekranu izlistaju samo informacije o jednoj dzavi
    slika, naziv, glavni grad, SVI JEZICI, opis, timezone, populacija

    pored informacija o drzavi kreirati i 3 dugmeta (next, back, preview)
    klik na next ispisuje informacije o narednoj drzavi iz niza
    klik na preview ispisuje informacije o predhodnoj drzavi iz niza
    klik na back vraca na punu listu sa umanjenim informacijama
*/


const header = document.querySelector('header')
const main = document.querySelector('main');

// Selecting and displaying random 15 countries
getAllCountries().then(res => {
    let random15 = randomize15(res.data)

    main.append(...Countries(random15));
    console.log(res.data)
    console.log(random15)

    cardClick(random15);
});

// ------------------------------------------- Functions -------------------------------------------

// Collecting random 15 countries and passing array of them
function randomize15(countries) {
    let tmp = [];

    while(tmp.length !== 15) {
        let control = true;
        let randomIndex = Math.floor(Math.random() * countries.length);

        tmp.forEach(country => {

            if(country.name == countries[randomIndex].name) {
                control = false;
            }
        });

        if(control) {
            tmp.push(countries[randomIndex]);
        }
    }

    return tmp
}

// Adding click event listener to all cards that are currently displayed (when card is clicked countryDetails() function is called to isolate card)
function cardClick(countries) {

    let allCards = document.querySelectorAll('.country');

    allCards.forEach(card => {

        card.addEventListener('click', event => {
            header.classList.add('header-show');
            
            countries.forEach(country => {
                if(country.name == card.firstElementChild.nextElementSibling.textContent) {

                    countryDetails(country, countries);
                }
            });
        });
    });
}

// Additional info and styling if country card is isolated on screen
function countryDetails(country, countries15) {

        main.innerHTML = '';
        main.append(...Countries([country])) ;
        

        if(main.childElementCount == 1) {
            main.classList.add('isolated');
        }

        main.firstElementChild.id = 'focused';
        
        let allLanguages = '';
        country.languages.forEach(language => {

            if(allLanguages == '') {
                allLanguages += language.name;
            }else {
                allLanguages += ', ' + language.name;
            }
        });

        let allTimezones = '';
        country.timezones.forEach(timezone => {

            if(allTimezones == '') {
                allTimezones += timezone;
            }else {
                allTimezones += ', ' + timezone;
            }
        });

        main.firstElementChild.lastElementChild.innerHTML += `<br> All lngs: ${allLanguages} <br> Timezone(s): ${allTimezones} <br> Population: ${country.population}`;  
        
        headerUI(country.name, countries15);
}

// Creating button elements in header and adding event listeners on buttons
function headerUI(currentCountryName, countries) {

    header.innerHTML = '';

    const btnPrevious = document.createElement('button');
    btnPrevious.textContent = 'Previous';

    btnPrevious.addEventListener('click', event => {

        countries.forEach(country => {
            if(country.name == currentCountryName) {

                let previousCountryIndex = countries.indexOf(country) - 1;

                if(previousCountryIndex === -1) {
                    previousCountryIndex = 14;
                }

                countryDetails(countries[previousCountryIndex], countries)
            }
        });
    })

    const btnNext = document.createElement('button');
    btnNext.textContent = 'Next';

    btnNext.addEventListener('click', event => {

        countries.forEach(country => {
            if(country.name == currentCountryName) {

                let nextCountryIndex = countries.indexOf(country) + 1;

                if(nextCountryIndex === 15) {
                    nextCountryIndex = 0;
                }

                countryDetails(countries[nextCountryIndex], countries)
            }
        });
    })

    const btnBack = document.createElement('button');
    btnBack.textContent = 'Back';
    btnBack.style.backgroundColor = '#272727';
    btnBack.style.color = '#fff';

    btnBack.addEventListener('click', event => {
        header.classList.remove('header-show');
        console.log('hi')

        main.innerHTML = '';

        main.append(...Countries(countries));
        cardClick(countries);
    })

    header.append(btnBack, btnPrevious, btnNext);
}