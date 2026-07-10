/*
 * Script Name      : MorseFlashlight.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Blinks a message in Morse code using the flashlight (mirrored on screen + vibration)
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : flashlight + device.vibrate + console.prompt + sleep
//
// Type a short word and the phone blinks it in Morse: dot = short flash, dash = long flash.
// The torch, the screen and the vibration motor all fire together, so it still "works" even
// if a device has no flashlight (it just won't light up).

const MORSE = {
    a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.', h: '....',
    i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', n: '-.', o: '---', p: '.--.',
    q: '--.-', r: '.-.', s: '...', t: '-', u: '..-', v: '...-', w: '.--', x: '-..-',
    y: '-.--', z: '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
};

const UNIT = 200; // ms - the base Morse time unit

let torchOK = true;
async function torch(on) {
    if (!torchOK) return;
    try { on ? await flashlight.switchOn() : await flashlight.switchOff(); }
    catch (e) { torchOK = false; console.warn('(no flashlight - screen only)'); }
}

async function blink(long) {
    const ms = long ? UNIT * 3 : UNIT;
    console.log(`${ANSI.BG_YELLOW}${ANSI.BLACK}${ANSI.BOLD} ${long ? '▬▬▬' : '●'} ${ANSI.RESET}`);
    device.vibrate(ms);
    await torch(true);
    await sleep(ms);
    await torch(false);
    await sleep(UNIT); // gap between symbols
}

console.log(`${ANSI.CYAN}${ANSI.BOLD}Morse Flashlight${ANSI.RESET}`);
console.log('Enter a short word or phrase to signal:');
const text = ((await console.prompt()) || 'SOS').trim().toLowerCase();

for (const ch of text) {
    if (ch === ' ') { console.log('  (word gap)'); await sleep(UNIT * 4); continue; }
    const code = MORSE[ch];
    if (!code) continue;
    console.log(`\n${ANSI.BOLD}${ch.toUpperCase()}${ANSI.RESET}  ${ANSI.GREEN}${code}${ANSI.RESET}`);
    for (const sym of code) await blink(sym === '-');
    await sleep(UNIT * 2); // gap between letters
}

await torch(false);
console.success('\n✓ Message sent.');
exit(0);
