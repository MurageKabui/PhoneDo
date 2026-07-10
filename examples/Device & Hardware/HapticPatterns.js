/*
 * Script Name      : HapticPatterns.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A library of reusable vibration patterns - heartbeat, SOS, ticks and more
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : device.vibrate + sleep
//
// device.vibrate(ms) is fire-and-forget, so we sequence pulses with sleep() to build
// patterns. Copy any pattern function into your own scripts for tactile feedback.

// Play a pattern expressed as [vibrateMs, pauseMs, vibrateMs, pauseMs, ...]
async function play(pattern) {
    for (let i = 0; i < pattern.length; i++) {
        if (i % 2 === 0) device.vibrate(pattern[i]);
        await sleep(pattern[i]);
    }
}

const patterns = [
    { name: 'Heartbeat ', bar: '▏▏  ▏▏',       seq: [90, 120, 90, 700] },
    { name: 'SOS ',       bar: '···---···',    seq: [150,150,150,150,150,450, 400,300,400,300,400,450, 150,150,150,150,150,150] },
    { name: 'Tick-tock ', bar: '· · · ·',      seq: [40, 460, 40, 460, 40, 460, 40, 460] },
    { name: 'Buzzer ',    bar: '▬▬▬▬▬',         seq: [600, 200, 600] },
    { name: 'Ramp up ',   bar: '▁▂▃▄▅▆▇',       seq: [40,120, 80,120, 140,120, 220,120, 320,120, 450] }
];

console.log(`${ANSI.CYAN}${ANSI.BOLD}Haptic Pattern Library${ANSI.RESET}\n`);

for (const p of patterns) {
    console.log(`${ANSI.BOLD}${p.name}${ANSI.RESET}  ${ANSI.MAGENTA}${p.bar}${ANSI.RESET}`);
    await play(p.seq);
    await sleep(800);
}

console.success('\nDone. Reuse play([...]) for your own patterns.');
exit(0);
