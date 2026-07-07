package com.terrengurule.autotheme;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.LOG;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import android.os.Process;

import android.content.res.Configuration;

public class AutoTheme extends CordovaPlugin {
	
	boolean wasDark = false;
	
	@Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
		
		int uiMode = cordova.getActivity().getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
		if (uiMode == Configuration.UI_MODE_NIGHT_YES) {
			wasDark = true;
		} else {
			wasDark = false;
		}
	}

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
            
        if (action.equals("getTheme")) {
		
		int uiMode = cordova.getActivity().getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
		if (uiMode == Configuration.UI_MODE_NIGHT_YES) {
			callbackContext.success("true");
		} else {
			callbackContext.success("false");
		}

            return true;

        } else {
			
			return false;
			
		}
    }
	
	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);
		
		int uiMode = cordova.getActivity().getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
		if (uiMode == Configuration.UI_MODE_NIGHT_YES) {
			if (wasDark == false) {
			executeGlobalJavascript("onThemeChange(true)");
			}
			wasDark = true;
		} else {
			if (wasDark == true) {
			executeGlobalJavascript("onThemeChange(false)");
			}
			wasDark = false;
		}
	}
	
    private void executeGlobalJavascript(final String jsString){
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl("javascript:" + jsString);
            }
        });
    }
	
}