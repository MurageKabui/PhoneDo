/*
 * Script Name      : ProgressBar.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : An animated, color-graded progress bar (redraws by clearing the screen)
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/console , https://docs.phonedo.com/api/sleep
//
// Pattern: clear the console and redraw each frame to animate. The bar changes color as it
// fills: red -> yellow -> green. Copy `drawBar` into your own long-running scripts.

const WIDTH = 30;

function drawBar(percent, label) {
    const filled = Math.round((percent / 100) * WIDTH);
    const color = percent < 34 ? ANSI.RED : percent < 67 ? ANSI.YELLOW : ANSI.GREEN;
    const bar = color + '█'.repeat(filled) + ANSI.RESET + ANSI.BLACK + '░'.repeat(WIDTH - filled) + ANSI.RESET;
    console.log(`${ANSI.BOLD}${label}${ANSI.RESET}`);
    console.log(`[${bar}] ${color}${ANSI.BOLD}${String(percent).padStart(3)}%${ANSI.RESET}`);
}

const steps = ['Connecting...', 'Downloading...', 'Verifying...', 'Installing...', 'Finishing...'];

for (let p = 0; p <= 100; p += 4) {
    console.clear();
    console.log(`${ANSI.CYAN}${ANSI.BOLD}  PhoneDo Installer${ANSI.RESET}\n`);
    const stage = steps[Math.min(steps.length - 1, Math.floor(p / 20))];
    drawBar(p, stage);
    await sleep(90);
}

console.log(`\n${ANSI.BG_GREEN}${ANSI.WHITE}${ANSI.BOLD}  DONE  ${ANSI.RESET} All tasks complete.`);
device.beep();
exit(0);
