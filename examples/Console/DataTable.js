/*
 * Script Name      : DataTable.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Rendering tabular data - both a hand-built ANSI table and console.table
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/console#table

const rows = [
    { fruit: 'Mango',   price: 40, stock: 120 },
    { fruit: 'Avocado', price: 25, stock: 8   },
    { fruit: 'Banana',  price: 10, stock: 0   },
    { fruit: 'Pineapple', price: 90, stock: 15 }
];

// ---- 1. A hand-built, colored table with aligned columns ----
const cols = [
    { key: 'fruit', label: 'Fruit', w: 12 },
    { key: 'price', label: 'Price', w: 7 },
    { key: 'stock', label: 'Stock', w: 7 }
];

const header = cols.map(c => c.label.padEnd(c.w)).join('');
console.log(`${ANSI.BOLD}${ANSI.CYAN}${header}${ANSI.RESET}`);
console.log(`${ANSI.CYAN}${'─'.repeat(header.length)}${ANSI.RESET}`);

for (const r of rows) {
    const stockColor = r.stock === 0 ? ANSI.RED : r.stock < 10 ? ANSI.YELLOW : ANSI.GREEN;
    const stockLabel = r.stock === 0 ? 'OUT' : String(r.stock);
    console.log(
        r.fruit.padEnd(cols[0].w) +
        ('KES ' + r.price).padEnd(cols[1].w) +
        `${stockColor}${stockLabel.padEnd(cols[2].w)}${ANSI.RESET}`
    );
}

// ---- 2. The built-in console.table (now fixed to render a real table) ----
console.log(`\n${ANSI.BOLD}Same data via console.table:${ANSI.RESET}`);
console.table(rows);

exit(0);
