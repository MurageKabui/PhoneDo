/*
 * Script Name      : VoiceEcho.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Listens to your voice, transcribes it, then reads it back aloud
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/utter (speech recognition + TTS)
//
// Requires microphone permission. Speak after the prompt; the phone transcribes what it
// heard, prints the alternatives, and speaks the best match back to you.

console.log(`${ANSI.CYAN}${ANSI.BOLD}Voice Echo${ANSI.RESET}\n`);

try {
    if (!(await utter.canListen())) {
        console.warn('Speech recognition is not available on this device.');
        exit(0);
    }
    if (!(await utter.hasPermission())) {
        console.log('Requesting microphone permission...');
        await utter.requestPermission();
    }

    await utter.speak('Say something after the beep.', 0.95, 1.0);
    device.beep();
    console.log(`${ANSI.YELLOW}Listening...${ANSI.RESET}`);

    const results = await utter.listen({
        language: 'en-US',
        matches: 5,
        showPopup: false
    });

    if (!Array.isArray(results) || results.length === 0) {
        console.warn('I didn\'t catch that.');
        await utter.speak('Sorry, I did not catch that.');
        exit(0);
    }

    console.log(`\n${ANSI.BOLD}I heard:${ANSI.RESET}`);
    results.forEach((r, i) =>
        console.log(`  ${i === 0 ? ANSI.GREEN + '>' : ANSI.BLACK + ' '} ${r}${ANSI.RESET}`));

    const best = results[0];
    console.log(`\n${ANSI.CYAN}Echoing back:${ANSI.RESET} ${ANSI.BOLD}${best}${ANSI.RESET}`);
    await utter.speak(`You said: ${best}`, 0.95, 1.0);
} catch (e) {
    console.error('Voice echo failed:', e);
    exit(1);
}

console.success('\n✓ Done.');
exit(0);
