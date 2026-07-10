/*
 * Script Name      : RainbowBanner.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Renders text as a scrolling rainbow banner using the ANSI color cycle
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : console + ANSI color cycling + sleep

const RAINBOW = [ANSI.RED, ANSI.YELLOW, ANSI.GREEN, ANSI.CYAN, ANSI.BLUE, ANSI.MAGENTA];

// Color each character, shifting the starting hue by `offset` for an animated effect.
function rainbowize(text, offset) {
    let out = '';
    for (let i = 0; i < text.length; i++) {
        const color = RAINBOW[(i + offset) % RAINBOW.length];
        out += `${color}${ANSI.BOLD}${text[i]}${ANSI.RESET}`;
    }
    return out;
}

const banner = [
    '  ____  _                     ____         ',
    ' |  _ \\| |__   ___  _ __   __| |  _ \\  ___ ',
    ' | |_) | \'_ \\ / _ \\| \'_ \\ / _` | | | |/ _ \\',
    ' |  __/| | | | (_) | | | | (_| | |_| | (_) |',
    ' |_|   |_| |_|\\___/|_| |_|\\__,_|____/ \\___/ '
];

// Animate the hue shift for a bounded number of frames.
for (let frame = 0; frame < 24; frame++) {
    console.clear();
    banner.forEach(line => console.log(rainbowize(line, frame)));
    console.log('\n' + rainbowize('        PhoneDo', frame));
    await sleep(120);
}

exit(0);
