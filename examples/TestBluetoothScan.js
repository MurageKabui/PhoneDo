/*
 * Script Name      : TestBluetoothScan.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Verifies bluetooth.scan() runs and resolves an array of devices
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/bluetooth
//
// WHAT TO LOOK FOR (after the fix):
//   - bluetooth.scan() RUNS (before the fix it crashed on an undefined `this`).
//   - It RESOLVES to an array of discovered devices when the timeout elapses
//     (before the fix it resolved `undefined`).
//   - The optional per-device callback still fires while scanning.
//
// REQUIREMENTS: Bluetooth ON + location/BLE permission granted. If not, this reports the
// error cleanly instead of crashing.

const check = (label, ok) =>
    ok ? console.success(`✓ ${label}`) : console.error(`✗ ${label}`);

console.info('Scanning for BLE devices for 6 seconds...');

let liveCallbackFired = false;

try {
    // scan(onDeviceFound?, onScanError?, timeoutSeconds)
    const devices = await bluetooth.scan(
        (device) => {
            liveCallbackFired = true;
            console.log('  found:', device.name || device.address || '(unknown)');
        },
        (err) => console.warn('  scan error event:', err),
        6
    );

    console.info('\n--- Results ---');
    check('scan() resolved an Array', Array.isArray(devices));
    console.log(`Devices collected: ${Array.isArray(devices) ? devices.length : 'n/a'}`);
    check('optional onDeviceFound callback fired (if any device was nearby)', liveCallbackFired || (Array.isArray(devices) && devices.length === 0));

    if (Array.isArray(devices) && devices.length) {
        console.info('\nDevice list:');
        console.table(devices.map(d => ({ name: d.name || '(none)', address: d.address, rssi: d.rssi })));
    }
} catch (e) {
    console.error('✗ Bluetooth scan failed:', e);
    console.warn('Turn Bluetooth ON and grant BLE/location permission, then retry.');
    exit(1);
}

console.success('\n✓ Bluetooth scan test finished.');
exit(0);
