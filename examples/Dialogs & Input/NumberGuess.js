/*
 * Script Name      : NumberGuess.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Guess-the-number game with hot/cold hints, using console.prompt
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : console.prompt + console output + device.vibrate

const secret = 1 + Math.floor(Math.random() * 100);
const MAX_TRIES = 7;

console.log(`${ANSI.CYAN}${ANSI.BOLD}Guess the Number${ANSI.RESET}`);
console.log(`I'm thinking of a number between ${ANSI.BOLD}1${ANSI.RESET} and ${ANSI.BOLD}100${ANSI.RESET}.`);
console.log(`You have ${ANSI.YELLOW}${MAX_TRIES}${ANSI.RESET} tries.\n`);

let won = false;
for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    console.log(`${ANSI.BOLD}Attempt ${attempt}/${MAX_TRIES} - your guess:${ANSI.RESET}`);
    const guess = parseInt((await console.prompt() || '').trim(), 10);

    if (isNaN(guess)) { console.warn('Please type a number.'); attempt--; continue; }

    const diff = Math.abs(guess - secret);
    if (diff === 0) { won = true; break; }

    const dir = guess < secret ? 'higher' : 'lower';
    let heat, color;
    if (diff <= 3)      { heat = 'boiling'; color = ANSI.RED; }
    else if (diff <= 10){ heat = 'warm';   color = ANSI.YELLOW; }
    else if (diff <= 25){ heat = 'cold';   color = ANSI.CYAN; }
    else                { heat = 'freezing'; color = ANSI.BLUE; }

    device.vibrate(diff <= 3 ? 200 : 60);
    console.log(`  Go ${dir}  -  ${color}${heat}${ANSI.RESET}\n`);
}

if (won) {
    console.log(`\n${ANSI.BG_GREEN}${ANSI.WHITE}${ANSI.BOLD}  YOU WON!  ${ANSI.RESET} The number was ${secret}. `);
    device.vibrate(400);
} else {
    console.log(`\n${ANSI.BG_RED}${ANSI.WHITE}${ANSI.BOLD}  OUT OF TRIES  ${ANSI.RESET} It was ${ANSI.BOLD}${secret}${ANSI.RESET}.`);
}
exit(0);
