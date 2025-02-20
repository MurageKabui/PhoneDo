
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

This document provides comprehensive technical specifications for the PhoneDo Scripting API, which enables developers to interact with various native device functionalities through custom scripts. This API facilitates access to hardware resources and system services within a sandboxed environment.

## Table of Contents

- [Console and Output](#console-and-output)
- [Device Hardware](#device-hardware)
- [File System](#file-system)
- [Network Operations](#network-operations)
- [WiFi Operations](#wifi-operations)
- [Bluetooth Operations](#bluetooth-operations)
- [SIM Card Operations](#sim-card-operations)
- [Speech and Voice](#speech-and-voice)
- [Clipboard Operations](#clipboard-operations)
- [Dialog Interface](#dialog-interface)

## Console and Output

### Console Interface

The `console` object provides a structured interface for logging output within the application's "console" (PhoneDo Terminal). This allows for script runtime debugging and monitoring of script execution.

#### Methods

```javascript
console.log(message);      // Logs a general styled message.
console.info(message);     // Logs an informational styled message.
console.warn(message);     // Logs a warning styled message.
console.error(message);    // Logs an error styled message.
console.success(message);  // Logs a success styled message.
console.clear();           // Clears the console output.
console.cls();             // Alias for clear(), for legacy familiarity
```
*Note: `cls()` is an alias of `clear()`, maintained for familiarity with other console-based interfaces.*

#### Example Usage

```javascript
const userName = "PhoneDo User";
console.log("User: " + userName);
console.warn("Executing test script.");
console.success("Operation successful.");
console.clear();
console.cls(); // Equivalent to console.clear();
```

## Device Hardware

### Flashlight Control

The `flashlight` object provides methods for programmatically controlling the device's flashlight.

```javascript
flashlight.switchOn();    // Activates the device's flashlight.
flashlight.switchOff();   // Deactivates the device's flashlight.
flashlight.toggleState(); // Toggles the current state of the flashlight.
```
*Note: These methods return a `Promise<boolean>`, resolving with `true` upon successful execution or `false` if an error happens.*

#### Example Usage

```javascript
const bTurnedOn = await flashlight.switchOn();
console.log(`Flashlight On : ${bTurnedOn}`);
```

### Device Information and Controls

The `device` object provides access to read-only properties containing information about the device. It also includes a few methods for basic device controls..

```javascript
const device = {
    manufacturer: string;   // Device manufacturer.
    model: string;          // Device model.
    osVersion: string;      // Device operating system version.
    sdkVersion: number;     // Device SDK version.
}

device.vibrate(duration?);  // Initiates device vibration with a specified duration.
device.beep();              // Emits an audible beep sound.
```
*Note: The `device` properties are read-only values that cannot be modified via the API. Beep should be used sparingly.*

#### Example Usage

```javascript
console.log(`Device Information:\nManufacturer: ${device.manufacturer}\nModel: ${device.model}\nOS Version: ${device.osVersion}`);

device.vibrate(500);  // Vibrates the device for 500 milliseconds.
device.beep();        // Emits a single beep.
```

### File System Operations

The `fs` object provides methods for accessing and managing the device's file system. It includes predefined root directories where you can place directories and files from your scripts. File operations can use one of these constants for added convenience.

#### Root Directory Constants

| Constant | Description |
|----------|-------------|
| `fs.APP_ROOT_DIR` | Base directory for the application |
| `fs.APP_DIR` | Read-only directory where the application is installed |
| `fs.APP_STORAGE_DIR` | Root directory of the application's sandbox (private to the app) |
| `fs.DATA_DIR` | Persistent and private data storage within the application's sandbox |
| `fs.CACHE_DIR` | Directory for temporary cached data files |
| `fs.EX_APP_STORAGE_DIR` | Application space on external storage |
| `fs.EX_DATA_DIR` | App-specific data files on external storage |
| `fs.EX_CACHE_DIR` | Application cache on external storage |
| `fs.EX_ROOT_DIR` | External storage (SD card) root |

#### Available Methods

```javascript
fs.readTextFile(path, fileName)               // Read the content of a text file
fs.writeTextFile(path, fileName, content)     // Write text to a file (creates if doesn't exist)
fs.appendTextFile(path, fileName, content)    // Append text to an existing file
fs.createDirectory(path, dirName)             // Create a new directory
fs.dirExists(path)                            // Check if a directory exists
fs.fileExists(path, fileName)                 // Check if a file exists
fs.createFile(path, fileName)                 // Create a new empty file
fs.deleteFile(path, fileName)                 // Delete a file
fs.removeDirectory(path, dirName)             // Remove a directory
```

#### Important Notes:
- All methods are asynchronous and return Promises
- If path parameter is undefined, it defaults to the system's document directory
- File paths should follow the OS conventions (e.g., `/storage/emulated/0/Documents/`)
- Common error types: `PERMISSION_DENIED`, `NOT_FOUND`, `FILE_ERROR`

#### Basic Usage Example
```javascript
const settings = {
    theme: "dark",
    notifications: true
};

async function saveSettings() {
    try {
        // Using default path
        await fs.createDirectory(undefined, "AppSettings");
        await fs.writeTextFile(undefined, "AppSettings/config.json", 
            JSON.stringify(settings));
        console.log("Settings saved successfully");
        
        // Reading the saved file
        const content = await fs.readTextFile(undefined, 
            "AppSettings/config.json");
        console.log("Retrieved settings:", JSON.parse(content));
    } catch (error) {
        console.error("File operation failed:", error);
    }
}
```

#### Comprehensive Example
```javascript
async function demonstrateFileOperations() {
    try {
        // Create a test directory
        await fs.createDirectory(undefined, "TestFolder");
        console.log("Directory created");

        // Verify directory exists
        const dirExists = await fs.dirExists(undefined);
        console.log("Directory exists:", dirExists);

        // Create and write to a file
        await fs.writeTextFile(undefined, "TestFolder/test.txt", 
            "Hello, World!");
        console.log("File created and written");

        // Read file contents
        const content = await fs.readTextFile(undefined, 
            "TestFolder/test.txt");
        console.log("File contents:", content);

        // Append to the file
        await fs.appendTextFile(undefined, "TestFolder/test.txt", 
            "\nAppended content");
        console.log("Content appended");

        // Clean up
        await fs.deleteFile(undefined, "TestFolder/test.txt");
        await fs.removeDirectory(undefined, "TestFolder");
        console.log("Cleanup complete");
    } catch (error) {
        console.error("Error:", error);
    }
}
```
### Error Codes


## Complete List of Error Codes

| Code | Constant | Description |
|------|----------|-------------|
| 1 | `NOT_FOUND_ERR` | The file or directory could not be found |
| 2 | `SECURITY_ERR` | Security violation occurred |
| 3 | `ABORT_ERR` | Operation was aborted |
| 4 | `NOT_READABLE_ERR` | File or directory is not readable |
| 5 | `ENCODING_ERR` | File encoding error occurred |
| 6 | `NO_MODIFICATION_ALLOWED_ERR` | Cannot modify the file or directory |
| 7 | `INVALID_STATE_ERR` | Invalid state for the operation |
| 8 | `SYNTAX_ERR` | Invalid syntax in file name or path |
| 9 | `INVALID_MODIFICATION_ERR` | Invalid modification attempted |
| 10 | `QUOTA_EXCEEDED_ERR` | Storage quota exceeded |
| 11 | `TYPE_MISMATCH_ERR` | Wrong type for the operation |
| 12 | `PERMISSION_DENIED` | Insufficient permissions for the operation |
| 13 | `PATH_EXISTS_ERR` | Path already exists |
| 14 | `TIMEOUT_ERR` | Operation timed out |

## Common Causes and Solutions

### For Error Code 12 (PERMISSION_DENIED):
1. App doesn't have required Android permissions
2. Path is outside app's allowed directories
3. File is locked by another process
4. SELinux restrictions

**Solutions:**
- Request runtime permissions using appropriate permission APIs
- Use allowed directories (APP_ROOT_DIR, APP_STORAGE_DIR, etc.)
- Ensure proper file ownership and access rights
- Check if path is within allowed scope

### Other Common Error Scenarios:
- `NOT_FOUND_ERR`: Verify path and filename are correct
- `QUOTA_EXCEEDED_ERR`: Clear cache or unused files
- `PATH_EXISTS_ERR`: Check if resource exists before creating
- `TYPE_MISMATCH_ERR`: Ensure correct file/directory operation

### Error Handling Example
```javascript
try {
    await fs.createDirectory(fs.APP_DIR, "TestFolder");
} catch (error) {
    switch (error.code) {
        case 12:
            console.error("Permission denied. Check app permissions.");
            break;
        case 13:
            console.error("Directory already exists.");
            break;
        case 1:
            console.error("Parent directory not found.");
            break;
        default:
            console.error("Unknown error:", error);
    }
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

## Bluetooth Operations

### BLE Device Discovery

The `bluetooth` object allows for scanning nearby Bluetooth Low Energy (BLE) devices.

```javascript
bluetooth.scan(timeout); // Starts a BLE scan for a given timeout period (seconds).
```
#### Example Usage
```javascript
try{
  const devices = await bluetooth.scan(5);
    if(devices.length > 0){
        console.log(`${devices.length} Bluetooth devices found.`);
         devices.forEach(device => {
              console.log(`Device Information: Name: ${device.name}, Address: ${device.address}, Type: ${device.type}`);
          });
    }
  else{
      console.log("No devices found.");
  }
}
catch(e){
   console.error("Bluetooth scanning error:", e);
}
```
*Note: `type` indicates the Bluetooth technology, `bondState` indicates pairing status.*

## SIM Card Operations

### Accessing SIM Card Data

The `sim` object allows retrieval of information about the SIM card.

```javascript
  sim.hasPermission();    // Checks if SIM card information access permissions have been granted.
  sim.requestPermission(); // Requests SIM card information access permissions.
  sim.getInfo();         // Retrieves details about the SIM card.
```
#### Example Usage

```javascript
if (await sim.hasPermission()) {
    const simDetails = await sim.getInfo();
    console.log("SIM Carrier: " + simDetails.carrierName);
} else {
    if (await sim.requestPermission())
       console.log("Permission granted. Please try again.");
    else
        console.warn("SIM access permission has been denied.");
}
```
*Note: Obtaining SIM information requires the `requestPermission` function to be called beforehand due to privacy concerns.*

## Speech and Voice

### Text-to-Speech and Speech-to-Text

The `utter` object offers functions for text-to-speech synthesis and speech recognition.

```javascript
  utter.speak(text, options?);  // Synthesizes text into speech.
  utter.getVoices();            // Retrieves a list of available voices.
  utter.canListen();            // Checks if speech recognition is supported.
  utter.listen(options?);       // Initiates speech recognition.
  utter.stopListening();        // Terminates active speech recognition.
  utter.requestPermission();    // Requests necessary permissions for speech services.
  utter.hasPermission();        // Checks speech services permissions.
```
#### Example Usage

```javascript
try {
    // Text to speech
    const voiceOptions = await utter.getVoices();
    await utter.speak("Text-to-speech sample", {
        voice: voiceOptions[0],
        rate: 1.0,
        pitch: 1.0
    });

   // Speech to text
  if(await utter.hasPermission() === false){
        if(await utter.requestPermission()===false){
            console.error("microphone access is not available");
            return;
         }
        console.warn("Please retry the operation, permissions have been granted.")
    }
    const result = await utter.listen({
        language: "en-US",
        maxResults: 1,
        partialResults: false
    });
     console.log("Recognized Text: " + result);

} catch (e) {
    console.error("Speech service operation failed:", e);
}
```
*Note: `getVoices` can be used to customize the voice output. With `partialResults` to `true` you get results as they are being processed.*

## Clipboard Operations

### Clipboard Interaction

The `clipboard` object provides a function for setting text to the device's clipboard.

```javascript
  clipboard.setText(text);      // Copies the specified text to the device's clipboard.
```
#### Example Usage

```javascript
const textToCopy = "Text copied from the script!";
await clipboard.setText(textToCopy);
console.log("Text has been copied to the system clipboard.");
```

## Dialog Interface

### Dialog Window Functionality

The `dialog` object provides a method for displaying alert dialog windows, useful for showing notifications, prompts, and interactive menus in your scripts.

```javascript
  dialog.alert(message <string>, title <string>, buttons <object>);
```
#### Example Usage
> Example 1 showing a basic dialog with the default button.

```javascript
const idButtonClicked = await dialog.alert(
    "A low battery condition has been detected!",
    "Important Notification"
});

// Log the button clicked.
console.log('You clicked button ID : ' + idButtonClicked);
```

<p align="center">
  <img src="https://github.com/MurageKabui/PhoneDo/blob/main/docs/dialogDemo1.jpg?raw=true" title="dialogDemo1" alt="dialogDemo1" width="540" height="338">
</p>


> Example 2
```javascript
/*
  Script Name      : DialogsDemo.nts
  Date             : Sat Dec 28 2024 21:56:03 GMT+0300 (East Africa Time)
  PhoneDo Version  : 1.3.2
  Description      : Demonstration for using the dialog object.
  Author           : PhoneDo
  License          : None
*/
async function dialogDemo() {
    try {
        console.clear();
        console.log("Starting Dialog Demo...");
        // Simple alert
        const result1 = await dialog.alert("Welcome to the Dialog Demo!", "Hello");
        console.log("Basic alert closed with result:", result1);
        // Alert with some custom buttons
        const result2 = await dialog.alert("Would you like to continue the demo?", "Question", "primary", // using primary style
        [ {
            text: "Yes",
            kind: "success",
            size: "sm"
        }, {
            text: "No",
            kind: "danger",
            size: "sm"
        } ]);
        if (result2 === 1) {
            // User clicked "No"
            console.log("Demo cancelled by user");
            return;
        }
        
        // Alert with device info
        const deviceInfo = `
Device Information:
<br> Model: ${device.model}
<br> Platform: ${device.platform}
<br> Version: ${device.version}
<br> Manufacturer: ${device.manufacturer}
<br> Battery: ${device.batteryLevel}%
<br> Charging: ${device.isCharging ? "Yes" : "No"}`;
        await dialog.alert(deviceInfo, "Device Status", "info", [ {
            text: "Cool!",
            kind: "info",
            size: "sm"
        } ]);

        // Interactive demo with multiple steps
        const actions = [ "Make device vibrate", "Make device beep", "Exit demo" ];
        const result3 = await dialog.alert("Choose an action:", "Actions", "primary", actions.map(text => ({
            text: text,
            kind: "primary",
            size: "sm"
        })));
        switch (result3) {
          case 0:
            // Vibrate
            device.vibrate(1e3);
            await dialog.alert("Device vibrated!", "Action Complete");
            break;

          case 1:
            // Beep
            device.beep();
            await dialog.alert("Device beeped!", "Action Complete");
            break;

          case 2:
            // Exit
            console.log("Demo completed!");
            break;
        }

        // Final confirmation with styled message
        await dialog.alert("Thanks for trying the <div style='color: green;'>dialog</div> demo!", "Goodbye", "success", [ {
            text: "Close",
            kind: "danger",
            size: "sm"
        } ]);
    } catch (error) {
        console.error("An error occurred:", error);
        await dialog.alert("Something went wrong: " + error, "Error", "danger", [ {
            text: "OK",
            kind: "danger",
            size: "sm"
        } ]);
    }
}
// Run the demo

await dialogDemo();

exit(0); // Exit gracefully
```

*Note: The `buttonText` is optional and default to "OK". Multi-line messages are supported.*

---

## Error Handling

Most asynchronous operations within this API can throw exceptions that should be handled accordingly. These exceptions are typically encapsulated within an `APIError` object, containing an error `code` and additional `details`:

```javascript
class APIError extends Error {
    code: string;
    details?: any;
}
```
Common error codes include:

- `PERMISSION_DENIED`: Required permissions for the attempted operation were not granted.
- `TIMEOUT`: The operation timed out before completing.
- `NETWORK_ERROR`: A network-related issue occurred.
- `DEVICE_ERROR`: An error occurred with a hardware operation.
- `INVALID_ARGUMENT`: The passed parameters were invalid.

Use `try-catch` blocks to handle errors and inspect `error.code` for specific error handling.

## Best Practices

1.  **Prioritize permission requests:** Always ensure required permissions are granted before utilizing hardware functions or services.
2.  **Implement comprehensive error handling:** Utilize `try-catch` blocks to manage asynchronous operation errors effectively.
3.  **Set timeouts:** Define appropriate timeouts for network operations to prevent indefinite delays.
4.  **Check compatibility:** Prior to invoking hardware features, check if the device supports them.
5.  **Manage resources:** For event listeners, and connections, make sure to implement resource release.
6.  **Avoid UI blocking:** Perform time intensive tasks async to prevent freezing the UI.
7.  **Use minimal permission set:** Request only the essential permissions required for your intended operations.
8. **Use appropriate API calls:** Utilize correct API functions for the intended actions to maximize efficiency and performance.
9. **Provide Feedback to User:** Provide visible feedback to the user of long operations.
10. **Avoid infinite loops:** Avoid running infinite loop in scripts as there is a time limit before termination.
