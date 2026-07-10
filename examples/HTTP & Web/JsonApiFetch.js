/*
 * Script Name      : JsonApiFetch.js
 * Date             : Fri Jul 10 2026 12:00:00 GMT+0300 (East Africa Time)
 * PhoneDo Version  : 1.3.2
 * Description      : Fetches JSON from a public API and displays it (needs internet)
 * Author           : PhoneDo
 * License          : None
 */

// Demonstrates : https://docs.phonedo.com/api/http
//
// A GET request with responseType:'json'. The response object looks like
// { status, data, headers, url } - for JSON, `data` is already parsed.

console.log(`${ANSI.CYAN}${ANSI.BOLD}JSON API Fetch${ANSI.RESET}\n`);

spinner.show(null, 'Fetching a random cat fact...');
try {
    await http.initializeSettings();
    const res = await http.sendRequest('https://catfact.ninja/fact', {
        method: 'get',
        responseType: 'json'
    });
    spinner.hide();

    console.log(`${ANSI.GREEN}HTTP ${res.status}${ANSI.RESET}  ${ANSI.BLACK}${res.url || ''}${ANSI.RESET}\n`);
    const fact = res.data && res.data.fact ? res.data.fact : JSON.stringify(res.data);
    console.log(`${ANSI.YELLOW}Did you know?${ANSI.RESET}`);
    console.log(`${ANSI.BOLD}${fact}${ANSI.RESET}`);

    console.log(`\n${ANSI.BLACK}Raw response body:${ANSI.RESET}`);
    console.dir(res.data);
} catch (err) {
    spinner.hide();
    console.error('Request failed:', err && (err.error || err.status || err));
    console.warn('Check your internet connection and try again.');
    exit(1);
}

exit(0);
