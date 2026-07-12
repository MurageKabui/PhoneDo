/*
 * Script Name      : DeviceDashboard.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A colorful one-screen dashboard of everything the device object knows
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/device

function batteryBar(level) {
    const w = 20;
    const filled = Math.round((level / 100) * w);
    const color = level <= 15 ? ANSI.RED : level <= 40 ? ANSI.YELLOW : ANSI.GREEN;
    return `${color}${'█'.repeat(filled)}${ANSI.BLACK}${'░'.repeat(w - filled)}${ANSI.RESET} ${color}${ANSI.BOLD}${level}%${ANSI.RESET}`;
}

const label = (s) => `${ANSI.WHITE}${(s + ':').padEnd(18)}${ANSI.RESET}`;

console.log(`${ANSI.BG_BLACK}${ANSI.WHITE}╔═══════════════════════════════════╗${ANSI.RESET}`);
console.log(`${ANSI.BG_BLACK}${ANSI.WHITE}║            DEVICE DASHBOARD             ║${ANSI.RESET}`);
console.log(`${ANSI.BG_BLACK}${ANSI.WHITE}╚═══════════════════════════════════╝${ANSI.RESET}\n`);

console.log(label('1. Manufacturer') + `${ANSI.BOLD}${device.manufacturer}${ANSI.RESET}`);
console.log(label('2. Model') + `${ANSI.BOLD}${device.model}${ANSI.RESET}`);
console.log(label('3. Platform') + `${device.platform} ${device.version}`);
console.log(label('4. Virtual') + (device.isVirtual ? `${ANSI.YELLOW}emulator${ANSI.RESET}` : 'physical'));
console.log(label('5. UUID') + `${ANSI.WHITE}${device.uuid}${ANSI.RESET}`);
console.log(`${ANSI.UNDERLINE}${ANSI.BOLD} Power Information ${ANSI.RESET}`);
console.log(label('6. Charging') + (device.isCharging ? `${ANSI.WHITE}yes${ANSI.RESET}` : 'no'));
console.log(label('7. Battery') + batteryBar(Number(device.batteryLevel) || 0));

console.log(`\n${ANSI.WHITE}Tip: device.vibrate(ms) and device.beep() are also available.${ANSI.RESET}`);
device.beep();
exit(0);