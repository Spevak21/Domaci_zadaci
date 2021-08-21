// 1. Napisati funkciju koja na klik dodaje jedan red u tabeli. HTML kreirati proizvoljno.
{
    const btnAdd = document.querySelector('button');
    const table = document.querySelector('table');

    btnAdd.addEventListener('click', event => {
        const tableRow = document.createElement('tr');
        table.appendChild(tableRow);

        for (let i = 0; i < 3; i++) {
            const tableCell = document.createElement('td');
            tableRow.appendChild(tableCell);
        }
    })
}
// 2. Napisati funkciju koja na klik dugmeta vrsi sabiranje 2 broja iz input polja i zbir ispisati na ekranu. HTML kreirati proizvoljno.
// 3. Nadovezivanje na predhodni zadatak. Dodati checkbox polje koje kada je selektovano prikazuje se kalkulator a obrnuto se skloni sa ekrana.
{
    const div = document.createElement('div');
    const inputA = document.createElement('input');
    const inputB = document.createElement('input');
    const btn = document.createElement('button');
    btn.textContent = '+';
    const result = document.createElement('p');

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('checked', true);

    div.append(inputA, inputB, btn, result);
    document.body.append(div, checkBox);

    function saberi(a, b) {
        return Number(a.value) + Number(b.value);
    }

    btn.addEventListener('click', event => {
        result.textContent = 'Rezultat je: ' + saberi(inputA, inputB);
    })

    checkBox.addEventListener('change', event => {
        if(event.target.checked) {
            div.style.visibility = 'visible';
        }else{
            div.style.visibility = 'hidden';
        }
    })
}
