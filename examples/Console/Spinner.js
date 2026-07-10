/*
 * Script Name      : Spinner.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Several text spinner animations you can drop into any waiting loop
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/console , https://docs.phonedo.com/api/sleep

const spinners = {
    dots:   ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    line:   ['|', '/', '-', '\\'],
    arc:    ['◜', '◠', '◝', '◞', '◡', '◟'],
    bounce: ['⠁', '⠂', '⠄', '⠂']
};

// Run each spinner style for a short burst.
for (const [name, frames] of Object.entries(spinners)) {
    const cycles = 16;
    for (let i = 0; i < cycles; i++) {
        console.clear();
        const frame = frames[i % frames.length];
        console.log(`${ANSI.CYAN}${ANSI.BOLD}Spinner demo${ANSI.RESET}\n`);
        console.log(`  ${ANSI.YELLOW}${frame}${ANSI.RESET}  ${name} - working...`);
        await sleep(90);
    }
}

console.clear();
console.success('✓ Done spinning.');
exit(0);
