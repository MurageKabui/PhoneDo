/*
 * Script Name      : MatrixRain.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : The classic "digital rain" animation in the console
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/console , https://docs.phonedo.com/api/sleep
//
// A bounded animation (no infinite loops): COLS columns of falling glyphs for FRAMES frames.

const COLS = 22;
const ROWS = 14;
const FRAMES = 60;
const GLYPHS = 'アイウエオカキクケコサシスセソ0123456789<>=/\\|'.split('');

// Each column has its own "drop" head position and speed.
const drops = Array.from({ length: COLS }, () => ({
    head: Math.floor(Math.random() * ROWS),
    speed: 1 + Math.floor(Math.random() * 2)
}));

const rand = (a) => a[Math.floor(Math.random() * a.length)];

for (let f = 0; f < FRAMES; f++) {
    let screen = '';
    for (let y = 0; y < ROWS; y++) {
        let line = '';
        for (let x = 0; x < COLS; x++) {
            const d = drops[x];
            const dist = (d.head - y + ROWS) % ROWS;
            if (dist === 0)       line += `${ANSI.BOLD}${ANSI.WHITE}${rand(GLYPHS)}${ANSI.RESET}`;
            else if (dist < 4)    line += `${ANSI.GREEN}${rand(GLYPHS)}${ANSI.RESET}`;
            else if (dist < 8)    line += `${ANSI.BLACK}${rand(GLYPHS)}${ANSI.RESET}`;
            else                  line += ' ';
        }
        screen += line + '\n';
    }
    console.clear();
    console.log(screen);
    drops.forEach(d => { d.head = (d.head + d.speed) % ROWS; });
    await sleep(80);
}

console.clear();
console.log(`${ANSI.GREEN}${ANSI.BOLD}Done.${ANSI.RESET}`);
exit(0);
