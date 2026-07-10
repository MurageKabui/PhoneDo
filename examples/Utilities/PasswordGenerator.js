/*
 * Script Name      : PasswordGenerator.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Generates a strong random password, rates it, and copies it to the clipboard
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : console.prompt + clipboard + a strength meter

const SETS = {
    lower: 'abcdefghijkmnopqrstuvwxyz',      // no l
    upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',       // no I, O
    digit: '23456789',                        // no 0, 1
    symbol: '!@#$%^&*-_=+?'
};

function generate(len) {
    const all = Object.values(SETS).join('');
    // Guarantee at least one of each class, then fill the rest.
    let chars = Object.values(SETS).map(s => s[Math.floor(Math.random() * s.length)]);
    while (chars.length < len) chars.push(all[Math.floor(Math.random() * all.length)]);
    // Shuffle (Fisher-Yates).
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
}

function strength(pw) {
    let score = 0;
    if (pw.length >= 12) score += 2; else if (pw.length >= 8) score += 1;
    if (/[a-z]/.test(pw)) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;
    const levels = [
        { label: 'Weak',   color: ANSI.RED },
        { label: 'Fair',   color: ANSI.YELLOW },
        { label: 'Good',   color: ANSI.YELLOW },
        { label: 'Strong', color: ANSI.GREEN },
        { label: 'Fortress', color: ANSI.GREEN }
    ];
    const idx = Math.min(levels.length - 1, Math.floor(score / 1.4));
    const bars = idx + 1;
    return { ...levels[idx], meter: `${levels[idx].color}${'█'.repeat(bars)}${ANSI.BLACK}${'░'.repeat(5 - bars)}${ANSI.RESET}` };
}

console.log(`${ANSI.CYAN}${ANSI.BOLD}Password Generator${ANSI.RESET}`);
console.log('Length? (8-40, blank = 16):');
let len = parseInt((await console.prompt() || '16').trim(), 10);
if (isNaN(len)) len = 16;
len = Math.max(8, Math.min(40, len));

const pw = generate(len);
const s = strength(pw);

console.log(`\n${ANSI.BG_BLACK}${ANSI.WHITE}${ANSI.BOLD} ${pw} ${ANSI.RESET}`);
console.log(`\nStrength: ${s.meter}  ${s.color}${ANSI.BOLD}${s.label}${ANSI.RESET}  ${ANSI.BLACK}(${len} chars)${ANSI.RESET}`);

try {
    const res = await clipboard.setText(pw);
    if (res === 'OK' || res === true) console.success('\n✓ Copied to clipboard.');
} catch (e) {
    console.warn('\nCould not copy to clipboard.');
}

console.log(`${ANSI.BLACK}Tip: ambiguous characters (0/O, 1/l/I) are excluded on purpose.${ANSI.RESET}`);
exit(0);
