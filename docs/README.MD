
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

// Logging multiple values
const user = { name: "John", age: 30 };
console.log("User details:", user);

// Clearing the console
console.clear();
// or
console.cls();
```

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

The `sleep` and `sleepWithProgress` functions let you add pauses to your scripts. These are helpful for timing your data requests or showing progress bars to the user.

### Methods

```javascript
interface TimerBridge {
    sleep(ms: number): Promise<void>;
    sleepWithProgress(ms: number, onProgress?: (progress: number) => void): Promise<void>;
}
```

### Parameters

- `ms`: Time to sleep in milliseconds (must be a positive number)
- `onProgress`: Optional callback function that receives progress updates (0-100)

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

#### Sleep with Progress
```javascript
// Basic progress tracking
await sleepWithProgress(5000, (progress) => {
    console.log(`Loading... ${progress.toFixed(1)}%`);
});

// Progress bar in console
await sleepWithProgress(3000, (progress) => {
    const bar = '='.repeat(Math.floor(progress / 2)) + '>';
    console.log(`[${bar.padEnd(50, ' ')}] ${progress.toFixed(1)}%`);
});
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

2. **Use Progress for User Feedback**
```javascript
async function processWithFeedback() {
    console.log("Starting process...");
    await sleepWithProgress(5000, (progress) => {
        if (progress % 20 === 0) {
            console.log(`Still working... ${progress}% complete`);
        }
    });
    console.log("Process complete!");
}
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
    
    await sleepWithProgress(5000, () => {
        console.log(`\r${frames[i]} Loading...`);
        i = (i + 1) % frames.length;
    });
}

// Alternative loading animation using console.log
async function showSimpleLoadingAnimation() {
    const frames = ['|', '/', '-', '\\'];
    let i = 0;
    
    await sleepWithProgress(5000, () => {
        console.log(`Loading ${frames[i]} `);
        i = (i + 1) % frames.length;
    });
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
- Progress updates occur every 100ms
- Sleep duration must be a positive number
- Progress callback is optional
- Sleep operations can be cancelled by script termination
- Consider using `sleepWithProgress` for operations longer than 1 second
- Sleep operations are precise to the millisecond
- Progress updates are rounded to 2 decimal places

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

```javascript
// Basic alert
await dialog.alert("Configuration successfully updated.");

// Advanced alert with title
await dialog.alert("Wait!", "Are you sure you want to proceed?");
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

The `network` object provides diagnostic information about the device's current connectivity state.

#### Methods

- `network.getConnectionType(): Promise<'WIFI' | 'CELLULAR' | 'NONE'>`
- `network.getIPInfo(): Promise<object>`
- `network.ping(host: string): Promise<{success: boolean, time: number}>`
- `network.canConnectToInternet(): Promise<boolean>`

### WiFi Operations

Advanced control over the device's WiFi hardware, including scanning and connection management.

#### Methods

- `WIFI.requestPermission(): Promise<boolean>`
- `WIFI.scan(): Promise<Array<WifiNetwork>>`
- `WIFI.connect(config: WifiConfig): Promise<boolean>`
- `WIFI.getConnectedSSID(): Promise<string>`
- `WIFI.disconnect(): Promise<void>`

> [!IMPORTANT]
> Always call `WIFI.requestPermission()` before attempting to scan or connect.

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
    console.log("API Response:", response.data);
} catch (error) {
    console.error("Request failed", error);
}
```

### SMS Operations

The `SMS` object allows scripts to interface with the device's messaging capabilities.

#### Methods

- `SMS.sendSMS(phoneNumber: string, message: string): Promise<void>`
- `SMS.listSMS(filter: object): Promise<Array<SMSMessage>>`

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

## Network Operations

### Network Connectivity Information

The `network` object provides methods to access information about network connectivity.

```javascript
network.getConnectionType();    // Retrieves the current network connection type.
network.getWIFIIPInfo();        // Retrieves information regarding the current WiFi connection.
network.getCarrierIPInfo();     // Retrieves IP information for cellular connections.
network.getHTTPProxyInfo(url);  // Retrieves proxy information for the given URL.
network.ping(host);             // Performs a ping operation to the specified host.
network.getIPInfo();            // Retrieves IP address information.
network.getRouterIP();          // Retrieves the IP of the connected router.
network.canConnectToRouter();   // Checks if the device can connect to a router.
network.canConnectToInternet(); // Checks if the device has internet connectivity.
```

#### Example Usage

```javascript
const connection = await network.getConnectionType();
if (connection === "WIFI") {
   console.log("Device is connected via WiFi.");
   const ipInfo = await network.getWIFIIPInfo();
    console.log(`IP Address: ${ipInfo.ipAddress}`);
} else if (connection === "CELLULAR") {
    console.log("Device is connected via cellular network.");
} else {
    console.log("No network connection available.");
}

