package wifiplugin;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.text.format.Formatter;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import org.json.JSONObject;
import android.net.DhcpInfo;
import java.util.Iterator;

public class WifiDetailsUtils {

   public static void getAllWifiDetails(CordovaInterface cordova, CallbackContext callbackContext) {
       cordova.getThreadPool().execute(() -> {
           try {
               WifiManager wifiManager = (WifiManager) cordova.getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
               if (wifiManager == null) {
                   callbackContext.error("WifiManager not available");
                   return;
               }

               // Check if Wi-Fi is enabled and supported
               boolean isWifiEnabled = wifiManager.isWifiEnabled();

               // Get Wi-Fi and DHCP details
               WifiInfo wifiInfo = wifiManager.getConnectionInfo();
               DhcpInfo dhcpInfo = wifiManager.getDhcpInfo();

               JSONObject wifiDetails = new JSONObject();
               wifiDetails.put("iswifienabled", isWifiEnabled);
               wifiDetails.put("issupportwifi", true); // If wifiManager isn't null, device supports WiFi
               wifiDetails.put("ssid", wifiInfo.getSSID());
               wifiDetails.put("bssid", wifiInfo.getBSSID());
               wifiDetails.put("ip", Formatter.formatIpAddress(wifiInfo.getIpAddress()));
               wifiDetails.put("mac", wifiInfo.getMacAddress());
               wifiDetails.put("networkid", wifiInfo.getNetworkId());
               wifiDetails.put("linkspeed", wifiInfo.getLinkSpeed() + " Mbps");
               wifiDetails.put("signalstrength", wifiInfo.getRssi());
               wifiDetails.put("gateway", Formatter.formatIpAddress(dhcpInfo.gateway));
               wifiDetails.put("rssi", wifiInfo.getRssi());
               wifiDetails.put("speed", wifiInfo.getLinkSpeed() + " Mbps");
               wifiDetails.put("frequency", wifiInfo.getFrequency() + " MHz");
               wifiDetails.put("channel", getChannelFromFrequency(wifiInfo.getFrequency()));
               wifiDetails.put("dns1", Formatter.formatIpAddress(dhcpInfo.dns1));
               wifiDetails.put("dns2", Formatter.formatIpAddress(dhcpInfo.dns2));

               // Convert keys to lowercase
               JSONObject lowerCaseWifiDetails = new JSONObject();
               Iterator<String> keys = wifiDetails.keys();
               while (keys.hasNext()) {
                   String key = keys.next();
                   lowerCaseWifiDetails.put(key.toLowerCase(), wifiDetails.get(key));
               }

               PluginResult result = new PluginResult(PluginResult.Status.OK, lowerCaseWifiDetails);
               callbackContext.sendPluginResult(result);
           } catch (Exception e) {
               callbackContext.error("Error getting Wi-Fi details: " + e.getMessage());
           }
       });
   }


       // Helper method to get the Wi-Fi channel from frequency
       private static int getChannelFromFrequency(int frequency) {
           if (frequency >= 2412 && frequency <= 2484) {
               return (frequency - 2412) / 5 + 1;
           } else if (frequency >= 5170 && frequency <= 5825) {
               return (frequency - 5170) / 5 + 34;
           }
           return -1; // Unknown channel
       }
}
