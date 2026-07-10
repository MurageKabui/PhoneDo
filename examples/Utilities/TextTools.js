/*
 * Script Name      : TextTools.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A pocket text toolkit - stats, transforms, and a copy-to-clipboard result
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : console.prompt + string processing + clipboard

console.log(`${ANSI.CYAN}${ANSI.BOLD}Text Tools${ANSI.RESET}`);
console.log('Paste or type some text:');
const text = ((await console.prompt()) || 'The quick brown fox jumps over the lazy dog').trim();

// ---- Stats ----
const words = text.split(/\s+/).filter(Boolean);
const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
const vowels = (text.match(/[aeiou]/gi) || []).length;
const readMins = Math.max(1, Math.round(words.length / 200));

console.log(`\n${ANSI.BOLD}Statistics${ANSI.RESET}`);
const stat = (k, v) => console.log(`  ${ANSI.CYAN}${(k + ':').padEnd(14)}${ANSI.RESET}${ANSI.BOLD}${v}${ANSI.RESET}`);
stat('Characters', text.length);
stat('Words', words.length);
stat('Sentences', sentences);
stat('Vowels', vowels);
stat('Reading time', `~${readMins} min`);

// ---- Transforms ----
const title = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
const reversed = [...text].reverse().join('');
const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

console.log(`\n${ANSI.BOLD}Transforms${ANSI.RESET}`);
console.log(`  ${ANSI.MAGENTA}UPPER:${ANSI.RESET} ${text.toUpperCase()}`);
console.log(`  ${ANSI.MAGENTA}Title:${ANSI.RESET} ${title}`);
console.log(`  ${ANSI.MAGENTA}Slug :${ANSI.RESET} ${slug}`);
console.log(`  ${ANSI.MAGENTA}Rev  :${ANSI.RESET} ${reversed}`);

// Offer to copy the slug (handy for filenames / URLs).
try {
    const res = await clipboard.setText(slug);
    if (res === 'OK' || res === true) console.success(`\n✓ Slug copied to clipboard: ${slug}`);
} catch (e) { /* ignore */ }

exit(0);
