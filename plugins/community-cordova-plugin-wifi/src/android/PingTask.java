package wifiplugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.json.JSONObject;
import org.apache.cordova.CordovaInterface;

public class PingTask {

    public static void ping(String address, int count, int timeout, CallbackContext callbackContext, CordovaInterface cordova) {
        cordova.getThreadPool().execute(() -> {
            try {
                String command = "/system/bin/ping -c " + count + " -W " + timeout + " " + address;
                Process process = Runtime.getRuntime().exec(command);
                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

                int linesRead = 0;
                String line;
                String fullResponse = "";
                while ((line = reader.readLine()) != null) {
                    int progress = (int) (((double) linesRead / count) * 100);
                    linesRead++;
                    JSONObject progressUpdate = new JSONObject();
                      // Ensure progress does not exceed 100
                                    progress = Math.min(progress, 100); // Cap progress at 100
                    progressUpdate.put("line", line);
                    if (fullResponse != null && !fullResponse.isEmpty()) {
                        fullResponse = fullResponse + "\n" + line;
                    } else {
                        fullResponse = line;
                    }
                    progressUpdate.put("line", line);
                    progressUpdate.put("fullResponse", fullResponse);
                    progressUpdate.put("progress", progress);
                    PluginResult progressResult = new PluginResult(PluginResult.Status.OK, progressUpdate);
                    progressResult.setKeepCallback(true);
                    callbackContext.sendPluginResult(progressResult);
                }

                process.waitFor();
                JSONObject finalResult = new JSONObject();
                finalResult.put("line", "");
                finalResult.put("fullResponse", fullResponse);
                finalResult.put("progress", 100);
                finalResult.put("status", "completed");
                finalResult.put("linesRead", linesRead);
                PluginResult result = new PluginResult(PluginResult.Status.OK, finalResult);
                callbackContext.sendPluginResult(result);
            } catch (Exception e) {
                callbackContext.error("Error during ping: " + e.getMessage());
            }
        });
    }
}
