/*
 * Script Name      : WifiScanner.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Scans nearby Wi-Fi networks and ranks them with colored signal meters
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/wifi
//
// Requires location permission + location services ON (Android requirement for Wi-Fi scans).
// This script only READS the airwaves - it never connects to anything.

console.log(`${ANSI.CYAN}${ANSI.BOLD}Wi-Fi Scanner${ANSI.RESET}\n`);

// Signal meter: RSSI (dBm) -> 4-block colored bar.
function meter(level) {
    const bars = level >= -55 ? 4 : level >= -65 ? 3 : level >= -75 ? 2 : level >= -85 ? 1 : 0;
    const color = bars >= 3 ? ANSI.GREEN : bars === 2 ? ANSI.YELLOW : ANSI.RED;
    return `${color}${'▮'.repeat(bars)}${ANSI.BLACK}${'▯'.repeat(4 - bars)}${ANSI.RESET}`;
}

try {
    await WIFI.requestPermission();
    if (!(await WIFI.isLocationEnabled())) {
        console.warn('Location services are OFF - Android needs them for Wi-Fi scans.');
        console.log('Opening location settings...');
        await WIFI.openLocationSettings();
        exit(1);
    }

    console.log('Scanning...');
    const networks = await WIFI.scan();

    if (!Array.isArray(networks) || networks.length === 0) {
        console.warn('No networks found (or permission denied).');
        exit(0);
    }

    networks.sort((a, b) => b.level - a.level);
    console.log(`\n${ANSI.BOLD}Found ${networks.length} network(s):${ANSI.RESET}\n`);

    networks.forEach((n, i) => {
        const ssid = (n.SSID && n.SSID.trim()) ? n.SSID : '<hidden>';
        const secure = /WPA|WEP|PSK|EAP/i.test(n.capabilities || '') ? '' : '';
        console.log(`${String(i + 1).padStart(2)}. ${meter(n.level)} ${String(n.level).padStart(4)}dBm ${secure} ${ANSI.BOLD}${ssid}${ANSI.RESET}`);
    });

    const best = networks[0];
    console.log(`\n${ANSI.GREEN}Strongest:${ANSI.RESET} ${ANSI.BOLD}${best.SSID || '<hidden>'}${ANSI.RESET} (${best.level} dBm)`);
} catch (e) {
    console.error('Scan failed:', e);
    exit(1);
}

exit(0);
