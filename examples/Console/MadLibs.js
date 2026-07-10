/*
 * Script Name      : MadLibs.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Collects a few words from the user and drops them into a short story
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : several console.prompt calls feeding a template

async function ask(question) {
    console.log(`${ANSI.CYAN}${question}${ANSI.RESET}`);
    const value = (await console.prompt() || '').trim();
    return value || '(blank)';
}

console.log(`${ANSI.BOLD}Word Game${ANSI.RESET}`);
console.log('Answer each prompt, then read your story.\n');

const adjective = await ask('An adjective:');
const animal    = await ask('An animal:');
const verb      = await ask('A verb ending in -ing:');
const place      = await ask('A place:');
const number    = await ask('A number:');

const story =
`One ${ANSI.BOLD}${adjective}${ANSI.RESET} morning, a ${ANSI.BOLD}${animal}${ANSI.RESET} was ` +
`${ANSI.BOLD}${verb}${ANSI.RESET} near ${ANSI.BOLD}${place}${ANSI.RESET}. ` +
`It had done this ${ANSI.BOLD}${number}${ANSI.RESET} times before, and every time it ended ` +
`with a round of applause.`;

console.log(`\n${ANSI.GREEN}${ANSI.BOLD}Your story:${ANSI.RESET}`);
console.log(story);

exit(0);
