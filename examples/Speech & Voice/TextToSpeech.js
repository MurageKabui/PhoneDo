/*
 * Script Name      : TextToSpeech.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Speaks text aloud and demonstrates rate & pitch control
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/utter
//
// utter.speak(text, rate, pitch, voiceId). rate ~0.1-1.0 (speed), pitch ~0.5-2.0.

console.log(`${ANSI.CYAN}${ANSI.BOLD}Text to Speech${ANSI.RESET}\n`);

console.log('Type something to say (blank = a default line):');
const text = ((await console.prompt()) || 'Hello! I am your PhoneDo assistant.').trim();

const styles = [
    { name: 'Normal',      rate: 0.95, pitch: 1.0 },
    { name: 'Slow & deep', rate: 0.55, pitch: 0.7 },
    { name: 'Fast & high', rate: 1.0,  pitch: 1.6 }
];

for (const s of styles) {
    console.log(`${ANSI.YELLOW}▶${ANSI.RESET} ${ANSI.BOLD}${s.name}${ANSI.RESET}  ${ANSI.BLACK}(rate ${s.rate}, pitch ${s.pitch})${ANSI.RESET}`);
    try {
        await utter.speak(text, s.rate, s.pitch);
    } catch (e) {
        console.error('TTS failed:', e);
        break;
    }
    await sleep(300);
}

// Show how many voices are installed.
try {
    const voices = await utter.getVoices();
    if (Array.isArray(voices)) console.log(`\n${ANSI.GREEN}${voices.length} voice(s) available on this device.${ANSI.RESET}`);
} catch (e) { /* getVoices not supported */ }

console.success('\n✓ Done speaking.');
exit(0);
