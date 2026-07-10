/*
 * Script Name      : Fireworks.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A little console fireworks show - rockets launch, burst and fade
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : console animation + ANSI + device.vibrate

const W = 30, H = 14;
const COLORS = [ANSI.RED, ANSI.YELLOW, ANSI.GREEN, ANSI.CYAN, ANSI.MAGENTA, ANSI.WHITE];
const rand = (n) => Math.floor(Math.random() * n);

function blank() { return Array.from({ length: H }, () => Array(W).fill(' ')); }

function draw(grid) {
    console.clear();
    console.log(`${ANSI.BOLD}${ANSI.BLUE}Fireworks${ANSI.RESET}`);
    console.log(grid.map(row => row.join('')).join('\n'));
}

// Launch 4 rockets in sequence (bounded).
for (let rocket = 0; rocket < 4; rocket++) {
    const x = 3 + rand(W - 6);
    const color = COLORS[rand(COLORS.length)];
    const peak = 2 + rand(4);

    // Ascent
    for (let y = H - 1; y >= peak; y--) {
        const g = blank();
        g[y][x] = `${ANSI.YELLOW}|${ANSI.RESET}`;
        if (y + 1 < H) g[y + 1][x] = `${ANSI.BLACK}'${ANSI.RESET}`;
        draw(g);
        await sleep(45);
    }
    device.vibrate(80);

    // Burst - expanding rings
    for (let r = 1; r <= 4; r++) {
        const g = blank();
        const pts = [[0, r], [0, -r], [r, 0], [-r, 0], [r, r], [r, -r], [-r, r], [-r, -r]];
        for (const [dy, dx] of pts) {
            const ny = peak + dy, nx = x + dx;
            if (ny >= 0 && ny < H && nx >= 0 && nx < W) {
                g[ny][nx] = `${color}${r < 3 ? '*' : '.'}${ANSI.RESET}`;
            }
        }
        if (r < 3) g[peak][x] = `${ANSI.WHITE}${ANSI.BOLD}*${ANSI.RESET}`;
        draw(g);
        await sleep(90);
    }
}

console.clear();
console.log(`${ANSI.MAGENTA}${ANSI.BOLD}Done.${ANSI.RESET}`);
device.vibrate(300);
exit(0);
