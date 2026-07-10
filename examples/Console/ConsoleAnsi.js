/*
  Script Name      : ConsoleAnsi.nts
  Date             : Mon Sep 15 2025 21:18:39 GMT+0300 (East Africa Time)
  PhoneDo Version  : 1.3.2
  Description      : none
  Author           :
  License          :
*/

// Basic color usage
console.log( `${ANSI.RED}This is red text${ANSI.RESET}` );
console.log( `${ANSI.GREEN}This is green text${ANSI.RESET}` );

// Combining styles
console.log( `${ANSI.BOLD}${ANSI.BLUE}This is bold blue text${ANSI.RESET}` );

// Background colors
console.log(
	`${ANSI.BG_BLACK}${ANSI.WHITE}White text on black background${ANSI.RESET}` );

// Multiple styles
console.log(
	`${ANSI.BOLD}${ANSI.UNDERLINE}${ANSI.YELLOW}Warning: Important message${ANSI.RESET}`
	);

// Creating styled messages
const error = `${ANSI.RED}${ANSI.BOLD}Error:${ANSI.RESET} Something went wrong`;
const success =
	`${ANSI.GREEN}${ANSI.BOLD}Success:${ANSI.RESET} Operation completed`;
const info = `${ANSI.BLUE}${ANSI.BOLD}Info:${ANSI.RESET} Processing data`;

console.log( error );
console.log( success );
console.log( info );

// Creating a styled table
console.log( `
${ANSI.BOLD}User Information:${ANSI.RESET}
${ANSI.CYAN}Name:${ANSI.RESET} John Doe
${ANSI.CYAN}Age:${ANSI.RESET} 30
${ANSI.CYAN}Role:${ANSI.RESET} Admin
` );

// Progress bar with colors
function showColoredProgress ( progress )
{
	const bar = '='.repeat( Math.floor( progress / 2 ) ) + '>';
	console.log(
		`${ANSI.GREEN}[${bar.padEnd(50, ' ')}]${ANSI.RESET} ${ANSI.BOLD}${progress}%${ANSI.RESET}`
		);
}
