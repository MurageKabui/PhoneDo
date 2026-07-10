/*
 * Script Name      : BleScanner.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Scans for nearby Bluetooth LE devices and lists them with signal strength
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/bluetooth
//
// Requires Bluetooth ON + BLE/location permission. bluetooth.scan() runs for the given number
// of seconds and resolves an array of discovered devices. It only LISTENS - it connects to
// nothing.

const SECONDS = 8;

function rssiMeter(rssi) {
    // BLE RSSI: ~ -40 (very close) to -100 (far). Map to a 5-block bar.
    const bars = rssi >= -55 ? 5 : rssi >= -65 ? 4 : rssi >= -75 ? 3 : rssi >= -85 ? 2 : 1;
    const color = bars >= 4 ? ANSI.GREEN : bars >= 2 ? ANSI.YELLOW : ANSI.RED;
    return `${color}${'▰'.repeat(bars)}${ANSI.BLACK}${'▱'.repeat(5 - bars)}${ANSI.RESET}`;
}

console.log(`${ANSI.CYAN}${ANSI.BOLD}BLE Scanner${ANSI.RESET}`);
console.log(`Scanning for ${SECONDS} seconds...\n`);

let count = 0;
try {
    const devices = await bluetooth.scan(
        (d) => { count++; cout(`${ANSI.BLACK}·${ANSI.RESET}`); }, // live progress dots
        (err) => console.warn('\nscan error:', err),
        SECONDS
    );
    cout('\n\n');

    if (!Array.isArray(devices) || devices.length === 0) {
        console.warn('No BLE devices found nearby.');
        exit(0);
    }

    devices.sort((a, b) => (b.rssi || -999) - (a.rssi || -999));
    console.log(`${ANSI.BOLD}Found ${devices.length} device(s):${ANSI.RESET}\n`);
    devices.forEach((d, i) => {
        const name = d.name || d.advertisementData?.kCBAdvDataLocalName || '(unnamed)';
        console.log(`${String(i + 1).padStart(2)}. ${rssiMeter(d.rssi || -100)} ${String(d.rssi ?? '?').padStart(4)}dBm  ${ANSI.BOLD}${name}${ANSI.RESET}`);
        console.log(`    ${ANSI.BLACK}${d.address || d.id || ''}${ANSI.RESET}`);
    });
} catch (e) {
    console.error('Bluetooth scan failed:', e);
    console.warn('Turn Bluetooth ON and grant BLE/location permission, then retry.');
    exit(1);
}

console.success('\n✓ Scan complete.');
exit(0);
