// 1. Napisati funkciju koja ispisuje sve elemente datog niza koji su deljivi sa 5

{
    let x = [1, 5, 98, 235, 8, 34, 25, 12, 30];

    function deljiviSa5(niz) {  // Resenje pomocu obicne funkcije
        let tmp = [];
        niz.forEach(broj => {
            if(!(broj % 5)) {
                tmp.push(broj);
            }
        });
        console.log(tmp);
    }

    deljiviSa5(x);

    console.log(x.filter(broj => !(broj % 5))); // Resenje pomocu filter funkcije

    console.log('------------------------------------------------------------');
}

// 2. Napraviti objekat pokemon koji sadrži sledeće informacije: (Napravite makar 4 različita pokemona)
      // * Ime 
      // * Vrsta 
      // * Sposobnosti (niz sposobnosti pokemona) 
      // * Karakteristike (objekat sa informacijama : napad (broj), odbrana (broj), brzina (broj))

      //(Napraviti niz od ovih objekata)


let pokemon1 = {
    name: 'Pikachu',
    type: 'electric',
    abilities: ['Static', 'Lightning Rod', 'Skull Bash', 'Thunder'],
    stats: {
        attack: 55,
        defence: 40,
        speed: 90
    }
};

let pokemon2 = {
    name: 'Bulbasaur',
    type: 'grass',
    abilities: ['Vine Whip', 'Leech Seed', 'Razor Leaf', 'Sleep Powder'],
    stats: {
        attack: 49,
        defence: 49,
        speed: 45
    }
};

let pokemon3 = {
    name: 'Squirtle',
    type: 'water',
    abilities: ['Water Gun', 'Water Pulse', 'Rain Dance', 'Aqua Tail'],
    stats: {
        attack: 48,
        defence: 65,
        speed: 43
    }
};

let pokemon4 = {
    name: 'Charmander',
    type: 'fire',
    abilities: ['Ember', 'Fire Fang', 'Flamethrower', 'Inferno'],
    stats: {
        attack: 52,
        defence: 43,
        speed: 65
    }
};

let allPokemons = [pokemon1, pokemon2, pokemon3, pokemon4];

// 3. Napraviti funkciju koja prima niz gore napravljenih objekata i vraća jedan niz sposobnosti svih pokemona

function allAbilities(arr) {
    let tmp = [];
    arr.forEach(pokemon => {
        tmp.push(...pokemon.abilities);
    });

    return tmp;
}

console.log(allAbilities(allPokemons));

console.log('------------------------------------------------------------');

////////////////////////////////////////////ZA PETAK////////////////////////////////////
// 4. Sortirati pokemone po brzini, rastuće.

function sortBySpeed(arr) {
    let tmp = [];
    let allSpeeds = [];

    arr.forEach(pokemon => {
        allSpeeds.push(pokemon.stats.speed);
    });

    allSpeeds.sort();

    allSpeeds.forEach(speed => {
        for (let i = 0; i < arr.length; i++) {
            if(speed === arr[i].stats.speed) {
                tmp.push(arr[i].name);
                break;
            }
        }
    });

    return tmp;
}

console.log(sortBySpeed(allPokemons));

console.log('------------------------------------------------------------');

// 5. Napraviti funkciju koja prima niz pokemona, poredi pokemone po jačini i vraća kao pobednika onog koji ima najveću jačinu napada.

function findStrongest(arr) {
    let attackPow = 0;
    let strongestPokemon = '';

    arr.forEach(pokemon => {
        if(pokemon.stats.attack > attackPow) {
            attackPow = pokemon.stats.attack;
            strongestPokemon = pokemon.name;
        }
    });

    return strongestPokemon;
}

console.log(`Najjaci pokemon je: ${findStrongest(allPokemons)}!`);