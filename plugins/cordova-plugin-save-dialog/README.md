# cordova-plugin-save-dialog

This Cordova plugin displays the native Save dialog which allows users to store a file in the selected location.

In Android, the plugin utilizes the Storage Access Framework to save a file in a user-selected location as described in the [Android developer guide](https://developer.android.com/training/data-storage/shared/documents-files#create-file).

In iOS, the `UIDocumentPickerViewController`’s method [`initForExportingURLs:asCopy:`](https://developer.apple.com/documentation/uikit/uidocumentpickerviewcontroller/3566731-initforexportingurls?language=objc) is used for opening a document picker that can export a file to the selected folder. Note that this method is only available in iOS 14.0+, so older iOS versions are not supported by the plugin.

## Installation

```
cordova plugin add cordova-plugin-save-dialog --save
```

## API

The plugin’s functionality is accessible through the object `cordova.plugins.saveDialog`.

### saveFile

Call this method to open the Save dialog and store raw contents in a file. The method accepts two arguments:

* file contents as a Blob instance,
* optional file name to display on default (the user may change it manually though).

The method returns a promise whose fulfillment value is a URI of the saved file in the user-selected location.

To construct a Blob representation for a file contents, either use the [`Blob` constructor](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob) directly:

```javascript
let blob = new Blob(["file contents"], {type: "text/plain"});
let fileName = "my-file.txt";
cordova.plugins.saveDialog.saveFile(blob, fileName).then(uri => {
    console.info("The file has been successfully saved to", uri);
}).catch(reason => {
    console.warn(reason);
});
```

or apply other methods of blob generation (such as [`Response.blob()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/blob) for a network-fetched content):

```javascript
try {
    let response = await fetch(`https://avatars.dicebear.com/api/avataaars/${Math.random()}.svg`);
    let blob = await response.blob();
    let uri = await cordova.plugins.saveDialog.saveFile(blob, "random-avatar.svg");
    console.info("The file has been successfully saved to", uri);
} catch (e) {
    console.error(e);
}
```

Do not try to use the returned URI for getting file access. It is provided for information purposes only. The user stores a file outside the application sandbox, so access to the saved resource is to be considered restricted.
