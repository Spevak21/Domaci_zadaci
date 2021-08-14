// 1. Napisati funkciju koja vraca najduzi palindrom u datom stringu.
// Napomena: nije potrebno da se ispituje da li je uneti string palindrom, neka se podrazumeva da jeste
// Primer: "HYTBCABADEFGHABCDEDCBAGHTFYW12345678987654321ZWETYGDE"
// Ispis: "12345678987654321"

{
    let x = "HYTBCABADEFGHABCDEDCBAGHTFYW12345678987654321ZWETYGDE";

    function nadjiPalindrom(niz) {
        let tmp = [];
        let najduziPalindrom = [];
        let str = '';

        for(let i = 1; i < niz.length; i++) {
            if(niz[i - 1] === niz[i + 1]) {
                tmp.push(niz[i]);
                let j = 1;

                while(niz[i - j] === niz[i + j]) {
                    tmp.push(niz[i + j]);
                    tmp.unshift(niz[i - j]);
                    j++;
                }
                // console.log(tmp);
            }

            if(najduziPalindrom.length < tmp.length) {
                najduziPalindrom = tmp;
                // console.log('Trenutno najduzi: ' + najduziPalindrom);
            }

            tmp = [];
        }

        for(let i = 0; i < najduziPalindrom.length; i++) {
            str += najduziPalindrom[i];
        }

        if(najduziPalindrom.length === 0) {
            return 'U nizu nema palindroma';
        }

        return str;
    }

    console.log(nadjiPalindrom([...x]));
    console.log('--------------------');
}



// 1. Napisati funkciju koja vrsi sumiranje i mnozenje jednog niza i vratiti te vrednosti u niz

{
    let x = [1, 2, 3, 4, 5, 6];

    function zbirIProizvod(niz) {
        let sum = 0;
        let pro = 1;

        for(let i = 0; i < niz.length; i++) {
            sum += niz[i];
            pro *= niz[i];
        }

        return [sum, pro];
    }

    // let nizRezultata = zbirIProizvod(x) // Ako je potrebno vratiti rezultate u novi niz
    // console.log(nizRezultata);

    x.push(...zbirIProizvod(x)); // Ukloniti spread ako na kraju niza treba zajedno da stoje zbir i proizvod kao jedan clan [.. ,[zbir, proizvod]]
    console.log(x);
    console.log('--------------------');
}

// 2. Napisati funkciju koja iz datog niza izbacuje null, undefined, NaN, 0, "" itd...

{
    let x = [0, 1, NaN, undefined, 2, 3, undefined, 4, [10, 20], '', 'A', false, 0, null, true];

    function removeFalsy(niz) {
        let tmp = [];

        for(let i = 0; i < niz.length; i++) {
            if (niz[i]) {
                tmp.push(niz[i]);
            }
        }

        return tmp
    }

    x = removeFalsy(x);
    console.log(x);
    console.log('--------------------');
}

// 3. За првих 100 бројева исписати:
//        ако је дељив са 3  Fizz, са 5  Buzz, и са оба  FizzBuzz, у супротном Broj
//        Ако је дељив са 3,5,7 - FizzBuzzZazz
//        3,5 - FizzBuzz
//        3,7 - FizzZazz
//        5,7 - BuzzZazz

{
    let a = 100;

    function fizzBuzzZazz(broj) {
        let str = '';
        
        for(let i = 1; i <= broj; i++) {
            str += i + ': '; // Ova linija koda samo sluzi za pracenje broja u terminalu
            if(i % 3 == 0) {
                str += 'Fizz';
            }
            if(i % 5 == 0) {
                str += 'Buzz';
            }
            if(i % 7 == 0) {
                str += 'Zazz';
            }
            if(i % 3 != 0 && i % 5 != 0 && i % 7 != 0) {
                str += i;
            }
            if(i != broj) {
                str += '\n';
            }
        }

        return str;
    }

    console.log(fizzBuzzZazz(a));
    console.log('--------------------');
}

// 5. Izvrsiti inverziju brojeva bez pomocne promenljive. 
//       Pr: x = 5 y = 9
//       Resenje: x = 9 y = 5
//       pom = "ne mozete koristiti"

{
    let x = 5;
    let y = 9;

    x = x + y;  // x = 5 + 9    => x = 14
    y = x - y;  // y = 14 - 9   => y = 5
    x = x - y;  // x = 14 - 5   => x = 9

    console.log(`x = ${x} y = ${y}`);
}