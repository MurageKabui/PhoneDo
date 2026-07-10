/*
 * Script Name      : Stopwatch.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A live stopwatch with lap markers, driven by sleep()
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : sleep + a live-updating console display
//
// Runs for a fixed number of ticks (bounded - no infinite loop), recording a "lap" every
// few seconds and printing a summary at the end.

const TICK_MS = 100;
const TOTAL_TICKS = 100;      // 100 * 100ms = ~10 seconds
const LAP_EVERY_MS = 2500;

const fmt = (ms) => {
    const cs = Math.floor((ms % 1000) / 10);
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / 60000);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
};

console.log(`${ANSI.CYAN}${ANSI.BOLD}Stopwatch${ANSI.RESET}  ${ANSI.BLACK}(runs ~10s)${ANSI.RESET}`);

const start = Date.now();
const laps = [];
let nextLap = LAP_EVERY_MS;

for (let i = 0; i <= TOTAL_TICKS; i++) {
    const elapsed = Date.now() - start;
    console.clear();
    console.log(`${ANSI.CYAN}${ANSI.BOLD}Stopwatch${ANSI.RESET}\n`);
    console.log(`${ANSI.GREEN}${ANSI.BOLD}   ${fmt(elapsed)}${ANSI.RESET}\n`);
    if (elapsed >= nextLap) { laps.push(elapsed); nextLap += LAP_EVERY_MS; device.vibrate(50); }
    laps.forEach((l, idx) => console.log(`   ${ANSI.BLACK}Lap ${idx + 1}:${ANSI.RESET} ${fmt(l)}`));
    if (i < TOTAL_TICKS) await sleep(TICK_MS);
}

console.log(`\n${ANSI.BG_BLUE}${ANSI.WHITE}${ANSI.BOLD}  STOPPED  ${ANSI.RESET} Total: ${fmt(Date.now() - start)}`);
device.beep();
exit(0);
