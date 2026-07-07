#import "CDVSaveDialog.h"
#import <Cordova/CDVPlugin.h>
#import <UIKit/UIKit.h>

@implementation CDVSaveDialog

- (void)saveFile:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;
    if (@available(iOS 14, *)) {
        NSData* data = [command.arguments objectAtIndex:0];
        NSString* name = [command.arguments objectAtIndex:1];
        NSURL* localFileUrl = [self createTemporaryLocalFile:data fileName:name];
        if (localFileUrl == nil) {
            [self sendPluginResult:NO message:@"Cannot create a temporary file"];
            return;
        }
        NSArray* urls = @[localFileUrl];
        UIDocumentPickerViewController* picker = [[UIDocumentPickerViewController alloc] initForExportingURLs:urls asCopy:YES];
        picker.shouldShowFileExtensions = YES;
        picker.delegate = self;
        [self.viewController presentViewController:picker animated:YES completion:nil];
    } else {
        [self sendPluginResult:NO message:@"Unsupported iOS version"];
    }
}

- (void)documentPicker:(UIDocumentPickerViewController*)picker didPickDocumentsAtURLs:(NSArray<NSURL*>*)urls
{
    if ([urls count] > 0) {
        NSString* url = [[urls objectAtIndex:0] absoluteString];
        [self sendPluginResult:YES message:url];
    } else {
        [self sendPluginResult:NO message:@"Unknown error"];
    }
    [self deleteTemporaryLocalFiles];
}

- (void)documentPickerWasCancelled:(UIDocumentPickerViewController*)picker
{
    [self sendPluginResult:NO message:@"The dialog has been cancelled"];
    [self deleteTemporaryLocalFiles];
}

- (NSURL*)getPluginDirectory
{
    NSFileManager* fileManager = [NSFileManager defaultManager];
    NSURL* documentDir = [[fileManager URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
    return [documentDir URLByAppendingPathComponent:@".SaveDialog" isDirectory:YES];
}

- (NSURL*)createTemporaryLocalFile:(NSData*)data fileName:(NSString*)name
{
    NSURL* pluginDir = [self getPluginDirectory];
    NSFileManager* fileManager = [NSFileManager defaultManager];
    if (![fileManager createDirectoryAtURL:pluginDir withIntermediateDirectories:YES attributes:nil error:nil]) {
        return nil;
    }
    NSURL* localFileUrl = [pluginDir URLByAppendingPathComponent:name isDirectory:NO];
    if (![data writeToURL:localFileUrl atomically:YES]) {
        return nil;
    }
    return localFileUrl;
}

- (void)deleteTemporaryLocalFiles
{
    NSURL* pluginDir = [self getPluginDirectory];
    NSFileManager* fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtURL:pluginDir error:nil];
}

- (void)sendPluginResult:(BOOL)success message:(NSString*)message
{
    CDVPluginResult* pluginResult = nil;
    if (success) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:message];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
}

@end
