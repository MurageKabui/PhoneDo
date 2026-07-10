/*
 * Script Name      : AnsiPalette.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A full tour of the ANSI colors and text styles available in the console
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/console#ansi
//
// A reference card you can keep around: every foreground color, background color and text
// style, plus a few reusable badge helpers.

const FG = {
    BLACK: ANSI.BLACK, RED: ANSI.RED, GREEN: ANSI.GREEN, YELLOW: ANSI.YELLOW,
    BLUE: ANSI.BLUE, MAGENTA: ANSI.MAGENTA, CYAN: ANSI.CYAN, WHITE: ANSI.WHITE
};
const BG = {
    BG_BLACK: ANSI.BG_BLACK, BG_RED: ANSI.BG_RED, BG_GREEN: ANSI.BG_GREEN,
    BG_YELLOW: ANSI.BG_YELLOW, BG_BLUE: ANSI.BG_BLUE, BG_MAGENTA: ANSI.BG_MAGENTA,
    BG_CYAN: ANSI.BG_CYAN, BG_WHITE: ANSI.BG_WHITE
};
const STYLE = {
    BOLD: ANSI.BOLD, ITALIC: ANSI.ITALIC, UNDERLINE: ANSI.UNDERLINE,
    INVERSE: ANSI.INVERSE, STRIKETHROUGH: ANSI.STRIKETHROUGH
};

console.log(`${ANSI.BOLD}${ANSI.CYAN}╔══════════════════════════════════╗${ANSI.RESET}`);
console.log(`${ANSI.BOLD}${ANSI.CYAN}║        ANSI STYLE PALETTE        ║${ANSI.RESET}`);
console.log(`${ANSI.BOLD}${ANSI.CYAN}╚══════════════════════════════════╝${ANSI.RESET}`);

console.log(`\n${ANSI.BOLD}Foreground colors${ANSI.RESET}`);
for (const [name, code] of Object.entries(FG)) {
    console.log(`  ${code}${name.padEnd(9)}${ANSI.RESET} the quick brown fox`);
}

console.log(`\n${ANSI.BOLD}Background colors${ANSI.RESET}`);
for (const [name, code] of Object.entries(BG)) {
    console.log(`  ${code}${ANSI.BLACK} ${name.padEnd(10)} ${ANSI.RESET}`);
}

console.log(`\n${ANSI.BOLD}Text styles${ANSI.RESET}`);
for (const [name, code] of Object.entries(STYLE)) {
    console.log(`  ${code}${name}${ANSI.RESET}`);
}

console.log(`\n${ANSI.BOLD}Ready-made badges (copy these!)${ANSI.RESET}`);
const badge = (bg, label) => `${bg}${ANSI.WHITE}${ANSI.BOLD} ${label} ${ANSI.RESET}`;
console.log('  ' + badge(ANSI.BG_GREEN, 'SUCCESS') + ' Saved to disk');
console.log('  ' + badge(ANSI.BG_RED, ' ERROR ') + ' Connection refused');
console.log('  ' + badge(ANSI.BG_YELLOW, ' WARN  ') + ' Battery low');
console.log('  ' + badge(ANSI.BG_BLUE, ' INFO  ') + ' 3 updates available');

console.success('\n✓ Palette printed.');
exit(0);
