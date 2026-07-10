/*
 * Script Name      : NotesApp.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A tiny persistent notes app - add notes, they survive between runs
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/fs (append / read / persistence)
//
// Notes are appended to a file in DATA_DIR (app-private, always writable). Run the script
// again later and your previous notes are still there.

const DIR = fs.DATA_DIR;
const FILE = 'my_notes.txt';

async function readNotes() {
    try {
        if (await fs.fileExists(DIR, FILE)) return await fs.readTextFile(DIR, FILE);
    } catch (e) { /* first run */ }
    return '';
}

console.log(`${ANSI.CYAN}${ANSI.BOLD}Notes${ANSI.RESET}`);

// Show existing notes.
const existing = await readNotes();
if (existing.trim()) {
    console.log(`\n${ANSI.BOLD}Your notes so far:${ANSI.RESET}`);
    existing.trim().split('\n').forEach((line, i) =>
        console.log(`  ${ANSI.BLACK}${String(i + 1).padStart(2)}.${ANSI.RESET} ${line}`));
} else {
    console.log(`${ANSI.BLACK}(no notes yet)${ANSI.RESET}`);
}

// Add up to 3 new notes this session.
for (let i = 0; i < 3; i++) {
    console.log(`\n${ANSI.GREEN}New note (blank line to stop):${ANSI.RESET}`);
    const note = (await console.prompt() || '').trim();
    if (!note) break;
    const stamp = new Date().toLocaleString();
    await fs.appendTextFile(DIR, FILE, `[${stamp}] ${note}\n`);
    console.success('  saved ✓');
}

const total = (await readNotes()).trim().split('\n').filter(Boolean).length;
console.log(`\n${ANSI.BOLD}You now have ${ANSI.CYAN}${total}${ANSI.RESET}${ANSI.BOLD} note(s).${ANSI.RESET}`);
console.log(`${ANSI.BLACK}Stored at: ${DIR}${FILE}${ANSI.RESET}`);
exit(0);
