package wifiplugin;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.text.format.Formatter;
import org.json.JSONObject;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import java.net.UnknownHostException;
import java.io.IOException;
import org.json.JSONArray;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import android.content.Context;
import java.net.InetAddress;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import android.net.wifi.ScanResult;
import java.util.List;
import java.util.Collections;
import java.util.Comparator;


public class WifiUtils {
public static void getSignalStrength(Context context, CallbackContext callbackContext) {
        try {
            WifiManager wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
            WifiInfo wifiInfo = wifiManager.getConnectionInfo();
            int signalStrength = wifiInfo.getRssi();

            PluginResult result = new PluginResult(PluginResult.Status.OK, signalStrength);
            callbackContext.sendPluginResult(result);
        } catch (Exception e) {
            callbackContext.error("Error getting signal strength: " + e.getMessage());
        }
    }

    public static void getWifiStrength(Context context, CallbackContext callbackContext) {
        try {
            WifiManager wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
            WifiInfo wifiInfo = wifiManager.getConnectionInfo();
            int wifiStrength = WifiManager.calculateSignalLevel(wifiInfo.getRssi(), 5);

            PluginResult result = new PluginResult(PluginResult.Status.OK, wifiStrength);
            callbackContext.sendPluginResult(result);
        } catch (Exception e) {
            callbackContext.error("Error getting WiFi strength: " + e.getMessage());
        }
    }

        public static void getWifiList(CordovaInterface cordova, CallbackContext callbackContext) {
            WifiManager wifiManager = (WifiManager) cordova.getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);

            if (!wifiManager.isWifiEnabled()) {
                callbackContext.error("Wi-Fi is disabled");
                return;
            }

            wifiManager.startScan();
            List<ScanResult> scanResults = wifiManager.getScanResults();

            // Sort the scan results by Level in ascending order
          Collections.sort(scanResults, new Comparator<ScanResult>() {
              @Override
              public int compare(ScanResult o1, ScanResult o2) {
                  // Sort in descending order of signal strength (higher values first)
                  return Integer.compare(o2.level, o1.level);
              }
          });

