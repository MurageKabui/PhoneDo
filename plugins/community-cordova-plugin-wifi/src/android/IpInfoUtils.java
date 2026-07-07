package wifiplugin;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.DhcpInfo;
import android.net.Network;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.text.format.Formatter;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.util.Log;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

public class IpInfoUtils {
    private static final String TAG = "CommunityWifiPlugin->IpInfoUtils";

    public static void getIpInfo(CordovaInterface cordova, CallbackContext callbackContext) {
        cordova.getThreadPool().execute(() -> {
            try {
                ConnectivityManager connectivityManager = (ConnectivityManager) cordova.getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
                WifiManager wifiManager = (WifiManager) cordova.getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
                LocationManager locationManager = (LocationManager) cordova.getActivity().getSystemService(Context.LOCATION_SERVICE);

                if (connectivityManager != null && wifiManager != null && locationManager != null) {
                    Network[] networks = connectivityManager.getAllNetworks();
                    JSONArray ipInfoArray = new JSONArray();
                    JSONObject ipInfoObject = new JSONObject();
                    initializeIpInfoObject(ipInfoObject);

                    if (networks.length > 0) {
                        for (Network network : networks) {
                            NetworkInfo networkInfo = connectivityManager.getNetworkInfo(network);

                            if (networkInfo != null && networkInfo.isConnected() ) {
                                WifiInfo wifiInfo = wifiManager.getConnectionInfo();
                                DhcpInfo dhcpInfo = wifiManager.getDhcpInfo(); // Get DHCP info for DNS details

                                ipInfoObject.put("type", networkInfo.getTypeName());
                                ipInfoObject.put("signal", wifiInfo.getRssi());
                                ipInfoObject.put("speed", wifiInfo.getLinkSpeed());
                                ipInfoObject.put("ssid", wifiInfo.getSSID());
                                ipInfoObject.put("internalip", Formatter.formatIpAddress(wifiInfo.getIpAddress()));
                                ipInfoObject.put("macaddress", wifiInfo.getMacAddress());
                                ipInfoObject.put("networkid", wifiInfo.getNetworkId());
                                ipInfoObject.put("frequency", wifiInfo.getFrequency());
                                ipInfoObject.put("bssid", wifiInfo.getBSSID());
                                ipInfoObject.put("timezone", TimeZone.getDefault().getID());
                                ipInfoObject.put("dns1", Formatter.formatIpAddress(dhcpInfo.dns1)); // Add DNS1
                                ipInfoObject.put("dns2", Formatter.formatIpAddress(dhcpInfo.dns2)); // Add DNS2
                                fillLocationInfo(ipInfoObject, locationManager, cordova);
                                ipInfoArray.put(ipInfoObject);
                                ipInfoObject = new JSONObject();
                                initializeIpInfoObject(ipInfoObject);
                            }
                        }
                    } else {
                        WifiInfo wifiInfo = wifiManager.getConnectionInfo();
                        DhcpInfo dhcpInfo = wifiManager.getDhcpInfo(); // Get DHCP info for DNS details
                        ipInfoObject.put("type", "Not Connected");
                        ipInfoObject.put("signal", wifiInfo.getRssi());
                        ipInfoObject.put("speed", wifiInfo.getLinkSpeed());
                        ipInfoObject.put("ssid", wifiInfo.getSSID());
                        ipInfoObject.put("internalip", Formatter.formatIpAddress(wifiInfo.getIpAddress()));
                        ipInfoObject.put("macaddress", wifiInfo.getMacAddress());
                        ipInfoObject.put("networkid", wifiInfo.getNetworkId());
                        ipInfoObject.put("frequency", wifiInfo.getFrequency());
                        ipInfoObject.put("bssid", wifiInfo.getBSSID());
                        ipInfoObject.put("timezone", TimeZone.getDefault().getID());
                        ipInfoObject.put("dns1", Formatter.formatIpAddress(dhcpInfo.dns1)); // Add DNS1
                        ipInfoObject.put("dns2", Formatter.formatIpAddress(dhcpInfo.dns2)); // Add DNS2
                        fillLocationInfo(ipInfoObject, locationManager, cordova);
                        ipInfoArray.put(ipInfoObject);
                    }

                    PluginResult result = new PluginResult(PluginResult.Status.OK, ipInfoArray);
                    callbackContext.sendPluginResult(result);
                } else {
                    callbackContext.error("Required managers are null");
                }
            } catch (Exception e) {
                callbackContext.error("Error getting IP information: " + e.getMessage());
            }
        });
    }

    private static void initializeIpInfoObject(JSONObject ipInfoObject) {
        try {
            ipInfoObject.put("networkType", "UNKNOWN");
            ipInfoObject.put("signal", -1);
            ipInfoObject.put("speed", "UNKNOWN");
            ipInfoObject.put("ssid", "UNKNOWN");
            ipInfoObject.put("internalip", "UNKNOWN");
            ipInfoObject.put("macaddress", "UNKNOWN");
            ipInfoObject.put("frequency", -1);
            ipInfoObject.put("bssid", "UNKNOWN");
            ipInfoObject.put("dns1", "UNKNOWN");
            ipInfoObject.put("dns2", "UNKNOWN");
            ipInfoObject.put("timezone", "UNKNOWN");
            ipInfoObject.put("latitude", -1);
            ipInfoObject.put("longitude", -1);
            ipInfoObject.put("city", "UNKNOWN");
            ipInfoObject.put("street", "UNKNOWN");
            ipInfoObject.put("country", "UNKNOWN");
            ipInfoObject.put("region", "UNKNOWN");
            ipInfoObject.put("zipcode", -1);
            ipInfoObject.put("state", "UNKNOWN");
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

   private static void fillLocationInfo(JSONObject ipInfoObject, LocationManager locationManager, CordovaInterface cordova) throws JSONException {
       Log.d(TAG, "fillLocationInfo begin");
       Location location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
       if (location != null) {
           Log.d(TAG, "fillLocationInfo location is exists");
           ipInfoObject.put("latitude", location.getLatitude());
           ipInfoObject.put("longitude", location.getLongitude());
           Log.d(TAG, "fillLocationInfo finish lat and long");

           List<Address> addresses = new ArrayList<>();
           if (isNetworkAvailable(cordova.getActivity())) {
               try {
                   Log.d(TAG, "Geocoder begin");
                   Geocoder geocoder = new Geocoder(cordova.getActivity(), Locale.getDefault());
                   Log.d(TAG, "Geocoder success");
                   addresses = geocoder.getFromLocation(location.getLatitude(), location.getLongitude(), 1);
                   Log.d(TAG, "addresses success");
               } catch (IOException e) {
                   Log.e(TAG, "Geocoder failed due to network or I/O issues", e);
               } catch (IllegalArgumentException e) {
                   Log.e(TAG, "Geocoder failed due to illegal arguments", e);
               } catch (Exception e) {
                   Log.e(TAG, "Geocoder failed due to an unexpected error", e);
               }
           }

           if (!addresses.isEmpty()) {
               Address address = addresses.get(0);
               ipInfoObject.put("city", address.getLocality());
               ipInfoObject.put("street", address.getThoroughfare());
               ipInfoObject.put("country", address.getCountryName());
               ipInfoObject.put("region", address.getSubAdminArea());
               ipInfoObject.put("zipcode", address.getPostalCode());
               ipInfoObject.put("state", address.getAdminArea());
           }
       }
   }


    public static boolean isNetworkAvailable(Context context) {
        ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }
}
