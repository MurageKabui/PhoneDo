/*
 * Script Name      : MenuLauncher.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A native multi-button menu that routes to different mini-actions
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/dialog (custom buttons return their index)
//
// dialog.alert(message, title, kind, buttons[]) resolves the INDEX of the tapped button.
// Each button is { text, kind: 'primary'|'secondary', size: 'sm'|'md'|'lg' }.

const buttons = [
    { text: 'Torch blink', kind: 'primary',   size: 'md' },
    { text: 'Buzz',        kind: 'primary',   size: 'md' },
    { text: 'Beep',        kind: 'primary',   size: 'md' },
    { text: 'Close',          kind: 'secondary', size: 'md' }
];

// Show the menu up to 6 times (bounded loop, never infinite).
for (let round = 0; round < 6; round++) {
    const choice = await dialog.alert('Pick an action:', 'PhoneDo Menu', 'information', buttons);

    if (choice === 0) {
        console.log(`${ANSI.YELLOW}Blinking torch...${ANSI.RESET}`);
        try {
            await flashlight.switchOn();  await sleep(300);
            await flashlight.switchOff();
        } catch (e) { console.warn('No flashlight on this device.'); }
    } else if (choice === 1) {
        console.log(`${ANSI.MAGENTA}Buzzing...${ANSI.RESET}`);
        device.vibrate(250);
    } else if (choice === 2) {
        console.log(`${ANSI.CYAN}Beep!${ANSI.RESET}`);
        device.beep();
    } else {
        break; // Close
    }
    await sleep(250);
}

console.success('Menu closed. ');
exit(0);
