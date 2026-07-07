# cordova-plugin-auto-theme

**Android only** (See below for how to accomplish the same on iOS without any plugins)

A Cordova plugin for detecting if dark mode is enabled on Android, and listening for changes to device theme. Only works on Android 9+, so make sure to check the Android version in your code.

## Install
`cordova plugin add cordova-plugin-auto-theme`

## Usage
```js
//get current device theme
AutoTheme.getTheme(function(isdark) {
     console.log("Is dark mode: "+isdark)
})
```

## Events
```js
//called whenever theme changes
window.onThemeChange = function(isdark) {
    console.log("Dark mode changed. Is dark mode: "+isdark)
}
```

## How to detect dark mode on iOS

You don't need any plugins to check the current device theme and respond to changes to theme on iOS devices.

```js
//get current device theme (ios)
var isdark = window.matchMedia('(prefers-color-scheme:dark)').matches;
```

```js
//called whenever theme changes (ios)
window.matchMedia('(prefers-color-scheme:dark)').addListener(function() {
     var isdark = window.matchMedia('(prefers-color-scheme:dark)').matches;
});
```
