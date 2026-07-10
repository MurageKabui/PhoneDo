/*
 * Script Name      : JsonKeyValueStore.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A reusable persistent key/value store backed by a JSON file
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/fs + JSON persistence
//
// A little "database" you can reuse: load() reads a JSON object from disk, save() writes it
// back. Here we use it to count how many times this script has been run.

const DIR = fs.DATA_DIR;
const FILE = 'store.json';

async function load() {
    try {
        if (await fs.fileExists(DIR, FILE)) return JSON.parse(await fs.readTextFile(DIR, FILE));
    } catch (e) { console.warn('(store was empty or corrupt - starting fresh)'); }
    return {};
}
async function save(obj) {
    await fs.writeTextFile(DIR, FILE, JSON.stringify(obj, null, 2));
}

console.log(`${ANSI.CYAN}${ANSI.BOLD}JSON Key/Value Store${ANSI.RESET}\n`);

const db = await load();

// Update some values.
db.runCount = (db.runCount || 0) + 1;
db.lastRun = new Date().toISOString();
db.favoriteColor = db.favoriteColor || ['red', 'green', 'blue', 'cyan', 'magenta'][Math.floor(Math.random() * 5)];

await save(db);

// Pretty print the current contents.
console.log(`${ANSI.BOLD}Current store:${ANSI.RESET}`);
for (const [k, v] of Object.entries(db)) {
    console.log(`  ${ANSI.CYAN}${k.padEnd(14)}${ANSI.RESET}${ANSI.BOLD}${v}${ANSI.RESET}`);
}

console.log(`\n${ANSI.GREEN}This script has now run ${ANSI.BOLD}${db.runCount}${ANSI.RESET}${ANSI.GREEN} time(s).${ANSI.RESET}`);
console.log(`${ANSI.BLACK}Run it again - the count persists.${ANSI.RESET}`);
exit(0);
