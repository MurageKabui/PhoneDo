#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>
#include <ifaddrs.h>
#import "SimplePing.h"
#include <arpa/inet.h>

@interface CDVPing : CDVPlugin

- (void) getPingInfo:(CDVInvokedUrlCommand*)command;

@end
