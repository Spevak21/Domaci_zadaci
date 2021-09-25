import Countries from "./components/Countries";
import { getAllCountries } from "./service";
/*
## Апликација за приказ информација о државама

https://restcountries.eu/

1. Приказују се све државе (основне информације)
    - Застава
    - Име државе
2. Постоји Select за бирање региона
3. Постоји Input за претрагу држава
4. Ако је на страници само једна држава, приказати додатне информације о њој
    - Застава
    - Име државе
    - Име државе на матерњем језику
    - Популација
    - Главни град
    - Интернет домен

Додатно:
5. На страници се приказује највише 7 држава
    - За остале се праве додатне странице (испод приказа)
*/


const body = document.querySelector('body');
const selectContainer = document.querySelector('#select');
const select = document.createElement('select');
selectContainer.appendChild(select);
const inputSearch = document.querySelector('#input-search');
const main = document.querySelector('main');
let footer = document.querySelector('.footer');

// Selecting and displaying all countries
getAllCountries().then(res => {

    main.append(...Countries(res.data)) ;
    // console.log(res.data)
    populateSelect(res.data);

    cardClick(res.data);
});

// ------------------------------------------- Functions -------------------------------------------

// Collecting regions and adding options on select menu
function populateSelect(arr) {

    const optDef = document.createElement('option');
    optDef.selected = true;
    optDef.hidden = true;
    optDef.disabled = true;
    optDef.value = 'default';
    optDef.textContent = 'Choose regions';
    select.appendChild(optDef);

    let tmp = new Set(arr.map(country => country.region))

    tmp.forEach(region => {

        const opt = document.createElement('option');
        
        if(region == '') {
            opt.value = '';
            opt.textContent = 'Others';
        }else {
            opt.value = region;
            opt.textContent = region; 
        }

        select.appendChild(opt)
    });
}

// Filter countries by region
function regionFilter(countries, target) {

    if(target.value === 'default') {
        return countries; // If on default passing filtered countries by input filter
    }

    return countries.filter(country => country.region == target.value);
}

// Filter countries by input entry
function inputFilter(countries, target) {

    return countries.filter(country => (country.name.toLowerCase()).includes(target.value.toLowerCase()));
}

// Additional info and styling if country card is isolated on screen
function countryFocus(country, control = false) {

    if(main.childElementCount === 1 || control) {

        if(control) {
            main.innerHTML = '';
            main.append(...Countries([country])) ;
        }

        if(main.childElementCount == 1) {
            main.classList.add('isolated');
        }

        main.firstElementChild.id = 'focused';
        main.firstElementChild.lastElementChild.style.marginBottom = '10px';

        let p = document.createElement('p');
        p.style.marginTop = '10px';
        p.innerHTML = `Native name: ${country.nativeName} <br> Population: ${country.population} <br> Capital: ${country.capital} <br> Internet domain(s): ${country.topLevelDomain}`
        main.firstElementChild.append(document.createElement('hr'), p);

        if(footer !== null) {
            footer.remove();
        }
    }
}

// Limitting 7 countries per page and adding pagination on bottom of the page
function limit7(countries) {

    if(countries.length) {

        if(footer !== null) {
            footer.remove();
        }
    
        if(countries.length > 7) {
    
            let number = Math.ceil(countries.length / 7);
    
            footer = document.createElement('div');
            footer.classList.add('footer');

            for (let i = 0; i < number; i++) {

                const pageButton = document.createElement('button');
                pageButton.textContent = i + 1;
                footer.appendChild(pageButton);
    
                pageButton.addEventListener('click', event => {
                    let tmp = [];
                    let num = i*7;
    
                    for (let j = num; j < num + 7; j++) {
                        if(countries[j] !== undefined) {
                            tmp.push(countries[j]);
                        }
                    }
    
                    main.innerHTML = '';
                    main.append(...Countries(tmp));
                    cardClick(tmp);

                    countryFocus(tmp[0]);
                });
            }
    
            body.appendChild(footer);
        }
    }
}

// Adding click event listener to all cards that are currently displayed (when card is clicked input is filled with country name and countryFocus() function is called to isolate card)
function cardClick(countries) {

    let allCards = document.querySelectorAll('.country');

    allCards.forEach(card => {

        card.addEventListener('click', event => {

            countries.forEach(country => {
                if(country.name == card.lastElementChild.textContent) {

                    inputSearch.value = country.name;
                    countryFocus(country, true);
                }
            });
        });
    });
}

// ------------------------------------------- Event Listeners -------------------------------------------

// Trigger for filter on region choice
select.addEventListener('change', event => {

    getAllCountries().then(res => {

        let tmp = regionFilter(res.data, event.target);
        tmp = inputFilter(tmp, inputSearch);

        main.innerHTML = '';
        let tmp2 = tmp.slice(0, 7)
        main.append(...Countries(tmp2));

        countryFocus(tmp[0]);

        limit7(tmp);
        
        cardClick(res.data);
    });
});

// Trigger for filter on input change
inputSearch.addEventListener('input', event => {

    getAllCountries().then(res => {

        let tmp = inputFilter(res.data, event.target);
        tmp = regionFilter(tmp, select);
        
        main.innerHTML = '';
        let tmp2 = tmp.slice(0, 7)
        main.append(...Countries(tmp2));

        countryFocus(tmp[0]);

        limit7(tmp);

        if(event.target.value == '' && select.value == 'default') { // if no region is selected uppon deleting entry from the input user can still see all the countries on one page (the only case)
            main.append(...Countries(tmp));
            footer.remove();
        }

        cardClick(res.data);
    });
});

// If only one country card is displayed, click on background exits to filtered by region display
main.addEventListener('click', event => {
    
    if(main.childElementCount == 1 && event.target == main) {
        inputSearch.value = '';

        getAllCountries().then(res => {

            if(select.value !== 'default'){
                let tmp = regionFilter(res.data, select);
                tmp = inputFilter(tmp, inputSearch);
        
                main.innerHTML = '';
                let tmp2 = tmp.slice(0, 7)
                main.append(...Countries(tmp2));
        
                countryFocus(tmp[0]);
        
                limit7(tmp);

                cardClick(res.data);
            }else {

                main.innerHTML = '';
                main.append(...Countries(res.data));

                cardClick(res.data);
            }
        });
    }
})