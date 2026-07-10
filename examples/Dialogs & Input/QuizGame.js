/*
 * Script Name      : QuizGame.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : A true/false trivia quiz using native dialog.confirm popups, with scoring
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/dialog
//
// dialog.confirm(message, title) shows a native two-button popup and resolves TRUE for the
// primary (right) button and FALSE for the secondary (left) button.

const questions = [
    { q: 'The Great Wall of China is visible from space with the naked eye.', a: false },
    { q: 'Honey never spoils if stored properly.', a: true },
    { q: 'An octopus has three hearts.', a: true },
    { q: 'Lightning never strikes the same place twice.', a: false },
    { q: 'Bananas are botanically berries.', a: true }
];

console.log(`${ANSI.CYAN}${ANSI.BOLD}True / False Trivia${ANSI.RESET}`);
console.log('Answer each popup: right button = TRUE, left = FALSE.\n');

let score = 0;
for (let i = 0; i < questions.length; i++) {
    const item = questions[i];
    const answer = await dialog.confirm(item.q, `Question ${i + 1} of ${questions.length}`);
    const correct = answer === item.a;
    if (correct) { score++; device.vibrate(80); }
    else device.vibrate(200);

    const mark = correct ? `${ANSI.GREEN}✓ correct${ANSI.RESET}` : `${ANSI.RED}✗ wrong${ANSI.RESET}`;
    console.log(`${ANSI.BOLD}Q${i + 1}.${ANSI.RESET} ${item.q}`);
    console.log(`   You said ${answer ? 'TRUE' : 'FALSE'} - ${mark} (answer: ${item.a ? 'TRUE' : 'FALSE'})\n`);
}

const pct = Math.round((score / questions.length) * 100);
const grade = pct >= 80 ? `${ANSI.GREEN}Brilliant!` : pct >= 50 ? `${ANSI.YELLOW}Not bad!` : `${ANSI.RED}Keep studying!`;
console.log(`${ANSI.BOLD}Final score: ${score}/${questions.length} (${pct}%)${ANSI.RESET}  ${grade}${ANSI.RESET}`);

await dialog.alert(`You scored ${score}/${questions.length} (${pct}%)`, 'Quiz Complete', 'information');
exit(0);
