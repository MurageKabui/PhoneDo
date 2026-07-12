/*
  Script Name      : CountdownTimer.js
  Date             : Fri Jul 10 2026 04:27:38 GMT+0300 (East Africa Time)
  PhoneDo Version  : 1.4.0
  Description      : Large countdown timer with big digits, color stages, vibration and finish beep.
  Author           : PhoneDo
  License          : None
*/

// 5-row large digital font
const BIG = {
	'0': [
		' ███ ',
		'█   █',
		'█   █',
		'█   █',
		' ███ '
	],
	'1': [
		'  █  ',
		' ██  ',
		'  █  ',
		'  █  ',
		'█████'
	],
	'2': [
		'████ ',
		'    █',
		' ███ ',
		'█    ',
		'█████'
	],
	'3': [
		'████ ',
		'    █',
		' ███ ',
		'    █',
		'████ '
	],
	'4': [
		'█   █',
		'█   █',
		'█████',
		'    █',
		'    █'
	],
	'5': [
		'█████',
		'█    ',
		'████ ',
		'    █',
		'████ '
	],
	'6': [
		' ███ ',
		'█    ',
		'████ ',
		'█   █',
		' ███ '
	],
	'7': [
		'█████',
		'    █',
		'   █ ',
		'  █  ',
		' █   '
	],
	'8': [
		' ███ ',
		'█   █',
		' ███ ',
		'█   █',
		' ███ '
	],
	'9': [
		' ███ ',
		'█   █',
		' ████',
		'    █',
		' ███ '
	],
	':': [
		'     ',
		'  █  ',
		'     ',
		'  █  ',
		'     '
	]
};

function bigText(str, color) {
	for (let row = 0; row < 5; row++) {
		let line = "";

		for (const ch of str) {
			line += (BIG[ch] ? BIG[ch][row] : "     ") + "   ";
		}

		console.log(`${color}${ANSI.BOLD}${line}${ANSI.RESET}`);
	}
}

const fmt = (s) =>
	`${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

console.clear();
console.log(`${ANSI.CYAN}${ANSI.BOLD}Countdown Timer${ANSI.RESET}`);
console.log("Seconds to count down (1-90):");

let secs = parseInt((await console.prompt() || "10").trim(), 10);

if (isNaN(secs) || secs <= 0)
	secs = 10;

secs = Math.min(secs, 90);

for (let t = secs; t >= 0; t--) {
	console.clear();

	const color =
		t <= 3
			? ANSI.RED
			: t <= Math.ceil(secs / 3)
			? ANSI.YELLOW
			: ANSI.GREEN;

	console.log(`${ANSI.BOLD}Time Remaining${ANSI.RESET}\n`);

	bigText(fmt(t), color);

	if (t <= 3 && t > 0)
		device.vibrate(100);

	if (t > 0)
		await sleep(1000);
}

console.log(
	`\n${ANSI.BG_RED}${ANSI.WHITE}${ANSI.BOLD}   TIME'S UP!   ${ANSI.RESET}`
);

device.vibrate(600);
device.beep();
await utter.speak('Countdown complete!');

exit(0);