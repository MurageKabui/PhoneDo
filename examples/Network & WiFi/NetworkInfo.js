/*
 * Script Name      : NetworkInfo.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A dashboard of the current connection - type, SSID, IP and router
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/network + https://docs.phonedo.com/api/wifi

const label = (s) => `${ANSI.CYAN}${(s + ':').padEnd(16)}${ANSI.RESET}`;
const safe = async (fn, fallback = '-') => { try { const v = await fn(); return (v === -1 || v == null) ? fallback : v; } catch (e) { return fallback; } };

console.log(`${ANSI.BOLD}${ANSI.BLUE}╔══════════════════════════════════╗${ANSI.RESET}`);
console.log(`${ANSI.BOLD}${ANSI.BLUE}║        NETWORK  DASHBOARD        ║${ANSI.RESET}`);
console.log(`${ANSI.BOLD}${ANSI.BLUE}╚══════════════════════════════════╝${ANSI.RESET}\n`);

const type = await safe(() => network.getConnectionType(), 'unknown');
const online = /wifi|cell|2g|3g|4g|5g|ethernet/i.test(String(type));
console.log(label('Connection') + `${online ? ANSI.GREEN : ANSI.RED}${ANSI.BOLD}${type}${ANSI.RESET}`);

const ssid = await safe(() => WIFI.getConnectedSSID());
console.log(label('Wi-Fi SSID') + `${ANSI.BOLD}${ssid}${ANSI.RESET}`);

const ip = await safe(() => WIFI.getIP());
console.log(label('Device IP') + `${ANSI.BOLD}${ip}${ANSI.RESET}`);

const router = await safe(() => WIFI.getRouterIP());
console.log(label('Router IP') + `${ANSI.BOLD}${router}${ANSI.RESET}`);

console.log(`\n${ANSI.BOLD}Reachability${ANSI.RESET}`);
const toRouter = await safe(() => WIFI.canConnectToRouter(), false);
const toNet = await safe(() => WIFI.canConnectToInternet(), false);
console.log(label('Router') + (toRouter ? `${ANSI.GREEN}reachable ✓${ANSI.RESET}` : `${ANSI.RED}no${ANSI.RESET}`));
console.log(label('Internet') + (toNet ? `${ANSI.GREEN}online ✓${ANSI.RESET}` : `${ANSI.RED}offline${ANSI.RESET}`));

exit(0);
