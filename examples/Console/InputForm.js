/*
 * Script Name      : InputForm.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Collects several fields with validation, then prints a summary card
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : console.prompt for sequential, validated input

async function ask(question) {
    console.log(`${ANSI.CYAN}${question}${ANSI.RESET}`);
    return (await console.prompt() || '').trim();
}

// Ask repeatedly until the validator passes, or give up after a few tries.
async function askValid(question, validate, tries = 3) {
    for (let i = 0; i < tries; i++) {
        const value = await ask(question);
        const error = validate(value);
        if (!error) return value;
        console.warn('  ' + error);
    }
    return null;
}

console.log(`${ANSI.BOLD}Registration${ANSI.RESET}\n`);

const name = await askValid('Your name:', v => v.length < 2 ? 'Name is too short.' : '');
const ageStr = await askValid('Your age:', v => (!/^\d+$/.test(v) || +v < 1 || +v > 120) ? 'Enter a number 1-120.' : '');
const email = await askValid('Email:', v => !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? 'That does not look like an email.' : '');

if (!name || !ageStr || !email) {
    console.error('\nForm cancelled - too many invalid entries.');
    exit(1);
}

// Summary card
const rows = [['Name', name], ['Age', ageStr], ['Email', email]];
const width = Math.max(...rows.map(r => r[0].length + r[1].length)) + 6;
const line = '-'.repeat(width);

console.log(`\n${ANSI.GREEN}+${line}+${ANSI.RESET}`);
for (const [k, v] of rows) {
    const pad = width - (k.length + v.length) - 3;
    console.log(`${ANSI.GREEN}|${ANSI.RESET} ${ANSI.BOLD}${k}:${ANSI.RESET} ${v}${' '.repeat(Math.max(0, pad))} ${ANSI.GREEN}|${ANSI.RESET}`);
}
console.log(`${ANSI.GREEN}+${line}+${ANSI.RESET}`);
console.success('\nSaved.');

exit(0);
