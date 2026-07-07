# Community Cordova Plugin WiFi


The Community Cordova Plugin WiFi offers extensive WiFi management functionalities for Cordova applications on Android and iOS platforms. While Android devices benefit from a wide range of WiFi management capabilities, iOS support focuses on network information retrieval due to platform restrictions.


I dedicate a considerable amount of my free time to developing and maintaining many cordova plugins for the community ([See the list with all my maintained plugins][community_plugins]).
To help ensure this plugin is kept updated,
new features are added and bugfixes are implemented quickly,
please donate a couple of dollars (or a little more if you can stretch) as this will help me to afford to dedicate time to its maintenance.
Please consider donating if you're using this plugin in an app that makes you money,
or if you're asking for new features or priority bug fixes. Thank you!

[![](https://img.shields.io/static/v1?label=Sponsor%20Me&style=for-the-badge&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/eyalin)


## Features

- Scan for available WiFi networks (Android)
- Connect to or disconnect from a WiFi network (Android)
- Check WiFi status and toggle WiFi (Android)
- Retrieve current network information
- Check internet connectivity
- Ping network addresses (Android)
- Obtain WiFi signal strength and other network details

## Installation

```bash
cordova plugin add community-cordova-plugin-wifi
```

## API Reference and Examples

### isConnectedToInternet

**Platform Support:** Android, iOS

Checks if there is an active internet connection.

#### Example

```javascript
WifiPlugin.isConnectedToInternet().then(isConnected => {
    console.log("Internet connectivity status:", isConnected);
}).catch(error => {
    console.error("Error:", error);
});
```

**Response:**

- `isConnected` (boolean): True if the device is connected to the internet.

### getWifiList (Android Only)

Scans for available WiFi networks.

**Platform Support:** Android

#### Example

```javascript
WifiPlugin.getWifiList().then(wifiList => {
    console.log("WiFi networks:", wifiList);
}).catch(error => {
    console.error("Error:", error);
});
```

**Response Fields:**

Each object in the `wifiList` array contains:
- `SSID` (string): Network name.
- `BSSID` (string): Access point MAC address.
- `capabilities` (string): Supported protocols and authentication methods.
- `frequency` (number): Channel frequency in MHz.
- `level` (number): Signal strength in dBm.
- `security` (string): Security protocols in use.

### getAllWifiDetails

Retrieves comprehensive WiFi network details.

**Platform Support:** Android, iOS (Limited details on iOS)

#### Example

```javascript
WifiPlugin.getAllWifiDetails().then(details => {
    console.log("WiFi Details:", details);
}).catch(error => {
    console.error("Error:", error);
});
```

**Response Fields:**

- `ssid` (string): Current network SSID.
- `bssid` (string): Network BSSID.
- `ip` (string): Device IP address in the network.
- `mac` (string, Android only): Device MAC address.
- `signalStrength` (number, Android only): WiFi signal strength.
- Additional network details may include `networkid`, `linkspeed`, `rssi`, etc., with availability varying between platforms.

### isWifiEnabled (Android Only)

Checks if WiFi is enabled on the device.

**Platform Support:** Android

#### Example

```javascript
WifiPlugin.isWifiEnabled().then(isEnabled => {
    console.log("WiFi Enabled:", isEnabled);
}).catch(error => {
    console.error("Error:", error);
});
```

**Response:**

- `isEnabled` (boolean): True if WiFi is enabled.

### connectToNetwork (Android Only)

Connects to a specified WiFi network.

**Platform Support:** Android

#### Example

```javascript
WifiPlugin.connectToNetwork("SSID", "password").then(() => {
    console.log("Connected successfully.");
}).catch(error => {
    console.error("Error:", error);
});
```

No additional response fields.

## Platform Support

This plugin supports Android and iOS. Note that iOS functionalities are limited to retrieving network information due to platform restrictions.

## Permissions

Ensure your application requests the necessary permissions. Android requires permissions for accessing WiFi state, location, and changing WiFi connectivity. iOS may require location permissions for accessing network information.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues on the [GitHub repository](https://github.com/EYALIN/community-cordova-plugin-wifi).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

[community_plugins]: https://github.com/EYALIN?tab=repositories&q=community&type=&language=&sort=
