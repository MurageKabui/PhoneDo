package io.github.amphiluke;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.ParcelFileDescriptor;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaArgs;

import org.json.JSONException;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;

public class SaveDialog extends CordovaPlugin {
    private static final int LOCATE_FILE = 1;

    private CallbackContext callbackContext;
    private final ByteArrayOutputStream fileByteStream = new ByteArrayOutputStream();

    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        switch (action) {
            case "locateFile":
                this.locateFile(args.getString(0), args.getString(1));
                this.fileByteStream.reset();
                break;
            case "addChunk":
                this.addChunk(args.getArrayBuffer(0));
                break;
            case "saveFile":
                this.saveFile(Uri.parse(args.getString(0)), this.fileByteStream.toByteArray());
                this.fileByteStream.reset();
                break;
            default:
                return false;
        }
        return true;
    }

    private void locateFile(String type, String name) {
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(type);
        intent.putExtra(Intent.EXTRA_TITLE, name);
        cordova.startActivityForResult(this, intent, SaveDialog.LOCATE_FILE);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent resultData) {
        if (requestCode == SaveDialog.LOCATE_FILE && this.callbackContext != null) {
            if (resultCode == Activity.RESULT_CANCELED) {
                this.callbackContext.error("The dialog has been cancelled");
            } else if (resultCode == Activity.RESULT_OK && resultData != null) {
                Uri uri = resultData.getData();
                this.callbackContext.success(uri.toString());
            } else {
                this.callbackContext.error("Unknown error");
            }
        }
    }

    public void onRestoreStateForActivityResult(Bundle state, CallbackContext callbackContext) {
        this.callbackContext = callbackContext;
    }

    private void addChunk(byte[] chunk) {
        try {
            this.fileByteStream.write(chunk);
            this.callbackContext.success();
        } catch (Exception e) {
            this.callbackContext.error(e.getMessage());
            e.printStackTrace();
        }
    }

    private void saveFile(Uri uri, byte[] rawData) {
        try {
            ParcelFileDescriptor pfd = cordova.getActivity().getContentResolver().openFileDescriptor(uri, "w");
            FileOutputStream fileOutputStream = new FileOutputStream(pfd.getFileDescriptor());
            try {
                fileOutputStream.write(rawData);
                this.callbackContext.success(uri.toString());
            } catch (Exception e) {
                this.callbackContext.error(e.getMessage());
                e.printStackTrace();
            } finally {
                fileOutputStream.close();
                pfd.close();
            }
        } catch (Exception e) {
            this.callbackContext.error(e.getMessage());
            e.printStackTrace();
        }
    }
}
