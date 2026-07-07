# cordova-plugin-native-spinner

[![NPM version][npm-image]][npm-url]
[![npm](https://img.shields.io/npm/dm/cordova-plugin-native-spinner.svg)](https://www.npmjs.com/package/cordova-plugin-native-spinner)

> Cordova plugin for showing a native spinner based on Paldom/SpinnerDialog

NPM Package: [cordova-plugin-native-spinner](https://www.npmjs.com/package/cordova-plugin-native-spinner)

:fire: **This Plugin** is officially using in [ionic-native](https://ionicframework.com/docs/native/spinner-dialog/) :fire:

## Platforms
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Android_robot_head.svg/121px-Android_robot_head.svg.png" width="48px" height="27px" alt="Android logo"> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/80px-Apple_logo_black.svg.png" width="39px" height="48px" alt="iOS logo"> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/2000px-Windows_logo_-_2012.svg.png" width="48px" height="48px" alt="Windows logo"> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/2000px-Windows_logo_-_2012.svg.png" width="48px" height="48px" alt="Windows logo"> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Internet_Explorer_10%2B11_logo.svg/65px-Internet_Explorer_10%2B11_logo.svg.png" width="48px" height="48px" alt="iOS logo">
|:---:|:---:|:---:|:---:|:---:|
| 4.1+ ✔ | 10+ ✔ | WP 8.1+ ✔ | 10+ ✔ | Browser ✔ |

## Installation

**Latest stable release**: 

* PhoneGap - `phonegap local plugin add cordova-plugin-spinner-dialog`
* Cordova - `cordova plugin add cordova-plugin-spinner-dialog`

**Current state from git**:

* PhoneGap - `phonegap local plugin add https://github.com/greybax/cordova-plugin-native-spinner`
* Cordova - `cordova plugin add https://github.com/greybax/cordova-plugin-native-spinner`
```
cordova plugin add cordova-plugin-native-spinner
cordova prepare
```

## Includes PR's improvements from Paldom/SpinnerDialog:

* [InAppBrowser Compatibility](https://github.com/Paldom/SpinnerDialog/pull/34)
* [Change loading text if we call show function and loading dialog exists](https://github.com/Paldom/SpinnerDialog/pull/23)
* and **tons fixes** from here https://github.com/Paldom/SpinnerDialog/issues ...

## Methods

- `SpinnerDialog.show`
- `SpinnerDialog.hide`

#### SpinnerDialog.show

    SpinnerDialog.show([title], [message], [cancelCallback])

- __title__: Spinner title (Android only). Optional. _(String)_
- __message__: Spinner message. Optional. _(String)_
- __cancelCallback__: Callback to invoke when spinner cancel event fired (tap or Android hardware back button event). If set, spinner dialog will be fixed, you should explicitly call `SpinnerDialog.hide`. Due to legacy reasons you can provide boolean value (true/false) to set spinner not cancelable. Optional, defaults to `false`. _(Function/Boolean)_

#### SpinnerDialog.hide

    SpinnerDialog.hide([wpStatusbar]);

- __wpStatusbar__: Indicates whether to keep the status bar visible. (Windows 10 Mobile only). If set to `true`, only the spinner will be hidden, the status bar will remain visible if it was already visible. Optional, defaults to `false`. _(Boolean)_

## Usage

```javascript
// Show spinner dialog
SpinnerDialog.show();

// Show spinner dialog with message
// Note: spinner dialog is cancelable by default
SpinnerDialog.show(null, "message");

// Set spinner dialog fixed
SpinnerDialog.show(null, null, true);

// Set spinner dialog fixed with callback
// Note: callback fires on tap events and Android hardware back button click event
SpinnerDialog.show(null, null, function () {console.log("callback");});

// Show spinner dialog with title and message (Android only)
SpinnerDialog.show("title", "message");

// Set spinner dialog fixed (cannot be canceled with screen touch or Android hardware button)
SpinnerDialog.show("title", "message", true);

// Overlay opacity and text color options (IOS only)
SpinnerDialog.show(null,"Message",true, {overlayOpacity: 0.35,  textColorRed: 1, textColorGreen: 1, textColorBlue: 1}); 

// Change only overlay opacity (IOS only)
SpinnerDialog.show(null,"Message",true,{overlayOpacity:0.70});

// Change only text color (IOS only)
SpinnerDialog.show(null,"message",true, { textColorRed: 0.1, textColorGreen: 0.1, textColorBlue: 1});

// Hide spinner dialog
SpinnerDialog.hide();
```

## Quirks

* Cordova 5.0 or higher is required for Windows 10 support.
* Windows 10 Mobile or Windows Phone 8.1 is required as desktop doesn't support StatusBar.

## Screenshots

### Android

<img src="https://github.com/andreszs/cordova-plugin-demos/blob/main/com.andreszs.spinner.demo/screenshots/android/spinner-2.png?raw=true" width="240" />

### Browser

<img src="https://github.com/andreszs/cordova-plugin-demos/blob/main/com.andreszs.spinner.demo/screenshots/browser/spinner-2.png?raw=true" width="240" />

## Plugin demo app

Demo app source code to test the plugin is available at the [cordova-plugin-demos repository](https://github.com/andreszs/cordova-plugin-demos/tree/main/com.andreszs.spinner.demo "cordova-plugin-demos repository") by Andrés Zsögön.

## License
See "LICENSE".
Based on https://github.com/Paldom/SpinnerDialog with lots of awesome improvements! :star: :tada: :rocket: :star:

[npm-url]: https://npmjs.org/package/cordova-plugin-native-spinner
[npm-image]: https://img.shields.io/npm/v/cordova-plugin-native-spinner.svg
