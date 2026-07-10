/*
 * Script Name      : TipCalculator.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Reads a bill, tip percent and party size, then shows the split
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : numeric input with defaults and a formatted result

async function askNumber(question, fallback) {
    console.log(`${ANSI.CYAN}${question}${ANSI.RESET}`);
    const raw = (await console.prompt() || '').trim();
    const n = parseFloat(raw);
    return (raw === '' || isNaN(n)) ? fallback : n;
}

const money = (n) => n.toFixed(2);

console.log(`${ANSI.BOLD}Tip Calculator${ANSI.RESET}\n`);

const bill = await askNumber('Bill amount:', 0);
if (bill <= 0) { console.warn('No bill amount entered.'); exit(0); }

const tipPct = await askNumber('Tip percent (blank = 10):', 10);
const people = Math.max(1, Math.round(await askNumber('Split between how many (blank = 1):', 1)));

const tip = bill * (tipPct / 100);
const total = bill + tip;
const perPerson = total / people;

const row = (label, value) =>
    console.log(`  ${ANSI.CYAN}${label.padEnd(14)}${ANSI.RESET}${ANSI.BOLD}${value}${ANSI.RESET}`);

console.log(`\n${ANSI.GREEN}Summary${ANSI.RESET}`);
row('Bill', money(bill));
row('Tip', `${money(tip)} (${tipPct}%)`);
row('Total', money(total));
if (people > 1) row(`Per person`, `${money(perPerson)}  x ${people}`);

console.success('\nEnjoy.');
exit(0);
