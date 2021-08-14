/*--------------------
Nacrtati dijamant kao na primeru:

     *
    ***
   *****
  *******
 *********
  *******
   *****
    ***
     *

---------------------*/

function dijamant(N) {
    for (let i = 0; i < N; i++) {
        console.log(' '.repeat(N - i - 1) + '*'.repeat(2 * i + 1));
    }
    for (let i = 0; i < N - 1; i++) {
        console.log(' '.repeat(i + 1) + '*'.repeat(2 * N - (2 * i + 3)));
    }
}

dijamant(5);