            JSONArray wifiArray = new JSONArray();
            for (ScanResult scanResult : scanResults) {
                JSONObject wifiObject = new JSONObject();
                try {
                    wifiObject.put("SSID", scanResult.SSID);
                    wifiObject.put("BSSID", scanResult.BSSID);
                    wifiObject.put("capabilities", scanResult.capabilities);
                    wifiObject.put("frequency", scanResult.frequency / 1000.0 + " GHz"); // Convert frequency to GHz
                    wifiObject.put("security", getSecurityType(scanResult)); // Get security type
                           wifiObject.put("level", scanResult.level); // Signal strength in dBm
 // Manufacturer is not directly available from ScanResult
                    wifiObject.put("channelWidth", getChannelWidth(scanResult.channelWidth)); // Get channel width
                    // PHY Mode and PHY Speed capability are not directly available from ScanResult
wifiObject.put("distance", calculateDistance(scanResult.level, scanResult.frequency)); // Estimate distance
        wifiObject.put("hasPassword", hasPassword(scanResult.capabilities)); // Determine if network is secured

                    wifiArray.put(wifiObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            PluginResult result = new PluginResult(PluginResult.Status.OK, wifiArray);
            callbackContext.sendPluginResult(result);
        }

// Utility method to check if network is secured
private static boolean hasPassword(String capabilities) {
    return capabilities.contains("WEP") || capabilities.contains("WPA") ||
           capabilities.contains("WPA2") || capabilities.contains("WPA3") ||
           capabilities.contains("PSK");
}
        // Utility method to determine security type from capabilities
        private static String getSecurityType(ScanResult scanResult) {
            if (scanResult.capabilities.contains("WEP")) {
                return "WEP";
            } else if (scanResult.capabilities.contains("WPA")) {
                return "WPA";
            } else if (scanResult.capabilities.contains("WPA2")) {
                return "WPA2";
            } else if (scanResult.capabilities.contains("WPA3")) {
                return "WPA3";
            }
            return "Open";
        }


        // Utility method to get channel width description
        private static String getChannelWidth(int channelWidth) {
            switch (channelWidth) {
                case ScanResult.CHANNEL_WIDTH_20MHZ:
                    return "20 MHz";
                case ScanResult.CHANNEL_WIDTH_40MHZ:
                    return "40 MHz";
                case ScanResult.CHANNEL_WIDTH_80MHZ:
                    return "80 MHz";
                case ScanResult.CHANNEL_WIDTH_160MHZ:
                    return "160 MHz";
                default:
                    return "Unknown";
            }
        }

     // Utility method to estimate distance and format it to 2 decimal places
     private static String calculateDistance(double signalLevelInDb, double freqInMHz) {
         double exp = (27.55 - (20 * Math.log10(freqInMHz)) + Math.abs(signalLevelInDb)) / 20.0;
         double distance = Math.pow(10.0, exp);
         return String.format("%.2f", distance);
     }

       private int calculateWifiStrength(WifiManager wifiManager) {
            int numberOfLevels = 5; // You can adjust this based on your preference
            WifiInfo wifiInfo = wifiManager.getConnectionInfo();
            int signalLevel = WifiManager.calculateSignalLevel(wifiInfo.getRssi(), numberOfLevels);
            return (signalLevel * 100) / numberOfLevels;
        }
    public static void getConnectedDevices(Context context,CordovaInterface cordova, CallbackContext callbackContext) {
        cordova.getThreadPool().execute(() -> {
            try {
                JSONArray devicesArray = new JSONArray();

                // Get the current device's IP address
                WifiManager wifiManager = (WifiManager) cordova.getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
                WifiInfo wifiInfo = wifiManager.getConnectionInfo();
                String ipAddress = Formatter.formatIpAddress(wifiInfo.getIpAddress());
                String subnet = ipAddress.substring(0, ipAddress.lastIndexOf("."));

                // Perform IP scanning to find connected devices
                ExecutorService executor = Executors.newFixedThreadPool(20);
                CountDownLatch latch = new CountDownLatch(255);

                for (int i = 1; i <= 255; i++) {
                    final int host = i;
                    executor.submit(() -> {
                        String ip = subnet + "." + host;
                        try {
                            if (InetAddress.getByName(ip).isReachable(100)) {
                                JSONObject deviceObject = new JSONObject();
deviceObject.put("ipAddress", ip);
deviceObject.put("deviceName", getDeviceNameByIp(ip));
deviceObject.put("localHost", isLocalHost(ip));
deviceObject.put("loopbackAddress", isLoopbackAddress(ip));
deviceObject.put("hostAddress", getHostAddress(ip));
deviceObject.put("canonicalHostName", getCanonicalHostName(ip));
deviceObject.put("multicastAddress", isMulticastAddress(ip));
deviceObject.put("siteLocalAddress", isSiteLocalAddress(ip));
                                devicesArray.put(deviceObject);
                            }
                        } catch (UnknownHostException | JSONException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        } finally {
                            latch.countDown();
                        }
                    });
                }

                executor.shutdown();

                // Wait for all threads to finish
                latch.await();

                PluginResult result = new PluginResult(PluginResult.Status.OK, devicesArray);
                callbackContext.sendPluginResult(result);
            } catch (Exception e) {
                callbackContext.error("Error getting connected devices: " + e.getMessage());
            }
        });
    }
    private static String getDeviceNameByIp(String ipAddress) {
        try {
            InetAddress inetAddress = InetAddress.getByName(ipAddress);
            return inetAddress.getHostName();
        }
         catch (IOException e) {
            e.printStackTrace();
             return "Unknown";
        }
    }

    private static boolean isLocalHost(String ipAddress) {
        return InetAddress.getLoopbackAddress().getHostAddress().equals(ipAddress);
    }

    private static boolean isLoopbackAddress(String ipAddress) {
        try {
            return InetAddress.getByName(ipAddress).isLoopbackAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
            return false;
        }
    }

    private static String getHostAddress(String ipAddress) {
        try {
            return InetAddress.getByName(ipAddress).getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
            return "Unknown";
        }
    }

    private static String getCanonicalHostName(String ipAddress) {
        try {
            return InetAddress.getByName(ipAddress).getCanonicalHostName();
        } catch (UnknownHostException e) {
            e.printStackTrace();
            return "Unknown";
        }
    }

    private static boolean isMulticastAddress(String ipAddress) {
        try {
            return InetAddress.getByName(ipAddress).isMulticastAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
            return false;
        }
    }

    private static boolean isSiteLocalAddress(String ipAddress) {
        try {
            return InetAddress.getByName(ipAddress).isSiteLocalAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
            return false;
        }
    }
}
