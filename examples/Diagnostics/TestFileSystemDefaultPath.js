/*
 * Script Name      : TestFileSystemDefaultPath.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Verifies fs methods fall back to the app root when no path is given
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/fs
//
// WHAT TO LOOK FOR (after the fix):
//   - Passing `undefined` as the path uses the safe default directory (the app-private
//     DATA_DIR) instead of resolving to the literal string "undefined". Before the fix these
//     calls failed or wrote to a bogus "undefined<filename>" path.
//   - The file written with a DEFAULT path is readable back with a DEFAULT path.
//
// NOTE: the implicit default is DATA_DIR (app-private, always writable, no permission needed).
// The user-visible Documents folder is still available explicitly as fs.APP_ROOT_DIR, but it
// is restricted by Android scoped storage, which is why it is not the implicit default.
//
// This test writes a small temp file to the default location and deletes it again at the end.

const FILE_NAME = 'phonedo_defaultpath_test.txt';
const CONTENT = 'default-path OK @ ' + new Date().toISOString();

const check = (label, ok) =>
    ok ? console.success(`✓ ${label}`) : console.error(`✗ ${label}`);

try {
    console.info('--- Writing with the DEFAULT path (first arg = undefined) ---');
    await fs.writeTextFile(undefined, FILE_NAME, CONTENT);
    console.log('Write returned without error.');

    console.info('\n--- Reading it back with the DEFAULT path ---');
    const readBack = await fs.readTextFile(undefined, FILE_NAME);
    console.log('Read content:', readBack);
    check('content round-tripped through the default path', readBack === CONTENT);

    console.info('\n--- fileExists with the DEFAULT path ---');
    const exists = await fs.fileExists(undefined, FILE_NAME);
    check('fileExists reported the file present', !!exists);

    console.info('\n--- For reference, the default directory resolves to: ---');
    console.log(fs.DATA_DIR);

} catch (e) {
    console.error('✗ Filesystem default-path test FAILED:', e);
    console.warn('Unexpected - DATA_DIR should always be writable. Check the error above.');
    exit(1);
} finally {
    // Cleanup - best effort, ignore errors.
    try { await fs.deleteFile(undefined, FILE_NAME); console.info('\nCleaned up temp file.'); }
    catch (_) { /* ignore */ }
}

console.success('\n✓ Filesystem default-path test finished.');
exit(0);
