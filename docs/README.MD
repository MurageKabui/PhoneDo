
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

## Core Utilities

### Global Aliases

These functions are available globally in the script environment for convenience:

```javascript
cout(...messages: any[]): void;    // Alias for log()
log(...messages: any[]): void;     // Alias for log()
exit(exitCode?: number): void;     // Terminates the script execution
```

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
- Sleep duration must be a positive number
- Sleep operations can be cancelled by script termination
- Sleep operations are precise to the millisecond

## User Interface

### Browser Integration

The `browser` object lets your scripts open websites using a built-in browser window.

#### Methods

- `browser.open(url: string, target?: string, config?: BrowserConfig): Promise<InAppBrowserObject>`
- `browser.openSafe(url: string): Promise<InAppBrowserObject>`
- `browser.openFullscreen(url: string): Promise<InAppBrowserObject>`
- `browser.openMinimal(url: string): Promise<InAppBrowserObject>`
- `browser.openExternal(url: string): Promise<InAppBrowserObject>`

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
| `presentationstyle` | `'pagesheet' \| 'fullscreen' \| 'formsheet'` | `'pagesheet'` | Visual mode (iOS) |
| `transitionstyle` | `'crossdissolve' \| 'fliphorizontal' \| 'coververtical'` | `'crossdissolve'` | Transition animation (iOS) |
| `lefttoright` | `'yes' \| 'no'` | `'yes'` | UI layout direction |
| `fullscreen` | `'yes' \| 'no'` | `'no'` | Open in fullscreen mode |
| `usewkwebview` | `'yes' \| 'no'` | `'yes'` | Use modern WKWebView |
| `keyboardDisplayRequiresUserAction` | `'yes' \| 'no'` | `'yes'` | Require touch for keyboard |

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

### Spinner Control

The `spinner` object controls a system-level loading overlay, preventing user interaction during long-running background tasks.

#### Methods

- `spinner.show(title?: string, message?: string): void`
- `spinner.hide(): void`

```javascript
spinner.show("Syncing", "Please wait while we sync your data...");
await sleep(3000);
spinner.hide();
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
- `WIFI.scan(): Promise<Array<WifiNetwork>>`
- `WIFI.connect(config: WifiConfig): Promise<boolean>`
- `WIFI.disconnect(ssid?: string): Promise<void>`
- `WIFI.getConnectedSSID(): Promise<string>`
- `WIFI.isEnabled(): Promise<boolean>`
- `WIFI.enable(): Promise<boolean>`
- `WIFI.disable(): Promise<boolean>`

> [!IMPORTANT]
> Always call `WIFI.requestPermission()` before attempting to scan or connect.

#### Interfaces

```typescript
interface WifiNetwork {
    SSID: string;
    BSSID: string;
    level: number;       // Signal strength in dBm
    frequency: number;   // In MHz
    capabilities: string; // Encryption types (e.g., [WPA2-PSK-CCMP])
    channelWidth: number;
    timestamp: number;
}

interface WifiConfig {
    ssid: string;
    password?: string;
    algorithm?: 'WPA' | 'WEP' | 'NONE';
    isHiddenSSID?: boolean;
}
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
- `device.osVersion`: string (uuid mapped in bridge)
- `device.manufacturer`: string
- `device.uuid`: string
- `device.isCharging`: boolean
- `device.batteryLevel`: number
- `device.serial`: string
- `device.isVirtual`: boolean

#### Methods

- `device.vibrate(duration: number): void`
- `device.beep(): void`

#### Example Usage

```javascript
console.log(`Model: ${device.model}`);
device.vibrate(500);  // Vibrates for 500ms
```

The `fs` object lets you work with files on your device. It uses specific locations to make sure your data is saved in the right place.

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

- `bluetooth.scan(timeout: number, onDeviceFound: (device: BLEDevice) => void, onScanError: (error: any) => void): Promise<void>`
- `bluetooth.stopBTScan(): Promise<void>`
- `bluetooth.connectBT(device: BLEDevice, onConnected: (device: BLEDevice) => void, onDisconnected: (device: BLEDevice) => void, onConnectError: (error: any) => void, options?: object): Promise<BLEDevice>`
- `bluetooth.getBTService(device: BLEDevice, serviceUUID: string): Promise<BLEService>`
- `bluetooth.getBTCharacteristic(service: BLEService, characteristicUUID: string): Promise<BLECharacteristic>`
- `bluetooth.readBTCharacteristic(device: BLEDevice, characteristic: BLECharacteristic): Promise<ArrayBuffer>`
- `bluetooth.writeBTCharacteristic(device: BLEDevice, characteristic: BLECharacteristic, data: ArrayBuffer): Promise<void>`

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
    // Scan for 10 seconds
    await bluetooth.scan(10, (device) => {
        console.info(`Found Device: ${device.name || 'Unknown'} [${device.address}]`);
    }, (error) => {
        console.error("Scan Error:", error);
    });

    // Note: You would usually find a specific device from the scan results to connect to
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

- `utter.speak(text: string, options?: UtterOptions): Promise<void>`
- `utter.getVoices(): Promise<Array<Voice>>`
- `utter.listen(options?: ListenOptions): Promise<string>`
- `utter.stopListening(): void`
- `utter.requestPermission(): Promise<boolean>`

```javascript
const voices = await utter.getVoices();
await utter.speak("Bridge initialized successfully", { voice: voices[0] });
```

---

### Notes & Limitations

- **Platform Support**: While Core and Connectivity bridges are cross-platform, hardware-specific triggers (like SIM or Flashlight) are primarily optimized for Android.
- **Async Pattern**: All methods returning a `Promise` should be used with `await` to ensure correct execution order.
- **Permissions**: Runtime permissions are required for sensitive hardware access. Always check the `permission` bridge before execution.
