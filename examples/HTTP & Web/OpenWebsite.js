/*
 * Script Name      : OpenWebsite.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Opens a web page in the in-app browser, showing the different display modes
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/browser
//
// browser has several presets: open (default), openSafe (clears cache/cookies),
// openFullscreen, openMinimal, and openExternal (hands off to the system browser).
// Only http/https (and tel/mailto via the system handler) are allowed - dangerous schemes
// like javascript: are blocked automatically.

console.log(`${ANSI.CYAN}${ANSI.BOLD}Open Website${ANSI.RESET}`);
console.log('Enter a URL (blank = https://example.com):');
let url = ((await console.prompt()) || '').trim();
if (!url) url = 'https://example.com';
if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

const modes = [
    { text: 'Safe view',   kind: 'primary',   size: 'md' },
    { text: 'Fullscreen',  kind: 'primary',   size: 'md' },
    { text: 'System app',  kind: 'primary',   size: 'md' },
    { text: 'Cancel',      kind: 'secondary', size: 'md' }
];

const choice = await dialog.alert(`Open:\n${url}`, 'Choose display mode', 'information', modes);

try {
    if (choice === 0)      { await browser.openSafe(url);       console.success('Opened in safe view.'); }
    else if (choice === 1) { await browser.openFullscreen(url); console.success('Opened fullscreen.'); }
    else if (choice === 2) { await browser.openExternal(url);   console.success('Handed off to the system browser.'); }
    else                   { console.log('Cancelled.'); }
} catch (e) {
    console.error('Could not open URL:', e.message || e);
}

exit(0);
