
<p align="center">
<img alt="PhoneDo" src="https://github.com/MurageKabui/PhoneDo/blob/main/Previews/PhoneDo.gif?raw=true" width="440px" height="77px">
</p>
<p align="center"><a href="">[<img src="pictures/home.png" width="20px"> Homepage]</a> | <a href="">[🤖 PhoneDo AI]</a> | <a href="">[🤗 Community]</a> | <a href="https://discord.gg/b4ENrd2FAP">[Discord]</a></p>
<p align="center">
  <a href="a"><b>Download App </b>💾
️</a>
</p>
<hr>


# PhoneDo Scripting API Documentation

## Table of Contents

- [Core Utilities](#core-utilities)
  - [Global Aliases](#global-aliases)
  - [Console Output](#console-output)
  - [Reading User Input](#reading-user-input)
  - [ANSI Color Support](#ansi-color-support)
  - [Sleep and Timers](#sleep-and-timers)
  - [Android Permissions](#android-permissions)
- [User Interface](#user-interface)
  - [Browser Integration](#browser-integration)
  - [Dialog Interface](#dialog-interface)
  - [Spinner Control](#spinner-control)
- [Connectivity & Data](#connectivity-and-data)
  - [Network Operations](#network-operations)
  - [WiFi Operations](#wifi-operations)
  - [Bluetooth (BLE)](#bluetooth-ble)
  - [HTTP Client](#http-client)
  - [SMS Operations](#sms-operations)
- [Hardware & System](#hardware-and-system)
  - [Clipboard Operations](#clipboard-operations)
  - [Device Information](#device-information)
  - [Flashlight Control](#flashlight-control)
  - [SIM Card Operations](#sim-card-operations)
  - [Speech and Voice](#speech-and-voice)
  - [File System](#file-system)

## Recent Updates & Behavior Notes

If you have used PhoneDo before, these are the behaviors worth knowing:

- **Read user input** with `await console.prompt()` (see [Reading User Input](#reading-user-input)).
- **`exit()` stops the script immediately.** Code after `exit()` does not run. Because it works
  by throwing an internal signal, a catch-all `try { ... } catch (e) { }` around your whole
  script will also swallow `exit()`. Call it at the top level, or re-throw errors you do not
  recognise.
- **Stopping a run.** A running script can be stopped from the app menu (**Stop Run**). This
  stops any script that yields to the event loop (uses `sleep`, `prompt`, or awaits a bridge).
  A purely synchronous loop such as `while (true) {}` cannot be interrupted and will freeze the
  app, so always give long loops an `await sleep(...)`.
- **`console.log` prints objects as JSON.** Passing an object or array now prints readable JSON
  instead of `[object Object]`, and `console.table` renders a real text table.
- **`sleep()` is capped at 10 minutes** and rejects negative or non-numeric input.
- **`browser.open()` blocks dangerous URL schemes** (`javascript:`, `data:`, `file:`). Only
  `http`/`https` (and `tel`/`mailto`/`sms`/`geo` via the system handler) are allowed.
- **`fs` path arguments are optional.** If you omit the directory, file methods default to
  `fs.DATA_DIR` (app-private, always writable, no permission needed).

## Core Utilities

### Global Aliases

These functions are available globally in the script environment for convenience:

```javascript
cout(...messages: any[]): void;    // Alias for log()
log(...messages: any[]): void;     // Alias for log()
exit(exitCode?: number): void;     // Stops the script immediately
```

> [!IMPORTANT]
> `exit()` stops the script right away - nothing after it runs. It signals the stop by throwing
> internally, so a `try/catch` that wraps your whole script and swallows every error will also
> swallow `exit()`. Keep `exit()` at the top level, or re-throw errors you did not expect. A
> non-zero exit code prints `Script Terminated. ExitCode: N`.

#### Example Usage

```javascript
cout("Hello from PhoneDo!");
log("This is a log message");
exit(0); // Exit successfully
```

### Console Output

The `console` object provides more structured logging with different styles in the terminal.

### Methods

```javascript
interface Console {
    log(...messages: any[]): void;      // Logs a general info message (Blue/White)
    info(...messages: any[]): void;     // Logs an informational message (Blue)
    warn(...messages: any[]): void;     // Logs a warning message (Yellow/Red)
    error(...messages: any[]): void;    // Logs an error message (Red)
    success(...messages: any[]): void;  // Logs a success message (Green)
    prompt(): Promise<string>;          // Reads a line of input from the user
    clear(): void;                      // Clears the console output
    cls(): void;                        // Alias for clear()
    
    // Standard Methods
    assert(condition: boolean, ...messages: any[]): void;
    table(data: any, columns?: string[]): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    timeLog(label?: string, ...messages: any[]): void;
    count(label?: string): void;
    trace(...messages: any[]): void;
    debug(...messages: any[]): void;
    dir(obj: any, options?: object): void;
}
```

### Styling Options

Each console method uses specific styling for better visual distinction:
- `log`: Default style
- `info`: Blue text
- `warn`: Yellow text
- `error`: Red text
- `success`: Green text

### ANSI Color Support

PhoneDo supports ANSI escape codes for advanced text styling through the `ANSI` object:

```javascript
interface ANSI {
    // Text Colors
    BLACK: string;
    RED: string;
    GREEN: string;
    YELLOW: string;
    BLUE: string;
    MAGENTA: string;
    CYAN: string;
    WHITE: string;
    
    // Background Colors
    BG_BLACK: string;
    BG_RED: string;
    BG_GREEN: string;
    BG_YELLOW: string;
    BG_BLUE: string;
    BG_MAGENTA: string;
    BG_CYAN: string;
    BG_WHITE: string;
    
    // Text Formatting
    BOLD: string;
    ITALIC: string;
    UNDERLINE: string;
    BLINK: string;
    INVERSE: string;
    STRIKETHROUGH: string;
    
    // Reset
    RESET: string;
}
```

#### Example Usage

```javascript
// Basic color usage
console.log(`${ANSI.RED}This is red text${ANSI.RESET}`);
console.log(`${ANSI.GREEN}This is green text${ANSI.RESET}`);

// Combining styles
console.log(`${ANSI.BOLD}${ANSI.BLUE}This is bold blue text${ANSI.RESET}`);

// Background colors
console.log(`${ANSI.BG_BLACK}${ANSI.WHITE}White text on black background${ANSI.RESET}`);

// Multiple styles
console.log(`${ANSI.BOLD}${ANSI.UNDERLINE}${ANSI.YELLOW}Warning: Important message${ANSI.RESET}`);

// Creating styled messages
const error = `${ANSI.RED}${ANSI.BOLD}Error:${ANSI.RESET} Something went wrong`;
const success = `${ANSI.GREEN}${ANSI.BOLD}Success:${ANSI.RESET} Operation completed`;
const info = `${ANSI.BLUE}${ANSI.BOLD}Info:${ANSI.RESET} Processing data`;

console.log(error);
console.log(success);
console.log(info);

// Creating a styled table
console.log(`
${ANSI.BOLD}User Information:${ANSI.RESET}
${ANSI.CYAN}Name:${ANSI.RESET} John Doe
${ANSI.CYAN}Age:${ANSI.RESET} 30
${ANSI.CYAN}Role:${ANSI.RESET} Admin
`);

// Progress bar with colors
function showColoredProgress(progress) {
    const bar = '='.repeat(Math.floor(progress / 2)) + '>';
    console.log(`${ANSI.GREEN}[${bar.padEnd(50, ' ')}]${ANSI.RESET} ${ANSI.BOLD}${progress}%${ANSI.RESET}`);
}
```

#### Best Practices for ANSI Usage

1. **Always Reset After Styling**
```javascript
// Good
console.log(`${ANSI.RED}Error message${ANSI.RESET}`);

// Bad - styling leaks into next line
console.log(`${ANSI.RED}Error message`);
```

2. **Use Template Literals for Complex Styling**
```javascript
// Good
console.log(`${ANSI.BOLD}${ANSI.BLUE}Title${ANSI.RESET}`);

// Avoid
console.log(ANSI.BOLD + ANSI.BLUE + "Title" + ANSI.RESET);
```

3. **Create Reusable Style Functions**
```javascript
const styles = {
    error: (text) => `${ANSI.RED}${ANSI.BOLD}${text}${ANSI.RESET}`,
    success: (text) => `${ANSI.GREEN}${ANSI.BOLD}${text}${ANSI.RESET}`,
    warning: (text) => `${ANSI.YELLOW}${ANSI.BOLD}${text}${ANSI.RESET}`,
    info: (text) => `${ANSI.BLUE}${ANSI.BOLD}${text}${ANSI.RESET}`
};

console.log(styles.error("Critical error occurred!"));
console.log(styles.success("Operation completed successfully!"));
```

4. **Create Styled UI Components**
```javascript
function showStyledAlert(message, type = 'info') {
    const styles = {
        info: ANSI.BLUE,
        success: ANSI.GREEN,
        warning: ANSI.YELLOW,
        error: ANSI.RED
    };
    
    const color = styles[type] || styles.info;
    console.log(`${color}${ANSI.BOLD}${message}${ANSI.RESET}`);
}

showStyledAlert("Operation successful!", "success");
showStyledAlert("Warning: Low memory", "warning");
showStyledAlert("Error: Connection failed", "error");
```

### Example Usage

```javascript
// Basic logging
console.log("Hello, World!");
console.info("This is an informational message");
console.warn("This is a warning message");
console.error("This is an error message");
console.success("Operation completed successfully!");

// Advanced console methods
console.assert(1 === 1, "This will not show");
console.table([{ name: "John", age: 30 }, { name: "Jane", age: 25 }]);
console.time("timer");
await sleep(100);
console.timeEnd("timer");

// Clearing the console
console.clear();
// or
console.cls();
```

#### Supported Methods

The `console` object is a full bridge to the native terminal, supporting the following standard methods:

- `log()`, `info()`, `warn()`, `error()`
- `success()` (PhoneDo specific)
- `prompt()` (PhoneDo specific - reads user input)
- `clear()`, `cls()`
- `assert(condition, ...messages)`
- `count(label?)`
- `debug()`, `dir()`, `dirxml()`
- `group()`, `groupCollapsed()`, `groupEnd()`
- `table(data, columns?)`
- `time(label?)`, `timeEnd(label?)`, `timeLog(label?)`
- `trace()`


### Best Practices

1. **Use Appropriate Log Levels**
   - `log`: General information
   - `info`: Important but non-critical information
   - `warn`: Potential issues that don't stop execution
   - `error`: Critical issues that affect functionality
   - `success`: Completed operations

2. **Structured Logging**
```javascript
// Good
console.log("User login attempt:", { username: "john", timestamp: new Date() });

// Avoid
console.log("User " + username + " logged in at " + new Date());
```

### Reading User Input

`console.prompt()` pauses the script and waits for the user to type a line and press enter. It
resolves to the entered text as a string (empty string if nothing was typed). Always `await` it.

```javascript
console.log("What is your name?");
const name = await console.prompt();
console.success(`Hello, ${name || 'stranger'}!`);
```

#### Reusable helpers

```javascript
// Ask a question and return the trimmed answer.
async function ask(question) {
    console.log(question);
    return (await console.prompt() || '').trim();
}

// Ask for a number, with a fallback when the input is blank or invalid.
async function askNumber(question, fallback) {
    const raw = await ask(question);
    const n = parseFloat(raw);
    return (raw === '' || isNaN(n)) ? fallback : n;
}

const age = await askNumber("Your age?", 0);
```

#### Validate and re-ask

Wrap the prompt in a bounded loop so a bad answer can be re-entered without looping forever.

```javascript
async function askValid(question, validate, tries = 3) {
    for (let i = 0; i < tries; i++) {
        const value = await ask(question);
        const error = validate(value);
        if (!error) return value;
        console.warn(error);
    }
    return null; // gave up
}

const email = await askValid(
    "Email:",
    v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? '' : 'That does not look like an email.'
);
```

> [!TIP]
> For yes/no questions or button choices, a native `dialog.confirm()` or `dialog.alert()` popup
> is often nicer than a typed prompt. Use `console.prompt()` for free-form text and numbers.

> [!IMPORTANT]
> While the script waits at a prompt, the shell is paused. If the user does not answer, use the
> **Stop Run** menu item to cancel; the prompt aborts cleanly and the shell returns.

---

### Android Permissions

The `permission` object allows you to check for and request system-level permissions required for hardware access.

#### Constants

The following constants are available under the `permission` object:

| Constant | Description |
|----------|-------------|
| `permission.ACCESS_COARSE_LOCATION` | Access to approximate location |
| `permission.ACCESS_FINE_LOCATION` | Access to precise location |
| `permission.CAMERA` | Access to the camera |
| `permission.READ_CONTACTS` | Read contact information |
| `permission.WRITE_CONTACTS` | Modify contact information |
| `permission.READ_CALENDAR` | Read calendar events |
| `permission.WRITE_CALENDAR` | Modify calendar events |
| `permission.READ_EXTERNAL_STORAGE` | Read from shared storage |
| `permission.WRITE_EXTERNAL_STORAGE` | Write to shared storage |
| `permission.RECORD_AUDIO` | Access to the microphone |
| `permission.MODIFY_AUDIO_SETTINGS` | Modify audio settings |
| `permission.READ_PHONE_STATE` | Read phone state (IMEI, etc.) |
| `permission.CALL_PHONE` | Direct phone calls |
| `permission.READ_SMS` | Read SMS messages |
| `permission.SEND_SMS` | Send SMS messages |
| `permission.RECEIVE_SMS` | Receive SMS messages |
| `permission.READ_CALL_LOG` | Read call history |
| `permission.WRITE_CALL_LOG` | Modify call history |
| `permission.ADD_VOICEMAIL` | Add voicemail entries |
| `permission.USE_SIP` | Use SIP services |
| `permission.PROCESS_OUTGOING_CALLS` | Monitor/Modify outgoing calls |
| `permission.BODY_SENSORS` | Access body sensor data (Heart rate, etc.) |
| `permission.RECEIVE_WAP_PUSH` | Receive WAP push messages |
| `permission.RECEIVE_MMS` | Receive MMS messages |
| `permission.READ_CELL_BROADCASTS` | Read cell broadcast messages |
| `permission.BLUETOOTH` | Basic Bluetooth access |
| `permission.BLUETOOTH_ADMIN` | Admin Bluetooth access |
| `permission.BLUETOOTH_CONNECT` | Connect to Bluetooth devices (Android 12+) |
| `permission.BLUETOOTH_SCAN` | Scan for Bluetooth devices (Android 12+) |
| `permission.BLUETOOTH_ADVERTISE` | Advertise via Bluetooth (Android 12+) |
| `permission.ACCESS_NETWORK_STATE` | Read network status |
| `permission.ACCESS_WIFI_STATE` | Read WiFi status |
| `permission.CHANGE_WIFI_STATE` | Modify WiFi status |
| `permission.CHANGE_NETWORK_STATE` | Modify network status |
| `permission.CHANGE_CONFIGURATION` | Modify system configuration |
| `permission.GET_ACCOUNTS` | Access account list |
| `permission.MANAGE_ACCOUNTS` | Manage account information |
| `permission.USE_BIOMETRICS` | Use biometric hardware |
| `permission.USE_FINGERPRINT` | Use fingerprint hardware |
| `permission.USE_IRIS` | Use iris scanner |
| `permission.USE_FACE` | Use face recognition |
| `permission.POST_NOTIFICATIONS` | Post notifications (Android 13+) |
| `permission.READ_MEDIA_IMAGES` | Read image files from media (Android 13+) |
| `permission.READ_MEDIA_VIDEO` | Read video files from media (Android 13+) |
| `permission.READ_MEDIA_AUDIO` | Read audio files from media (Android 13+) |

#### Methods

- `permission.checkPermission(perm: string): Promise<{hasPermission: boolean}>`
- `permission.requestPermission(perm: string): Promise<{hasPermission: boolean}>`
- `permission.requestPermissions(perms: string[]): Promise<{hasPermission: boolean}>`

#### Example Usage

```javascript
const status = await permission.checkPermission(permission.CAMERA);
if (!status.hasPermission) {
    const result = await permission.requestPermission(permission.CAMERA);
    if (result.hasPermission) {
        console.success("Camera permission granted!");
    }
}
```

---

### Spinner Control

The `spinner` object controls a system-level loading overlay, preventing user interaction during long-running background tasks.

#### Methods

- `spinner.show(title?: string, message?: string, cancelable?: boolean): void`
- `spinner.hide(): void`

```javascript
spinner.show("Syncing", "Please wait while we sync your data...");
await sleep(3000);
spinner.hide();
```

> [!NOTE]
> The spinner is cancelable by default, and the hardware back button will dismiss it. Always
> pair `spinner.show()` with a `spinner.hide()` (a `try/finally` is a good place) so it does not
> linger if your task throws.

---

The `sleep` function lets you add pauses to your scripts. This is helpful for timing your data requests.

### Methods

```javascript
interface TimerBridge {
    sleep(ms: number): Promise<void>;
}
```

### Parameters

- `ms`: Time to sleep in milliseconds (must be a positive number)

### Example Usage

#### Basic Sleep
```javascript
// Sleep for 1 second
await sleep(1000);

// Sleep in a loop
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i + 1}`);
    await sleep(500); // Sleep for 500ms between iterations
}
```

```

### Best Practices

1. **Avoid Long Sleeps**
```javascript
// Good - Break long operations into smaller chunks
for (let i = 0; i < 10; i++) {
    await sleep(1000);
    console.log(`Progress: ${(i + 1) * 10}%`);
}

// Avoid
await sleep(10000); // Long sleep blocks the script
```

```

3. **Error Handling**
```javascript
try {
    await sleep(1000);
} catch (error) {
    console.error("Sleep operation failed:", error);
}
```

### Common Use Cases

1. **Rate Limiting**
```javascript
async function processItems(items) {
    for (const item of items) {
        await processItem(item);
        await sleep(100); // Rate limit to 10 items per second
    }
}
```

2. **Loading Animation**
```javascript
async function showLoadingAnimation() {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    
    await sleep(5000);
}

// Alternative loading animation using console.log
async function showSimpleLoadingAnimation() {
    const frames = ['|', '/', '-', '\\'];
    let i = 0;
    
    await sleep(5000);
}
```

3. **Sequential Operations**
```javascript
async function sequentialOperations() {
    console.log("Step 1: Initializing...");
    await sleep(1000);
    
    console.log("Step 2: Processing...");
    await sleep(2000);
    
    console.log("Step 3: Finalizing...");
    await sleep(1000);
    
    console.log("Complete!");
}
```

### Notes

- Sleep operations are non-blocking for the main thread
- Sleep duration must be a non-negative number of milliseconds (negative or non-numeric values are rejected)
- Sleep is capped at 10 minutes (600000 ms); larger values are clamped
- Sleep operations can be cancelled by script termination (including Stop Run)

## User Interface

### Browser Integration

The `browser` object lets your scripts open websites using a built-in browser window.

#### Methods

- `browser.open(url: string, target?: string, config?: BrowserConfig): Promise<InAppBrowserObject>`
- `browser.openSafe(url: string): Promise<InAppBrowserObject>`
- `browser.openFullscreen(url: string): Promise<InAppBrowserObject>`
- `browser.openMinimal(url: string): Promise<InAppBrowserObject>`
- `browser.openExternal(url: string): Promise<InAppBrowserObject>`

> [!IMPORTANT]
> For security, only `http` and `https` URLs are allowed (plus `tel`, `mailto`, `sms`, and `geo`
> when using `openExternal`, which hands off to the system). Script-injection and local-file
> schemes such as `javascript:`, `data:`, and `file:` are blocked and will throw.

#### Configuration (`BrowserConfig`)

The following options can be passed to `browser.open`:

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `zoom` | `'yes' \| 'no'` | `'no'` | Enable/disable viewport zooming |
| `hardwareback` | `'yes' \| 'no'` | `'yes'` | Use hardware back button for navigation |
| `footer` | `'yes' \| 'no'` | `'no'` | Show/hide the footer |
| `location` | `'yes' \| 'no'` | `'no'` | Show/hide the URL location bar |
| `hideurlbar` | `'yes' \| 'no'` | `'yes'` | Hide the URL bar on scroll |
| `hidenavigationbuttons` | `'yes' \| 'no'` | `'no'` | Hide back/forward buttons |
| `toolbarcolor` | `string` | `'#4a4968'` | HEX color for the toolbar |
| `navigationbuttoncolor` | `string` | `'#ffffff'` | HEX color for nav buttons |
| `closebuttoncolor` | `string` | `'#1E1E2A'` | HEX color for close button |
| `toolbar` | `'yes' \| 'no'` | `'yes'` | Show/hide the navigation toolbar |
| `enableViewportScale` | `'yes' \| 'no'` | `'yes'` | Allow user to scale viewport |
| `mediaPlaybackRequiresUserAction` | `'yes' \| 'no'` | `'yes'` | Require touch for media play |
| `shouldPauseOnSuspend` | `'yes' \| 'no'` | `'yes'` | Pause background media |
| `clearcache` | `'yes' \| 'no'` | `'no'` | Clear cache before opening |
| `clearsessioncache` | `'yes' \| 'no'` | `'no'` | Clear session cache before opening |
| `presentationstyle` | `'pagesheet' \| 'fullscreen' \| 'formsheet'` | `'pagesheet'` | No effect on Android |
| `transitionstyle` | `'crossdissolve' \| 'fliphorizontal' \| 'coververtical'` | `'crossdissolve'` | No effect on Android |
| `lefttoright` | `'yes' \| 'no'` | `'yes'` | UI layout direction |
| `fullscreen` | `'yes' \| 'no'` | `'no'` | Open in fullscreen mode |
| `usewkwebview` | `'yes' \| 'no'` | `'yes'` | Use modern WKWebView |
| `keyboardDisplayRequiresUserAction` | `'yes' \| 'no'` | `'yes'` | Require touch for keyboard |

> [!WARNING]
> Do not combine `fullscreen: 'yes'` with `location: 'no'` and `toolbar: 'no'` - that leaves the
> window with no visible control to close it, trapping the user. `openFullscreen()` keeps the
> hardware back button working so the window can still be dismissed. By default the hardware back
> button navigates the page history and closes the window when there is nothing to go back to.

#### Example: Event Handling

```javascript
const instance = await browser.open('https://example.com');

instance.addEventListener('loadstop', (event) => {
    console.success(`Page loaded: ${event.url}`);
});

instance.addEventListener('exit', () => {
    console.log('Browser window closed.');
});
```

### Dialog Interface

The `dialog` object provides simple UI components for interacting with the user or showing status messages.

#### Methods

- `dialog.alert(message: string, title?: string, klass?: string, buttons?: object[]): Promise<number>`
- `dialog.confirm(message: string, title?: string): Promise<boolean>`

> [!TIP]
> Dialog messages support basic HTML tags like `<p>`, `<strong>`, `<i>`, and `<br>` for rich text formatting.

#### Global Functions

For convenience, standard browser-like global functions are available:

- `alert(message: string, title?: string): Promise<number>`
- `confirm(message: string, title?: string): Promise<boolean>`

#### Example Usage

```javascript
// Basic alert
await alert("Operation completed.");

// Confirmation dialog
const confirmed = await confirm("Delete this file?", "Warning");
if (confirmed) {
    console.success("File deleted.");
} else {
    console.warn("Operation cancelled.");
}

// Advanced dialog with custom buttons
const index = await dialog.alert("Wait!", "Are you sure you want to proceed?", "danger", [
    { text: "No", kind: "secondary" },
    { text: "Yes", kind: "primary" }
]);

// Rich text with HTML
await alert(
    "<p>Your session is about to <strong>expire</strong>.</p><p>Please save your work.</p>",
    "Session Warning"
);
```

## Connectivity and Data

### Network Operations

The `network` object provides diagnostic information about the device's current connectivity state and network configuration.

#### Methods

- `network.getConnectionType(): Promise<'WIFI' | 'CELLULAR' | 'NONE'>`
- `network.getIPInfo(): Promise<IPInfo>`
- `network.getWIFIIPInfo(): Promise<IPInfo>`
- `network.getCarrierIPInfo(): Promise<IPInfo>`
- `network.ping(host: string): Promise<PingResult>`
- `network.canConnectToInternet(): Promise<boolean>`
- `network.getRouterIP(): Promise<string>`

#### Interfaces

```typescript
interface IPInfo {
    ipAddress: string;
    subnetMask?: string;
    gateway?: string;
    dns1?: string;
    dns2?: string;
}

interface PingResult {
    success: boolean;
    time: number;  // Response time in ms
    ttl?: number;  // Time to live
}
```

#### Example Usage

```javascript
const connection = await network.getConnectionType();
console.log(`Connected via: ${connection}`);

if (connection === 'WIFI') {
    const ipInfo = await network.getWIFIIPInfo();
    console.log(`Local IP: ${ipInfo.ipAddress}`);
}

const ping = await network.ping("google.com");
console.log(`Ping Success: ${ping.success} (${ping.time}ms)`);
```

### WiFi Operations

Advanced control over the device's WiFi hardware, including scanning and connection management.

#### Methods

- `WIFI.requestPermission(): Promise<boolean>`
- `WIFI.isLocationEnabled(): Promise<boolean>`
- `WIFI.openLocationSettings(): Promise<boolean>`
- `WIFI.scan(): Promise<Array<WifiNetwork>>`
- `WIFI.connect(ssid, bindAll, password?, algorithm?, isHiddenSSID?): Promise<any>`
- `WIFI.suggestConnection(ssid, password, algorithm?, isHiddenSSID?): Promise<any>`  // Android 10+ (API 29+)
- `WIFI.disconnect(ssid?: string): Promise<any>`
- `WIFI.getConnectedSSID(): Promise<string>`   // resolves -1 when not on WiFi
- `WIFI.getConnectedBSSID(): Promise<string>`
- `WIFI.getIP(): Promise<string>`
- `WIFI.isEnabled(): Promise<boolean>`
- `WIFI.enable(): Promise<boolean>`
- `WIFI.disable(): Promise<boolean>`
- `WIFI.isConnectedToInternet(): Promise<boolean>`

**`connect` parameters (positional):**

| Param | Type | Notes |
|-------|------|-------|
| `ssid` | string | Network name |
| `bindAll` | boolean | Route all app traffic through this network |
| `password` | string | Omit for an open network |
| `algorithm` | string | `WPA` or `WEP` only. For WPA2, pass `WPA`. Omit for open networks |
| `isHiddenSSID` | boolean | `true` if the network does not broadcast its SSID |

> [!NOTE]
> `connect` does not resolve until the connection is verified as complete - it can wait up to
> **60 seconds** before resolving or failing. Keep this in mind (a spinner helps) and do not
> assume it hung. It handles the full add-then-enable flow for you.

> [!IMPORTANT]
> Scanning requires location permission AND location services turned on (an Android rule).
> Call `WIFI.requestPermission()` first, and check `WIFI.isLocationEnabled()`.

> [!TIP]
> On Android 10+ (API 29+), apps can no longer silently join arbitrary networks. Use
> `WIFI.suggestConnection(ssid, password, algorithm, isHiddenSSID)` to suggest a network for
> internet access across the device; its `algorithm` accepts `WPA`, `WPA2`, or `WPA3`.

#### Interfaces

```typescript
interface WifiNetwork {
    SSID: string;
    BSSID: string;
    level: number;       // Signal strength in dBm (e.g. -45 strong, -85 weak)
    frequency: number;   // In MHz
    capabilities: string; // Encryption types (e.g., [WPA2-PSK-CCMP])
    channelWidth: number;
    timestamp: number;
}
```

#### Example: connect to the strongest open-or-known network

```javascript
await WIFI.requestPermission();
const networks = await WIFI.scan();
const strongest = networks.sort((a, b) => b.level - a.level)[0];
console.log(`Connecting to ${strongest.SSID} (${strongest.level} dBm)`);
await WIFI.connect(strongest.SSID, false, 'your_password', 'WPA', false);
console.log('Now on:', await WIFI.getConnectedSSID(), 'IP:', await WIFI.getIP());
```

#### Example Usage

```javascript
await WIFI.requestPermission();

// Scan for networks
const networks = await WIFI.scan();
console.table(networks); // Great way to view the list!

// Find a specific network
const home = networks.find(n => n.SSID === "Home_WiFi");
if (home) {
    console.log(`Found ${home.SSID} at ${home.level}dBm`);
}
```

The `http` bridge is a powerful way for your scripts to talk to web APIs. It can bypass standard website restrictions, making it easy to connect your phone to other services.

#### Methods

- `http.sendRequest(url: string, options: object): Promise<HttpResponse>`
- `http.setHeader(domain: string, header: string, value: string): void`
- `http.uploadFile(url: string, options: object): Promise<object>`
- `http.downloadFile(url: string, options: object): Promise<object>`

#### Example: Fetching an API

```javascript
try {
    const response = await http.sendRequest('https://api.example.com/data', {
        method: 'get',
        headers: { Authorization: 'Bearer TOKEN' }
    });
    
    // Status and Data
    console.log(`Status: ${response.status}`);
    console.log("API Response:", response.data);
} catch (error) {
    console.error("Request failed", error);
}
```

### SMS Operations

The `SMS` object allows scripts to interface with the device's messaging capabilities.

#### Methods

- `SMS.sendSMS(phoneNumber: string, message: string): Promise<void>`
- `SMS.listSMS(filter: SMSFilter): Promise<Array<SMSMessage>>`

#### Interfaces

```typescript
interface SMSMessage {
    address: string;  // Phone number
    body: string;     // Text content
    date: number;     // Timestamp
    type: number;     // 1 = Inbox, 2 = Sent
}

interface SMSFilter {
    box?: 'inbox' | 'sent' | 'draft' | 'outbox';
    address?: string;
    body?: string;
    indexFrom?: number;
    maxCount?: number;
}
```

#### Example Usage

```javascript
// Scan inbox for messages from a specific sender
const messages = await SMS.listSMS({
    box: 'inbox',
    address: 'BANK_ABC',
    maxCount: 5
});

messages.forEach(msg => {
    console.log(`[${new Date(msg.date).toLocaleTimeString()}] ${msg.body}`);
});
```

---

## Hardware & System

### Clipboard Operations

The `clipboard` object allows you to interact with the device's clipboard.

#### Methods

- `clipboard.setText(text: string): Promise<boolean>`

#### Example Usage

```javascript
await clipboard.setText("Copied from PhoneDo Script!");
```

---

### Device Information

Access device-specific metadata and system-level hardware triggers.

#### Properties (Read-Only)

- `device.model`: string
- `device.platform`: string
- `device.version`: string        // OS version
- `device.manufacturer`: string
- `device.uuid`: string
- `device.serial`: string
- `device.isVirtual`: boolean
- `device.isCharging`: boolean     // snapshot taken at script start
- `device.batteryLevel`: number    // snapshot taken at script start

> [!NOTE]
> `device` values (including `batteryLevel` and `isCharging`) are read once when the script
> starts and do not update live during the run.

#### Methods

- `device.vibrate(duration: number): void`
- `device.beep(): void`

#### Example Usage

```javascript
console.log(`Model: ${device.model}`);
device.vibrate(500);  // Vibrates for 500ms
```

The `fs` object lets you work with files on your device. It uses specific locations to make sure your data is saved in the right place.

> [!TIP]
> The directory argument is optional. If you pass `undefined` (or omit it), file methods default
> to `fs.DATA_DIR` - the app-private storage that always exists and needs no permission. Use an
> explicit location like `fs.EX_ROOT_DIR` only when you need files the user can see, and note that
> shared/external locations may require storage permission and are restricted on newer Android.

#### Storage Locations

| Constant | Description | Access |
|----------|-------------|--------|
| `fs.APP_ROOT_DIR` | Internal Documents directory | Private |
| `fs.APP_DIR` | Ready-only application bundles | Private |
| `fs.APP_STORAGE_DIR` | Application-specific storage | Private |
| `fs.DATA_DIR` | Private persistent data storage | Private |
| `fs.CACHE_DIR` | Temporary data storage (Cache) | Private |
| `fs.EX_APP_STORAGE_DIR` | External application storage | Shared |
| `fs.EX_DATA_DIR` | External persistent data | Shared |
| `fs.EX_CACHE_DIR` | External temporary storage | Shared |
| `fs.EX_ROOT_DIR` | Root external storage (SD Card) | Shared |

#### Methods

- `fs.readTextFile(path: string, fileName: string): Promise<string>`
- `fs.writeTextFile(path: string, fileName: string, content: string): Promise<void>`
- `fs.appendTextFile(path: string, fileName: string, content: string): Promise<void>`
- `fs.createDirectory(path: string, dirName: string): Promise<void>`
- `fs.dirExists(path: string): Promise<boolean>`
- `fs.createFile(path: string, fileName: string, content: string): Promise<string>` // Returns URI
- `fs.writeTextFile(path: string, fileName: string, content: string): Promise<void>`
- `fs.appendTextFile(path: string, fileName: string, content: string): Promise<void>`
- `fs.readTextFile(path: string, fileName: string): Promise<string>`
- `fs.fileExists(path: string, fileName: string): Promise<boolean>`
- `fs.deleteFile(path: string, fileName: string): Promise<void>`
- `fs.removeDirectory(path: string, dirName: string): Promise<void>`
- `fs.resolveLocalFileSystemURL(url: string): Promise<object>`
- `fs.fileURLToPath(fileURL: string): string`

#### Example: File Operations

```javascript
const path = fs.DATA_DIR;
const fileName = "test.txt";

await fs.writeTextFile(path, fileName, "Hello PhoneDo!");
const exists = await fs.fileExists(path, fileName);
if (exists) {
    const content = await fs.readTextFile(path, fileName);
    console.info("File Content:", content);
}
```

---

### Hardware & System

### Flashlight Control

The `flashlight` object gives you direct control over the device's camera flash.

#### Methods

- `flashlight.switchOn(): Promise<boolean>`
- `flashlight.switchOff(): Promise<boolean>`
- `flashlight.toggleState(): Promise<boolean>`

#### Example Usage

```javascript
await flashlight.switchOn();
await sleep(1000);
await flashlight.switchOff();
```

> [!TIP]
> The flashlight needs no runtime permission (it is handled for you). Always switch it off before
> your script ends - a torch left on stays on after the script finishes.

---

## Error Handling

Most bridge operations are asynchronous and may throw errors due to permission issues, hardware state, or invalid parameters. Always wrap bridge calls in a `try...catch` block.

```javascript
try {
    await SMS.sendSMS("555-0199", "Automated alert from PhoneDo.");
} catch (error) {
    console.error(`Action failed: ${error.message || error}`);
}
```


### Bluetooth (BLE)

The `bluetooth` object provides comprehensive control over Bluetooth Low Energy (BLE) scanning and communication.

#### Methods

- `bluetooth.scan(onDeviceFound?, onScanError?, timeoutSeconds?): Promise<Array<BLEDevice>>`
- `bluetooth.stopScan(): Promise<void>`
- `bluetooth.connect(device, onConnected?, onDisconnected?, onConnectError?, options?): Promise<BLEDevice>`
- `bluetooth.getService(device: BLEDevice, serviceUUID: string): Promise<BLEService>`
- `bluetooth.getCharacteristic(service: BLEService, characteristicUUID: string): Promise<BLECharacteristic>`
- `bluetooth.readCharacteristic(device: BLEDevice, characteristic: BLECharacteristic): Promise<ArrayBuffer>`
- `bluetooth.writeCharacteristic(device: BLEDevice, characteristic: BLECharacteristic, data: ArrayBuffer): Promise<void>`

> [!NOTE]
> `scan()` takes the callbacks first and the timeout (in **seconds**) last. All three arguments
> are optional. It scans for the timeout period, then **resolves an array of the devices found**
> (de-duplicated), so you can simply `const devices = await bluetooth.scan(null, null, 8);`.
> Requires Bluetooth on and BLE/location permission.

> [!TIP]
> `connect()` performs automatic service discovery, so after it resolves you can go straight to
> `getService` / `getCharacteristic`. If a service has two characteristics with the **same UUID**
> (rare), `getCharacteristic` returns only the first one found.

#### Interfaces

```typescript
interface BLEDevice {
    name?: string;
    address: string;    // MAC address
    rssi: number;       // Signal strength
    advertisementData?: object;
}

interface BLEService {
    uuid: string;
    device: BLEDevice;
}

interface BLECharacteristic {
    uuid: string;
    service: BLEService;
    properties: string[]; // ['read', 'write', 'notify', etc]
}
```

#### Example: BLE Scanning and Connection

```javascript
try {
    // Scan for 8 seconds. Callbacks are optional; the resolved array is usually enough.
    const devices = await bluetooth.scan(
        (device) => console.info(`Found: ${device.name || 'Unknown'} [${device.address}]`),
        (error) => console.error("Scan Error:", error),
        8
    );

    console.log(`Discovered ${devices.length} device(s).`);
    // Pick one from `devices` and pass it to bluetooth.connect(...) to talk to it.
} catch (e) {
    console.error("Bluetooth operation failed:", e);
}
```

---

### HTTP Client

The `http` object is a powerful, low-level bridge for web requests that bypasses many browser-based restrictions.

#### Methods

- `http.initializeSettings(): Promise<void>`
- `http.sendRequest(url: string, options: HttpOptions): Promise<HttpResponse>`
- `http.uploadFile(url: string, params: object, headers: object, filePath: string, name: string): Promise<HttpResponse>`
- `http.downloadFile(url: string, params: object, headers: object, filePath: string): Promise<{entry: object, response: HttpResponse}>`
- `http.setHeader(hostname: string, header: string, value: string): Promise<boolean>`
- `http.setDataSerializer(serializer: 'urlencoded' | 'json' | 'utf8' | 'multipart' | 'raw'): Promise<boolean>`
- `http.setTimeout(timeout: number): Promise<boolean>`
- `http.setServerTrustMode(mode: 'default' | 'nocheck' | 'pinned' | 'legacy'): Promise<boolean>`
- `http.getCookieString(url: string): Promise<string>`
- `http.setCookie(url: string, cookie: string, options?: object): Promise<boolean>`
- `http.clearCookies(): Promise<boolean>`

#### `HttpOptions`

| Option | Type | Description |
|--------|------|-------------|
| `method` | `string` | `get`, `post`, `put`, `patch`, `delete`, `head`, `options`, `upload`, `download` |
| `data` | `object` | Request body data |
| `params` | `object` | Query parameters |
| `headers` | `object` | Request headers |
| `timeout` | `number` | Request timeout in seconds |
| `responseType`| `string` | `text`, `json`, `arraybuffer`, `blob` |

> [!TIP]
> Notes from the underlying HTTP engine that are easy to miss:
> - **`setHeader` includes the port.** A header set for `example.com` will NOT apply to
>   `example.com:8080`. Match the exact host (and port) you request.
> - **Serializer must match your data.** `urlencoded` (the default) and `json` expect an object;
>   `utf8` expects a string; `raw` expects a `Uint8Array`/`ArrayBuffer`. Importantly, `urlencoded`
>   cannot serialize nested objects - use `http.setDataSerializer('json')` for structured bodies.
> - **Encode special characters in the URL yourself** (for example with `encodeURI()`); the query
>   string is not auto-encoded for you.
> - **`setServerTrustMode('nocheck')`** disables TLS certificate checking. Only ever use it for
>   local testing; never against real servers.

#### Error Codes (`http.ERROR_CODES`)

| Constant | Value |
|----------|-------|
| `ERROR_CODES.PERMISSION_DENIED` | `-12` |
| `ERROR_CODES.NOT_FOUND` | `-1` |
| `ERROR_CODES.SECURITY_ERR` | `-2` |
| `ERROR_CODES.ABORT_ERR` | `-3` |
| `ERROR_CODES.NOT_READABLE_ERR` | `-4` |
| `ERROR_CODES.ENCODING_ERR` | `-5` |
| `ERROR_CODES.NO_MODIFICATION_ALLOWED_ERR` | `-6` |
| `ERROR_CODES.INVALID_STATE_ERR` | `-7` |
| `ERROR_CODES.SYNTAX_ERR` | `-8` |
| `ERROR_CODES.INVALID_MODIFICATION_ERR` | `-9` |
| `ERROR_CODES.QUOTA_EXCEEDED_ERR` | `-10` |
| `ERROR_CODES.TYPE_MISMATCH_ERR` | `-11` |

#### Example: Post Request

```javascript
const response = await http.sendRequest('https://api.example.com/login', {
    method: 'post',
    data: {
        username: 'admin',
        password: 'password123'
    },
    headers: {
        'Content-Type': 'application/json'
    }
});

console.log("Status:", response.status);
console.log("Data:", response.data);
```

---

### SIM Card Operations

The `sim` object allows retrieval of information about the SIM card and placing direct calls.

#### Methods

- `sim.hasPermission(): Promise<boolean>`
- `sim.requestPermission(): Promise<boolean>`
- `sim.getInfo(): Promise<SimInfo>`
- `sim.callNumber(number: string, bypassAppChooser?: boolean): Promise<any>`

> [!IMPORTANT]
> `sim.getInfo()` reads the SIM through Android's `TelephonyManager`/`SubscriptionManager`, which
> require the `READ_PHONE_STATE` permission (Android 6+). Always call `sim.requestPermission()`
> first and proceed only if it resolves true. `sim.callNumber(number, true)` dials immediately;
> pass `false` to show the app chooser instead.

#### Interfaces

```typescript
interface SimInfo {
    carrierName: string;
    countryCode: string;
    mcc: string;
    mnc: string;
    phoneNumber?: string;
    deviceId?: string;
    simSerialNumber?: string;
    subscriberId?: string;
}
```

#### Example Usage

```javascript
if (await sim.requestPermission()) {
    const info = await sim.getInfo();
    console.log(`Carrier: ${info.carrierName}`);
    console.log(`Phone: ${info.phoneNumber || 'Unknown'}`);
}
```

### Speech and Voice

The `utter` object provides capabilities for Text-to-Speech (TTS) and Speech-to-Text (STT).

#### Methods

**Text to Speech**

- `utter.speak(text: string, rate?: number, pitch?: number, identifier?: string): Promise<void>`
- `utter.getVoices(): Promise<Array<{ name: string, identifier: string, language: string }>>`

`rate` and `pitch` are roughly 0-1 (rate defaults to ~0.95, pitch to 1). `identifier` is a voice
id from `getVoices()`; if omitted, the device default voice is used.

**Speech to Text**

- `utter.canListen(): Promise<boolean>`      // is speech recognition available
- `utter.hasPermission(): Promise<boolean>`  // microphone permission
- `utter.requestPermission(): Promise<boolean>`
- `utter.listen(options?: ListenOptions): Promise<string[]>`  // resolves best-match candidates
- `utter.stopListening(): Promise<void>`

> [!IMPORTANT]
> Speech recognition (`listen`) **requires an internet connection** and the `RECORD_AUDIO`
> (microphone) permission. Check `utter.canListen()` first, then `utter.hasPermission()` /
> `utter.requestPermission()`. Text to speech (`speak`) works offline.

```typescript
interface ListenOptions {
    language?: string;    // e.g. 'en-US' (default)
    matches?: number;     // number of candidate results (default 5)
    prompt?: string;      // Android only: text shown in the listen popup
    showPopup?: boolean;  // Android only: show the listen popup (default true)
    showPartial?: boolean;// stream partial results (default false)
}
```

#### Example

```javascript
// Speak
const voices = await utter.getVoices();
await utter.speak("Bridge initialized successfully", 0.95, 1.0, voices[0] && voices[0].identifier);

// Listen
if (await utter.canListen()) {
    if (!(await utter.hasPermission())) await utter.requestPermission();
    const results = await utter.listen({ language: 'en-US', matches: 5 });
    console.log("You said:", results[0]);
}
```

---

### Notes & Limitations

- **Platform**: PhoneDo is an Android application. All bridges target Android; there is no iOS build.
- **Async Pattern**: All methods returning a `Promise` should be used with `await` to ensure correct execution order.
- **Permissions**: Runtime permissions are required for sensitive hardware access (Android 6+ grants them at run time, not install time). Always request via the `permission` bridge before using a feature that needs it.
- **Stopping**: A script that yields to the event loop (uses `sleep`, `prompt`, or awaits a bridge) can be stopped with **Stop Run**. A purely synchronous loop cannot be interrupted, so give long loops an `await sleep(...)`.
