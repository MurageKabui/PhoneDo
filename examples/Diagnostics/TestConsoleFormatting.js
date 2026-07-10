/*
 * Script Name      : TestConsoleFormatting.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Verifies the fixed console helpers (objects, table, trace, memory)
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/console
//
// WHAT TO LOOK FOR (after the fix):
//   - Objects/arrays print as readable JSON, NOT "[object Object]".
//   - console.table prints an actual table (index + columns), NOT "undefined".
//   - console.trace prints a stack (or a clean fallback), never crashes.
//   - console.memory prints stats OR a clean "not available" message.

console.info('--- 1. Object / array formatting ---');

const user = { name: 'Ada', roles: ['admin', 'editor'], active: true, meta: { level: 3 } };
console.log('An object:', user);          // was: "An object: [object Object]"
console.log('An array:', [1, 2, { x: 9 }]);

// Circular reference must not crash the logger.
const loop = { id: 1 };
loop.self = loop;
console.log('Circular object:', loop);    // should show "self": "[Circular]"

console.info('\n--- 2. console.table ---');
console.table([
    { device: 'Router',  signal: -42, band: '5GHz' },
    { device: 'Printer', signal: -71, band: '2.4GHz' },
    { device: 'TV',      signal: -58, band: '5GHz' }
]);

console.info('\n--- 3. console.trace (must not crash) ---');
console.trace('reached checkpoint');

console.info('\n--- 4. console.memory (guarded) ---');
console.memory();

console.info('\n--- 5. Log levels ---');
console.log('log    -> info style');
console.info('info   -> info style');
console.success('success-> success style (green)');
console.warn('warn   -> error style');
console.error('error  -> error style');

console.success('\n✓ Console formatting test finished. Review the output above.');

exit(0);
