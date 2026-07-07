package wifiplugin;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;
import android.net.NetworkInfo;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import androidx.annotation.RequiresApi;
import android.net.wifi.WifiNetworkSpecifier;
import android.net.NetworkSpecifier;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import java.util.List;

public class WifiPlugin extends CordovaPlugin {
    private static final String TAG = "WifiPlugin";
    private static final int MY_PERMISSIONS_REQUEST_WIFI_STATE = 1;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("getWifiList".equals(action)) {
            WifiUtils.getWifiList(cordova, callbackContext);
            return true;
        } else if ("ping".equals(action)) {
            String address = args.getString(0);
            int count = args.getInt(1);
            int timeout = args.getInt(2);
            PingTask.ping(address, count, timeout, callbackContext, cordova);
            return true;
        } else if ("getIpInfo".equals(action)) {
            IpInfoUtils.getIpInfo(cordova, callbackContext);
            return true;
        } else if ("getSignalStrength".equals(action)) {
            getSignalStrength(callbackContext);
            return true;
        } else if ("getWifiStrength".equals(action)) {
            getWifiStrength(callbackContext);
            return true;
        } else if ("getAllWifiDetails".equals(action)) {
            WifiDetailsUtils.getAllWifiDetails(cordova, callbackContext);
            return true;
        } else if ("getConnectedDevices".equals(action)) {
            WifiUtils.getConnectedDevices(cordova.getActivity().getApplicationContext(), cordova, callbackContext);
            return true;
        } else if ("isConnectedToInternet".equals(action)) {
            isConnectedToInternet(callbackContext);
            return true;
        } else if ("canConnectToInternet".equals(action)) {
            canConnectToInternet(callbackContext);
            return true;
        } else if ("canConnectToRouter".equals(action)) {
            canConnectToRouter(callbackContext);
            return true;
        } else if ("connectToNetwork".equals(action)) {
            String ssid = args.optString(0);
            String password = args.optString(1);
            connectToWifi(ssid, password, callbackContext);
            return true;
        } else if ("disconnectFromNetwork".equals(action)) {
            disconnectFromNetwork(callbackContext);
            return true;
        } else if ("isWifiEnabled".equals(action)) {
            isWifiEnabled(callbackContext);
            return true;
        } else if ("wifiToggle".equals(action)) {
            wifiToggle(callbackContext);
            return true;
        }
        return false;
    }

    private void getSignalStrength(CallbackContext callbackContext) {
        WifiUtils.getSignalStrength(cordova.getActivity().getApplicationContext(), callbackContext);
    }

    private void getWifiStrength(CallbackContext callbackContext) {
        WifiUtils.getWifiStrength(cordova.getActivity().getApplicationContext(), callbackContext);
    }

    private void wifiToggle(CallbackContext callbackContext) {
        cordova.getThreadPool().execute(() -> {
            try {
                WifiManager wifiManager = (WifiManager) cordova.getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
                if (wifiManager != null) {
                    wifiManager.setWifiEnabled(!wifiManager.isWifiEnabled());
                    callbackContext.success();
                } else {
                    callbackContext.error("Error toggling Wi-Fi");
                }
            } catch (Exception e) {
                callbackContext.error("Error toggling Wi-Fi: " + e.getMessage());
            }
        });
    }

    private void isWifiEnabled(CallbackContext callbackContext) {
        try {
            WifiManager wifiManager = (WifiManager) cordova.getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
            boolean isEnabled = wifiManager.isWifiEnabled();
            callbackContext.success(isEnabled ? 1 : 0);
        } catch (Exception e) {
            callbackContext.error("Error checking Wi-Fi status: " + e.getMessage());
        }
    }

    private void isConnectedToInternet(CallbackContext callbackContext) {
       ConnectivityManager connectivityManager = (ConnectivityManager) cordova.getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
       if (connectivityManager != null) {
           if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
              Network network = connectivityManager.getActiveNetwork();
                     if (network != null) {
                         NetworkCapabilities networkCapabilities = connectivityManager.getNetworkCapabilities(network);
                         if (networkCapabilities != null) {
                             boolean isConnected = networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) &&
                                                   networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED);

                             if (isConnected) {
                                 boolean isWiFi = networkCapabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI);
                                 boolean isCellular = networkCapabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR);
                                 boolean isVPN = networkCapabilities.hasTransport(NetworkCapabilities.TRANSPORT_VPN);

                                 // You can now use these flags to determine the type of connection
                                 if (isWiFi) {
                                     // Connected via WiFi
                Log.d(TAG, "Connected via WiFi");
                                     callbackContext.success(1); // or handle accordingly
                                 } else if (isCellular) {
                                     // Connected via Cellular
                Log.d(TAG, "Connected via Cellular");
                                     callbackContext.success(1); // or handle accordingly
                                 } else if (isVPN) {
                                     // Connected via VPN
                Log.d(TAG, "Connected via VPN");
                                     callbackContext.success(1); // or handle accordingly
                                 } else {
                                     // Unknown or unsupported transport
                Log.d(TAG, "Connected via Unknown or unsupported transport");
                                     callbackContext.success(1); // or handle accordingly
                                 }
                             } else {
                                 callbackContext.success(0); // No internet connection
                             }
                         } else {
                             callbackContext.success(0); // No internet connection
                         }
                     } else {
                         callbackContext.success(0); // No network connection
                     }
           } else {
               // For devices with SDK < 23, you can still use the deprecated method
               NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
               boolean isConnected = activeNetworkInfo != null && activeNetworkInfo.isConnected();
               callbackContext.success(isConnected ? 1 : 0);
           }
       } else {
                Log.e(TAG, "ConnectivityManager is null");
                callbackContext.success(0);
       }
    }

    private void canConnectToInternet(CallbackContext callbackContext) {
        ConnectivityManager connectivityManager = (ConnectivityManager) cordova.getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager != null) {
            NetworkCapabilities capabilities = connectivityManager.getNetworkCapabilities(connectivityManager.getActiveNetwork());
            boolean canConnect = capabilities != null && capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET);
            callbackContext.success(canConnect ? 1 : 0);
        } else {
            callbackContext.error("ConnectivityManager is null");
        }
    }

    private void canConnectToRouter(CallbackContext callbackContext) {
        ConnectivityManager connectivityManager = (ConnectivityManager) cordova.getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager != null) {
            NetworkCapabilities capabilities = connectivityManager.getNetworkCapabilities(connectivityManager.getActiveNetwork());
            boolean canConnectToRouter = capabilities != null && capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI);
            callbackContext.success(canConnectToRouter ? 1 : 0);
        } else {
            callbackContext.error("ConnectivityManager is null");
        }
    }

    public void connectToWifi(String ssid, String password, CallbackContext callbackContext) {
        WifiManager wifiManager = (WifiManager) cordova.getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);

        if (!wifiManager.isWifiEnabled()) {
            wifiManager.setWifiEnabled(true);
        }

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            connectToWifiPreQ(wifiManager, ssid, password, callbackContext);
        } else {
            connectToWifiQAndAbove(ssid, password, callbackContext);
        }
    }

    private void connectToWifiPreQ(WifiManager wifiManager, String ssid, String password, CallbackContext callbackContext) {
        WifiConfiguration wifiConfig = new WifiConfiguration();
        wifiConfig.SSID = "\"" + ssid + "\"";
        wifiConfig.preSharedKey = "\"" + password + "\"";
        wifiConfig.allowedKeyManagement.set(WifiConfiguration.KeyMgmt.WPA_PSK);

        // Remove existing configurations for the same SSID
        List<WifiConfiguration> configuredNetworks = wifiManager.getConfiguredNetworks();
        if (configuredNetworks != null) {
            for (WifiConfiguration existingConfig : configuredNetworks) {
                if (existingConfig.SSID != null && existingConfig.SSID.equals(wifiConfig.SSID)) {
                    wifiManager.removeNetwork(existingConfig.networkId);
                }
            }
        }

        int networkId = wifiManager.addNetwork(wifiConfig);
        if (networkId != -1) {
            wifiManager.disconnect();
            wifiManager.enableNetwork(networkId, true);
            wifiManager.reconnect();

            callbackContext.success("Connected to Wi-Fi network: " + ssid);
        } else {
            callbackContext.error("Failed to add Wi-Fi network configuration");
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.Q)
    private void connectToWifiQAndAbove(String ssid, String password, CallbackContext callbackContext) {
        WifiNetworkSpecifier.Builder builder = new WifiNetworkSpecifier.Builder()
           .setSsid(ssid)
           .setWpa2Passphrase(password);
WifiManager wifiManager = (WifiManager) cordova.getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
       NetworkSpecifier specifier = builder.build();

       NetworkRequest request = new NetworkRequest.Builder()
           .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
           .removeCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
           .setNetworkSpecifier(specifier)
           .build();

       ConnectivityManager connectivityManager = (ConnectivityManager) cordova.getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
       connectivityManager.requestNetwork(request, new ConnectivityManager.NetworkCallback() {
           @Override
           public void onAvailable(Network network) {
               super.onAvailable(network);
               wifiManager.setWifiEnabled(false);

               callbackContext.success("Connected to Wi-Fi network: " + ssid);
           }

           @Override
           public void onUnavailable() {
               super.onUnavailable();
               callbackContext.error("Failed to connect to Wi-Fi network");
           }
       });
    }

    private void disconnectFromNetwork(CallbackContext callbackContext) {
        WifiManager wifiManager = (WifiManager) cordova.getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);

        if (!wifiManager.isWifiEnabled()) {
            callbackContext.error("Wi-Fi is disabled");
            return;
        }

        wifiManager.disconnect();
        callbackContext.success("Disconnected from Wi-Fi network");
    }
}
