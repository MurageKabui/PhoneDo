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

const label = (s) => `${ANSI.CYAN}${(s + ':').padEnd(15)}${ANSI.RESET}`;

console.log(`${ANSI.BOLD}${ANSI.BLUE}╔════════════════════════════════════════╗${ANSI.RESET}`);
console.log(`${ANSI.BOLD}${ANSI.BLUE}║           DEVICE  DASHBOARD            ║${ANSI.RESET}`);
console.log(`${ANSI.BOLD}${ANSI.BLUE}╚════════════════════════════════════════╝${ANSI.RESET}\n`);

console.log(label('Manufacturer') + `${ANSI.BOLD}${device.manufacturer}${ANSI.RESET}`);
console.log(label('Model') + `${ANSI.BOLD}${device.model}${ANSI.RESET}`);
console.log(label('Platform') + `${device.platform} ${device.version}`);
console.log(label('Virtual') + (device.isVirtual ? `${ANSI.YELLOW}emulator${ANSI.RESET}` : 'physical'));
console.log(label('UUID') + `${ANSI.BLACK}${device.uuid}${ANSI.RESET}`);

console.log(`\n${ANSI.BOLD}Power${ANSI.RESET}`);
console.log(label('Charging') + (device.isCharging ? `${ANSI.GREEN}yes${ANSI.RESET}` : 'no'));
console.log(label('Battery') + batteryBar(Number(device.batteryLevel) || 0));

console.log(`\n${ANSI.BLACK}Tip: device.vibrate(ms) and device.beep() are also available.${ANSI.RESET}`);
device.beep();
exit(0);
