/*
 * Script Name      : FortuneCookie.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A crack-the-cookie fortune generator with a framed reveal
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : console + sleep + device.vibrate

const fortunes = [
    'A pleasant surprise is waiting for you.',
    'Your code will compile on the first try today.',
    'The bug you seek is on the line you trust most.',
    'Good things come to those who cache.',
    'A closed door hides an open window.',
    'You will find what you are looking for in the last place you look.',
    'Someone will appreciate your work this week.',
    'Simplicity is the ultimate sophistication.',
    'Take the scenic route - the commit can wait.',
    'Curiosity will lead you somewhere wonderful.'
];

const luckyNumbers = () =>
    Array.from({ length: 5 }, () => 1 + Math.floor(Math.random() * 49))
        .sort((a, b) => a - b).join('  ');

function frame(text) {
    const width = Math.max(text.length, 24) + 4;
    const line = '─'.repeat(width);
    console.log(`${ANSI.YELLOW}┌${line}┐${ANSI.RESET}`);
    // Word-wrap the fortune to the frame width.
    const words = text.split(' ');
    let row = '';
    const flush = () => {
        console.log(`${ANSI.YELLOW}│${ANSI.RESET}  ${ANSI.BOLD}${row.padEnd(width - 4)}${ANSI.RESET}  ${ANSI.YELLOW}│${ANSI.RESET}`);
        row = '';
    };
    for (const w of words) {
        if ((row + ' ' + w).trim().length > width - 4) flush();
        row = (row ? row + ' ' : '') + w;
    }
    if (row) flush();
    console.log(`${ANSI.YELLOW}└${line}┘${ANSI.RESET}`);
}

console.log(`${ANSI.BOLD}Cracking your fortune cookie${ANSI.RESET}`);
for (let i = 0; i < 3; i++) { cout(`${ANSI.YELLOW}.${ANSI.RESET}`); device.vibrate(40); await sleep(400); }
cout('\n\n');

const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
frame(pick);
console.log(`\n${ANSI.CYAN}Lucky numbers:${ANSI.RESET} ${ANSI.BOLD}${luckyNumbers()}${ANSI.RESET}`);

exit(0);
