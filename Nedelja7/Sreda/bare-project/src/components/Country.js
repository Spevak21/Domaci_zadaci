
const Country = (country)=>{
    const divCountry = document.createElement('div');
    divCountry.classList.add('country');

    const img = document.createElement('img');
    img.classList.add('country-img');
    img.src = country.flag;
    img.alt = `Flag of ${country.name}`;

    const p = document.createElement('p');
    p.textContent = country.name;

    divCountry.append(img, p);

    return divCountry;
}

export default Country