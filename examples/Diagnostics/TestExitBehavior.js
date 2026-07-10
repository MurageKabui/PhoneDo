/*
 * Script Name      : TestExitBehavior.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Verifies exit() now actually stops the script and re-enables the console
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/exit
//
// WHAT TO LOOK FOR (after the fix):
//   - You SEE the "before exit" line.
//   - exit(0) stops the script: the "AFTER exit" line MUST NOT appear.
//   - The console prompt becomes usable again immediately (nothing hangs).
//
// IMPORTANT NOTE ON THE NEW exit():
//   exit() now works by throwing an internal sentinel to unwind the script. That means a
//   try/catch that swallows every error will ALSO swallow exit(). Keep exit() OUTSIDE of a
//   catch-all, or re-throw anything you don't recognise. (This script calls it at top level.)

console.success('Script started.');
console.log('This line runs BEFORE exit().');

exit(0);

// -------------------------------------------------------------------------------------------
// Nothing below this line should ever execute. If you see the next message, exit() is broken.
// -------------------------------------------------------------------------------------------
console.error('BUG: this line ran AFTER exit(0) - the script did not stop!');
