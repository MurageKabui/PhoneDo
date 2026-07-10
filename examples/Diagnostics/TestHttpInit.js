/*
 * Script Name      : TestHttpInit.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Verifies the HTTP bridge no longer crashes on initializeSettings()
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/http
//
// WHAT TO LOOK FOR (after the fix):
//   - http.initializeSettings() RESOLVES. Before the fix it always threw
//     "Invalid timeout value" because of a broken `this` reference.
//   - setDataSerializer / setTimeout also work.
//   - (Optional) a real GET request succeeds if you uncomment the network block.

const check = (label, ok) =>
    ok ? console.success(`✓ ${label}`) : console.error(`✗ ${label}`);

console.info('--- 1. initializeSettings() must resolve (was: guaranteed crash) ---');
try {
    await http.initializeSettings();
    check('http.initializeSettings() resolved', true);
} catch (e) {
    check(`http.initializeSettings() threw: ${e.message || e}`, false);
}

console.info('\n--- 2. Configuration setters ---');
try {
    await http.setDataSerializer('json');
    check("setDataSerializer('json')", true);
} catch (e) {
    check(`setDataSerializer threw: ${e.message || e}`, false);
}

try {
    await http.setTimeout(30);
    check('setTimeout(30)', true);
} catch (e) {
    check(`setTimeout threw: ${e.message || e}`, false);
}

console.success('\n✓ HTTP init test finished.');

// ---- Optional: real network round-trip (requires internet) ----
// Uncomment to send a live GET to a public test endpoint.
//
// console.info('\nSending GET https://httpbin.org/get ...');
// try {
//     const res = await http.sendRequest('https://httpbin.org/get', { method: 'get', responseType: 'json' });
//     console.log('Status:', res.status);
//     console.log('Body:', res.data);
// } catch (err) {
//     console.error('Request failed:', err);
// }

exit(0);
