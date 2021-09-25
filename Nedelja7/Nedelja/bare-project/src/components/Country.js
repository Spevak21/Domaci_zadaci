
const Country = (country)=>{
    const divCountry = document.createElement('div');
    divCountry.classList.add('country');

    const img = document.createElement('img');
    img.classList.add('country-img');
    img.src = country.flag;
    img.alt = `Flag of ${country.name}`;

    const pCountry = document.createElement('p');
    pCountry.textContent = country.name;

    const pCapital = document.createElement('p');
    pCapital.textContent = `Capital: ${country.capital}`;

    divCountry.append(img, pCountry, document.createElement('hr'), pCapital);

    return divCountry;
}

export default Country