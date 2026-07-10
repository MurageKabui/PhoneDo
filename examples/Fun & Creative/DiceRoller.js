/*
 * Script Name      : DiceRoller.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Roll two ASCII dice with a shuffling animation, haptic feedback and a prompt to reroll
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : console + sleep + device.vibrate + console.prompt

const FACES = {
    1: ['┌─────────┐', '│         │', '│    ●    │', '│         │', '└─────────┘'],
    2: ['┌─────────┐', '│  ●      │', '│         │', '│      ●  │', '└─────────┘'],
    3: ['┌─────────┐', '│  ●      │', '│    ●    │', '│      ●  │', '└─────────┘'],
    4: ['┌─────────┐', '│  ●   ●  │', '│         │', '│  ●   ●  │', '└─────────┘'],
    5: ['┌─────────┐', '│  ●   ●  │', '│    ●    │', '│  ●   ●  │', '└─────────┘'],
    6: ['┌─────────┐', '│  ●   ●  │', '│  ●   ●  │', '│  ●   ●  │', '└─────────┘']
};

const roll = () => 1 + Math.floor(Math.random() * 6);

function render(a, b, color = ANSI.WHITE) {
    console.clear();
    console.log(`${ANSI.BOLD}${ANSI.CYAN}Dice Roller${ANSI.RESET}\n`);
    for (let i = 0; i < 5; i++) {
        console.log(`${color}${FACES[a][i]}${ANSI.RESET}   ${color}${FACES[b][i]}${ANSI.RESET}`);
    }
}

async function rollOnce() {
    // Shuffle animation
    for (let i = 0; i < 12; i++) {
        render(roll(), roll(), ANSI.BLACK);
        device.vibrate(15);
        await sleep(60);
    }
    const a = roll(), b = roll();
    render(a, b, a + b >= 10 ? ANSI.GREEN : ANSI.YELLOW);
    device.vibrate(120);
    const total = a + b;
    let verdict = total === 12 ? 'Boxcars! ' : total === 2 ? 'Snake eyes ' : a === b ? 'Doubles!' : '';
    console.log(`\n${ANSI.BOLD}Total: ${total}${ANSI.RESET}  ${ANSI.MAGENTA}${verdict}${ANSI.RESET}`);
}

// Roll up to 5 times, asking to continue (bounded - no infinite loop).
for (let round = 1; round <= 5; round++) {
    await rollOnce();
    if (round === 5) break;
    console.log(`\n${ANSI.CYAN}Roll again? (y/n):${ANSI.RESET}`);
    const answer = (await console.prompt() || '').trim().toLowerCase();
    if (answer !== 'y' && answer !== 'yes') break;
}

console.success('\nThanks for playing!');
exit(0);
