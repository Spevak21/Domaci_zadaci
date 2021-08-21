let pokemon1 = {
    name: 'Pikachu',
    type: 'Electric',
    abilities: ['Static', 'Lightning Rod', 'Skull Bash', 'Thunder'],
    stats: {
        attack: 55,
        defence: 40,
        speed: 90
    },
    image: 'https://upload.wikimedia.org/wikipedia/sh/7/77/Pikachu.png'
};

let pokemon2 = {
    name: 'Bulbasaur',
    type: 'Grass',
    abilities: ['Vine Whip', 'Leech Seed', 'Razor Leaf', 'Sleep Powder'],
    stats: {
        attack: 49,
        defence: 49,
        speed: 45
    },
    image: 'https://upload.wikimedia.org/wikipedia/sh/thumb/4/43/Bulbasaur.png/654px-Bulbasaur.png'
};

let pokemon3 = {
    name: 'Squirtle',
    type: 'Water',
    abilities: ['Water Gun', 'Water Pulse', 'Rain Dance', 'Aqua Tail'],
    stats: {
        attack: 48,
        defence: 65,
        speed: 43
    },
    image: 'https://upload.wikimedia.org/wikipedia/sh/thumb/e/e3/Squirtle.png/585px-Squirtle.png'
};

let pokemon4 = {
    name: 'Charmander',
    type: 'Fire',
    abilities: ['Ember', 'Fire Fang', 'Flamethrower', 'Inferno'],
    stats: {
        attack: 52,
        defence: 43,
        speed: 65
    },
    image: 'https://upload.wikimedia.org/wikipedia/sh/thumb/5/56/Charmander.png/530px-Charmander.png'
};

let allPokemons = [pokemon1, pokemon2, pokemon3, pokemon4];

//1. Napraviti html strukturu da se na pocetku vide 2 button-a. Kada se klikne na oba (naravno ponaosob), 
//trebaju se izlistati svi pokemoni iz niza u svom dugmetu. Na klik jednog dugmeta, trebaju se izlistati sve informacije o tom pokemonu.

//Osnovna struktura
let div1 = document.createElement('div');
let div2 = document.createElement('div');
div1.classList.add('upper-div');
div2.classList.add('bottom-div');

document.body.append(div1, div2);

const btnPlayer1 = document.createElement('button');
const btnPlayer2 = document.createElement('button');
btnPlayer1.textContent = 'Player1';
btnPlayer2.textContent = 'Player2';

div1.appendChild(btnPlayer1);
div2.appendChild(btnPlayer2);

// Struktura prikaza objekta pokemona (GORNJEG)
const pName = document.createElement('p');
const pType = document.createElement('p');
const pAbilities = document.createElement('p');
const pStats = document.createElement('p');
const pImage = document.createElement('img');
pImage.classList.add('pokemon-image');

const divDisplay = document.createElement('div');
divDisplay.classList.add('display-pokemon');
divDisplay.append(pImage, pName, pType, pAbilities, pStats);

// Struktura prikaza objekta pokemona (DONJEG)
const pName2 = document.createElement('p');
const pType2 = document.createElement('p');
const pAbilities2 = document.createElement('p');
const pStats2 = document.createElement('p');
const pImage2 = document.createElement('img');
pImage2.classList.add('pokemon-image');

const divDisplay2 = document.createElement('div');
divDisplay2.classList.add('display-pokemon');
divDisplay2.append(pImage2, pName2, pType2, pAbilities2, pStats2);

[btnPlayer1, btnPlayer2].forEach(btn => {
    btn.addEventListener('click', event => {
        const divPokemons = document.createElement('div');
        btn.replaceWith(divPokemons);

        allPokemons.forEach(pokemon => {
            const btnPokemon = document.createElement('button');
            btnPokemon.textContent = pokemon.name;
            divPokemons.appendChild(btnPokemon);

            let pomocna;
            if(event.target === btnPlayer1){
                pomocna = 1;
            }else if(event.target === btnPlayer2) {
                pomocna = 2
            }

            btnPokemon.addEventListener('click', event => {
                if(pomocna == 1) {
                    event.target.parentElement.parentElement.appendChild(divDisplay);
                    pImage.src = pokemon.image;
                    pName.textContent = `Name: ${pokemon.name}`;
                    pType.textContent = `Type: ${pokemon.type}`;
                    pAbilities.textContent = `Abilities: ${pokemon.abilities}`;
                    pStats.textContent = `Stats: Attack: ${pokemon.stats.attack} Defence: ${pokemon.stats.defence} Speed: ${pokemon.stats.speed}`;
                }else if(pomocna == 2) {
                    event.target.parentElement.parentElement.appendChild(divDisplay2);
                    pImage2.src = pokemon.image;
                    pName2.textContent = `Name: ${pokemon.name}`;
                    pType2.textContent = `Type: ${pokemon.type}`;
                    pAbilities2.textContent = `Abilities: ${pokemon.abilities}`;
                    pStats2.textContent = `Stats: Attack: ${pokemon.stats.attack} Defence: ${pokemon.stats.defence} Speed: ${pokemon.stats.speed}`;
                }
            })
        })
    })
})