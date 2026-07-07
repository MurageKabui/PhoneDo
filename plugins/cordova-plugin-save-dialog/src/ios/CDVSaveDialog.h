#import <Cordova/CDVPlugin.h>
#import <UIKit/UIKit.h>

@interface CDVSaveDialog : CDVPlugin <UIDocumentPickerDelegate>

@property (nonatomic, retain) NSString* callbackId;

- (void)saveFile:(CDVInvokedUrlCommand*)command;
- (NSURL*)getPluginDirectory;
- (NSURL*)createTemporaryLocalFile:(NSData*)data fileName:(NSString*)name;
- (void)deleteTemporaryLocalFiles;
- (void)sendPluginResult:(BOOL)success message:(NSString*)message;

@end
