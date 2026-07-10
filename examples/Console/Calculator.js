/*
 * Script Name      : Calculator.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : An interactive calculator loop reading expressions from the prompt
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : console.prompt in a bounded loop with parsing and error handling
//
// Type expressions like:  12 + 5   or   8*4   or   100 / 7
// Type q to quit. Runs for up to 15 entries.

function compute(a, op, b) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return b === undefined ? NaN : a * b;
        case '/': return b === 0 ? Infinity : a / b;
        default:  return NaN;
    }
}

console.log(`${ANSI.BOLD}Calculator${ANSI.RESET}  ${ANSI.BLACK}(type q to quit)${ANSI.RESET}\n`);

for (let i = 0; i < 15; i++) {
    console.log(`${ANSI.CYAN}expr>${ANSI.RESET}`);
    const raw = (await console.prompt() || '').trim();

    if (raw.toLowerCase() === 'q' || raw === '') break;

    // Accept "a op b" with or without spaces around the operator.
    const m = raw.match(/^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/);
    if (!m) {
        console.warn('  Could not parse. Use: number operator number, e.g. 12 + 5');
        continue;
    }

    const a = parseFloat(m[1]);
    const op = m[2];
    const b = parseFloat(m[3]);
    const result = compute(a, op, b);

    if (!isFinite(result)) {
        console.error(`  = ${op === '/' ? 'cannot divide by zero' : 'invalid'}`);
    } else {
        console.log(`  ${ANSI.GREEN}= ${ANSI.BOLD}${Number(result.toFixed(6))}${ANSI.RESET}`);
    }
}

console.success('\nDone.');
exit(0);