const ping = await network.ping("google.com");
console.log(`Ping result: Success=${ping.success}, Time=${ping.time}`);
```
*Note: The `getConnectionType()` function returns 'WIFI', 'CELLULAR', or 'NONE'. The `ttl` property in a ping result may be undefined when a ping fails.*

## WiFi Operations

### WiFi Connection Management

The `WIFI` object provides methods for interacting with the device's WiFi capabilities.

```javascript
  WIFI.enable();                        // Enables the device's WiFi adapter.
  WIFI.disable();                       // Disables the device's WiFi adapter.
  WIFI.requestPermission();             // Requests necessary permissions for WiFi access.
  WIFI.suggestConnection(config);      // Proposes a new WiFi network for internet access across apps.
  WIFI.specifierConnection(config);    // Requests to connect to a wifi network specifically for this app.
  WIFI.scan();                          // Scans for available WiFi networks.
  WIFI.connect(config);                // Connects to a specified WiFi network.
  WIFI.disconnect(ssid);                // Disconnects from a given WiFi network.
  WIFI.reconnect();                      // Reconnects to the last used WiFi.
  WIFI.reassociate();                    // Reassociates to the last used wifi.
  WIFI.getConnectedSSID();              // Retrieves the SSID of the currently connected WiFi network.
  WIFI.getConnectedBSSID();             // Retrieves the BSSID of the currently connected WiFi network.
  WIFI.getConnectedNetworkID();          // Retrieves the ID of the currently connected WiFi network.
  WIFI.listNetworks();                  // Lists all configured WiFi networks.
  WIFI.getSSIDNetworkID(ssid);           // Retrieves the network ID for a specific SSID.
  WIFI.formatConfig(config);           // Returns a valid WifiConfig object using specified properties.
  WIFI.addNetwork(config);              // Adds a new WiFi network to the list of known networks.
  WIFI.removeNetwork(networkId);       // Removes a WiFi network using its ID.
  WIFI.enableNetwork(networkId, disableOthers, isTemporary); // Enables a specific network.
  WIFI.disableNetwork(networkId);      // Disables a specific WiFi network
  WIFI.isConnectedToInternet();        // Checks if the device has internet access.
  WIFI.getIP();                         // Retrieves the device's IP address on the WiFi network.
  WIFI.getIPInfo();                  // Retrieves more detailed IP information.
  WIFI.getRouterIP();                    // Retrieves the IP of the connected router.
  WIFI.isLocationEnabled();            // Checks if location services are enabled.
  WIFI.openLocationSettings();         // Opens location settings.
  WIFI.setBindAll();                   // Forces the app to use this network only.
  WIFI.resetBindAll();                 // Resets the network restrictions.
  WIFI.timeout(ms);                     // Adds a timeout for a specific wifi operation.
```
*Note: The `requestPermission()` method must be called to use most WiFi methods. `suggestConnection` and `specifierConnection` are required for connecting to new networks on Android 10+, `connect` and `addNetwork` are deprecated. `BSSID` indicates the MAC address of the access point.*

#### Example Usage

```javascript
try {
    await WIFI.requestPermission();
    const networks = await WIFI.scan();
    console.log(`Available networks: ${networks.length}`);

    const targetNetwork = networks.find(n => n.ssid === "MyNetwork");
     if (targetNetwork) {
        const config = WIFI.formatConfig({
        ssid: targetNetwork.ssid,
        password: "password123",
        security: "WPA2"
        });
        const connectionSuccess = await WIFI.connect(config);
        if(connectionSuccess){
            console.log("Connection successful.");
        } else{
            console.error("Connection failed.");
        }
    } else{
        console.warn("Network not found.");
    }

} catch (e) {
    console.error("WiFi operation failed:", e);
}
```
*Tip: To troubleshoot connection issues, attempt to remove the network configuration with `WIFI.getSSIDNetworkID(ssid)` and `WIFI.removeNetwork(id)` before attempting to reconnect.*

### Bluetooth (BLE)

The `bluetooth` object provides comprehensive control over Bluetooth Low Energy (BLE) scanning and communication.

#### Methods

- `bluetooth.scan(timeout: number, onDeviceFound: (device: object) => void, onScanError: (error: any) => void): Promise<void>`
- `bluetooth.stopBTScan(): Promise<void>`
- `bluetooth.connectBT(device: object, onConnected: (device: object) => void, onDisconnected: (device: object) => void, onConnectError: (error: any) => void, options?: object): Promise<object>`
- `bluetooth.getBTService(device: object, serviceUUID: string): Promise<object>`
- `bluetooth.getBTCharacteristic(service: object, characteristicUUID: string): Promise<object>`
- `bluetooth.readBTCharacteristic(device: object, characteristic: object): Promise<ArrayBuffer>`
- `bluetooth.writeBTCharacteristic(device: object, characteristic: object, data: ArrayBuffer): Promise<void>`
- `bluetooth.enableBTNotification(device: object, characteristic: object, onData: (data: ArrayBuffer) => void): Promise<void>`
- `bluetooth.disableBTNotification(device: object, characteristic: object): Promise<void>`

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
- `sim.getInfo(): Promise<object>`
- `sim.callNumber(number: string, bypassAppChooser?: boolean): Promise<any>`

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
