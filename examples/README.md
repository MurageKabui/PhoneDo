# PhoneDo Example Scripts

Copy any script's contents into the PhoneDo shell and run it. Each file has a header comment
explaining what it does and a **"WHAT TO LOOK FOR"** section describing the expected output.

## Verification scripts for the recent evaluator fixes

These exercise the bugs fixed in `Resources/improvements_done.md`. Run them to confirm the
changes work on a real device. All are **safe** (no SMS/calls, no data leaves the device).

| Script | Fix it verifies | Needs |
|--------|-----------------|-------|
| `TestConsoleFormatting.js` | Objects log as JSON (not `[object Object]`); `console.table`/`trace`/`memory` work | — |
| `TestExitBehavior.js` | `exit()` actually stops the script and re-enables the console | — |
| `TestSleepValidation.js` | `sleep()` timing, input validation, and the 10-minute cap | — |
| `TestFileSystemDefaultPath.js` | `fs.*` uses the app root when the path is omitted (was `undefined`) | Storage permission |
| `TestBrowserUrlSecurity.js` | `browser.open()` blocks `javascript:`/`data:`/`file:` URLs | — |
| `TestHttpInit.js` | `http.initializeSettings()` no longer crashes | — (network optional) |
| `TestBluetoothScan.js` | `bluetooth.scan()` runs and resolves an array of devices | Bluetooth ON + BLE permission |

### Suggested run order
Start with the four that need no permissions and no hardware:
`TestConsoleFormatting` → `TestExitBehavior` → `TestSleepValidation` → `TestBrowserUrlSecurity` →
`TestHttpInit`. Then the two that need device state: `TestFileSystemDefaultPath` and
`TestBluetoothScan`.

### A note on the new `exit()`
`exit()` now unwinds the script by throwing an internal sentinel. A catch-all `try/catch`
that swallows every error will also swallow `exit()`. Call it at the top level, or re-throw
errors you don't recognise. See `TestExitBehavior.js`.

## General examples
- `DumpDeviceInfo.js` — read device info, show a dialog, copy to clipboard, vibrate.
- `FileSystemOperations.js` — create a directory, write, read, and check a file.
