#import <Cordova/CDVPlugin.h>

@interface WifiPlugin : CDVPlugin

- (void)getWifiList:(CDVInvokedUrlCommand*)command;
- (void)connectToNetwork:(CDVInvokedUrlCommand*)command;
- (void)disconnectFromNetwork:(CDVInvokedUrlCommand*)command;
- (void)isWifiEnabled:(CDVInvokedUrlCommand*)command;
- (void)wifiToggle:(CDVInvokedUrlCommand*)command;
- (void)isConnectedToInternet:(CDVInvokedUrlCommand*)command;
- (void)checkAndRequestWifiPermission:(CDVInvokedUrlCommand*)command;
- (void)getConnectedDevices:(CDVInvokedUrlCommand*)command;
- (void)getWifiStrength:(CDVInvokedUrlCommand*)command;
- (void)getSignalStrength:(CDVInvokedUrlCommand*)command;
- (void)ping:(CDVInvokedUrlCommand*)command;
- (void)getIpInfo:(CDVInvokedUrlCommand*)command;
- (void)getAllWifiDetails:(CDVInvokedUrlCommand*)command;
- (void)canConnectToInternet:(CDVInvokedUrlCommand*)command;
- (void)canConnectToRouter:(CDVInvokedUrlCommand*)command;

@end
