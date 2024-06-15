/*
 * Script Name      : TestBrowserUrlSecurity.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Verifies browser.open() blocks dangerous URL schemes
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/browser
//
// WHAT TO LOOK FOR (after the fix):
//   - javascript:, data:, file:, vbscript: URLs are REJECTED before any window opens.
//   - http/https URLs are accepted (we do NOT actually open one here to avoid a popup;
//     uncomment the last block if you want to see a real page open).
//
// None of the blocked cases open a window — they reject immediately, so this test is safe.

const check = (label, ok) =>
    ok ? console.success(`✓ ${label}`) : console.error(`✗ ${label}`);

const blocked = [
    'javascript:alert(document.cookie)',
    'data:text/html,<script>alert(1)</script>',
    'file:///etc/hosts',
    'vbscript:msgbox(1)'
];

console.info('--- Dangerous schemes must be blocked ---');
for (const url of blocked) {
    try {
        await browser.open(url);
        check(`should have blocked: ${url}`, false);
    } catch (e) {
        check(`blocked "${url.split(':')[0]}:" — ${e.message}`, /blocked url scheme/i.test(e.message));
    }
}

console.info('\n--- tel:/mailto: are allowed ONLY via the system handler ---');
try {
    // Not via _system -> should be blocked.
    await browser.open('tel:+254700000000', '_blank');
    check('tel: via _blank should be blocked', false);
} catch (e) {
    check('tel: via _blank blocked as expected', /blocked url scheme/i.test(e.message));
}

console.success('\n✓ Browser URL-security test finished.');

// ---- Optional: prove that a normal https URL is still accepted (opens a real window) ----
// Uncomment to test the allow-path. It WILL open an in-app browser you must close.
//
// console.info('\nOpening https://example.com ...');
// const win = await browser.open('https://example.com');
// await sleep(3000);
// win.close();

exit(0);
