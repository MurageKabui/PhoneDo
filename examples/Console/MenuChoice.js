/*
 * Script Name      : MenuChoice.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A numbered text menu driven entirely by prompt input
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : console.prompt for menu-style branching (no native dialogs)

const items = [
    { key: '1', label: 'Beep',           run: () => device.beep() },
    { key: '2', label: 'Vibrate',        run: () => device.vibrate(250) },
    { key: '3', label: 'Show the time',  run: () => console.log('  ' + new Date().toLocaleTimeString()) },
    { key: '4', label: 'Roll a die',     run: () => console.log('  You rolled ' + (1 + Math.floor(Math.random() * 6))) },
    { key: '0', label: 'Quit',           run: null }
];

function draw() {
    console.log(`\n${ANSI.BOLD}${ANSI.CYAN}Main Menu${ANSI.RESET}`);
    for (const it of items) {
        console.log(`  ${ANSI.YELLOW}${it.key}${ANSI.RESET}) ${it.label}`);
    }
    console.log(`${ANSI.CYAN}Choose:${ANSI.RESET}`);
}

for (let i = 0; i < 25; i++) {
    draw();
    const choice = (await console.prompt() || '').trim();
    const item = items.find(it => it.key === choice);

    if (!item) { console.warn('  Not a valid option.'); continue; }
    if (item.run === null) break; // Quit

    item.run();
}

console.success('\nMenu closed.');
exit(0);
