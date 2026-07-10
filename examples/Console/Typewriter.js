/*
 * Script Name      : Typewriter.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Typewriter text effect using cout() (no-newline print) + sleep()
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/console
//
// `cout(text)` writes without a trailing newline, which lets us print one character at a
// time for a typewriter effect. `console.log` always adds a newline, so we use cout here.

async function type(text, delay = 35, colorPrefix = '') {
    for (const ch of text) {
        cout(colorPrefix + ch + (colorPrefix ? ANSI.RESET : ''));
        await sleep(ch === ' ' ? delay / 2 : delay);
    }
    cout('\n');
}

await type('> Booting PhoneDo terminal', 25, ANSI.GREEN);
await sleep(200);
await type('> Loading modules... OK', 25, ANSI.GREEN);
await sleep(200);
await type('Hello, human. Let\'s build something.', 45, ANSI.BOLD + ANSI.CYAN);
await sleep(200);
await type('Tip: change the delay to speed me up or slow me down.', 20, ANSI.YELLOW);

exit(0);
