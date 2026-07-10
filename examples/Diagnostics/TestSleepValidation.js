/*
 * Script Name      : TestSleepValidation.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Verifies sleep() timing, input validation, and the 10-minute cap
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/sleep
//
// WHAT TO LOOK FOR (after the fix):
//   - A normal sleep waits roughly the requested time.
//   - Invalid inputs (negative, NaN, non-number) reject with a CLEAR message.
//   - A huge value is capped at 10 minutes instead of pinning a timer for days
//     (we only check that it does not reject - we do NOT wait it out).

// Small helper to report pass/fail.
const check = (label, ok) =>
    ok ? console.success(`✓ ${label}`) : console.error(`✗ ${label}`);

console.info('--- 1. Normal delay (~600ms) ---');
const t0 = Date.now();
await sleep(600);
const elapsed = Date.now() - t0;
console.log(`Slept for ${elapsed}ms`);
check('sleep(600) waited ~600ms', elapsed >= 550 && elapsed < 1500);

console.info('\n--- 2. Invalid inputs must reject ---');
for (const bad of [-100, NaN, 'abc', undefined]) {
    try {
        await sleep(bad);
        check(`sleep(${String(bad)}) should have rejected`, false);
    } catch (e) {
        check(`sleep(${String(bad)}) rejected: "${e.message}"`, true);
    }
}

console.info('\n--- 3. Huge value is capped (must resolve, not reject) ---');
try {
    // 1e12 ms is ~31 years; the cap turns this into a 10-minute promise. We do NOT await it
    // here (that would hang the test) - we only confirm it is a live, non-rejected promise.
    const p = sleep(1e12);
    check('sleep(1e12) returned a promise instead of throwing', p instanceof Promise);
    // Race it against a tiny timer so we never actually wait the full capped duration.
    const winner = await Promise.race([p.then(() => 'slept'), sleep(300).then(() => 'raced')]);
    check('capped sleep did not resolve early', winner === 'raced');
} catch (e) {
    check(`sleep(1e12) unexpectedly threw: ${e.message}`, false);
}

console.success('\n✓ Sleep validation test finished.');
exit(0);
