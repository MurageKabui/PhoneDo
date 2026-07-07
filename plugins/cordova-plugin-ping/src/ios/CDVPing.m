#import "CDVPing.h"
#include <netdb.h>
#import <Foundation/Foundation.h>

@implementation CDVPing
int totalPings = 1;
int i =0;
int currentPings = 0;
int totalPctRecieved =0;
CDVInvokedUrlCommand *cmd;
NSMutableArray *arrayout ;


BOOL forceIPv4 = NO;
BOOL forceIPv6 =NO;
SimplePing * pinger;
NSTimer *    sendTimer;
NSString *host = nil;
double timeoutVal;
//int currSeq= 0;
NSTimer *pingTimer= nil;
NSMutableDictionary *sequencer;
NSMutableArray *finalarrayresp ;
static NSString * displayAddressForAddress(NSData * address) {
    int         err;
    NSString *  result;
    char        hostStr[NI_MAXHOST];
    
    result = nil;
    
    if (address != nil) {
        err = getnameinfo(address.bytes, (socklen_t) address.length, hostStr, sizeof(hostStr), NULL, 0, NI_NUMERICHOST);
        if (err == 0) {
            result = @(hostStr);
        }
    }
    
    if (result == nil) {
        result = @"?";
    }
    
    return result;
}

/*! Returns a short error string for the supplied error.
 *  \param error The error to render.
 *  \returns A short string representing that error.
 */

static NSString * shortErrorFromError(NSError * error) {
    NSString *      result;
    NSNumber *      failureNum;
    int             failure;
    const char *    failureStr;
    
    assert(error != nil);
    
    result = nil;
    
    // Handle DNS errors as a special case.
    
    if ( [error.domain isEqual:(NSString *)kCFErrorDomainCFNetwork] && (error.code == kCFHostErrorUnknown) ) {
        failureNum = error.userInfo[(id) kCFGetAddrInfoFailureKey];
        if ( [failureNum isKindOfClass:[NSNumber class]] ) {
            failure = failureNum.intValue;
            if (failure != 0) {
                failureStr = gai_strerror(failure);
                if (failureStr != NULL) {
                    result = @(failureStr);
                }
            }
        }
    }
    
    // Otherwise try various properties of the error object.
    
    if (result == nil) {
        result = error.localizedFailureReason;
    }
    if (result == nil) {
        result = error.localizedDescription;
    }
    assert(result != nil);
    return result;
}


- (void)dealloc {
    [pinger stop];
    [sendTimer invalidate];
}



- (void)timerFired:(NSTimer *)timer {
    NSLog(@"Timeout>ping timeout occurred, host not reachable");
    
    
    
    
    
    NSTimeInterval str = 0;
    NSNumber *rtt = [NSNumber numberWithDouble:str];
    
    NSLog(@"The rtt = %f", [rtt floatValue]);
    
    
    [arrayout addObject:rtt ];
    
    // NSLog(@"Appended Array: '%@'",arrayout);
    currentPings++;
    [self checkNextPing];
    
    
    
    // Move to next host
    // [self pingNextHost];
}

- (void)sendPing {
    
    [pinger sendPingWithData:nil];
}


- (void)simplePing:(SimplePing *)pinger didStartWithAddress:(NSData *)address {
#pragma unused(pinger)
    
    assert(address != nil);
    
    NSLog(@"pinging %@", displayAddressForAddress(address));
    
    // Send the first ping straight away.
    
    [self sendPing];
    
    // And start a timer to send the subsequent pings.
    
    assert(sendTimer == nil);
    // self.sendTimer = [NSTimer scheduledTimerWithTimeInterval:2.0 target:self selector:@selector(sendPing) userInfo:nil repeats:YES];
}




- (void)simplePing:(SimplePing *)pinger didFailWithError:(NSError *)error {
#pragma unused(pinger)
    
    NSLog(@"failed: %@", shortErrorFromError(error));
    
    
    
    NSLog(@"failed to start");
           NSDictionary *request =    @{
                                        @"query": cmd.arguments[i][@"query"],
                                         @"timeout": cmd.arguments[i][@"timeout"],
                                         @"retry": cmd.arguments[i][@"retry"],
                                         @"version": cmd.arguments[i][@"version"]
    
                                         };
    
    
            NSDictionary *response =    @{
                                         @"status": @"error"
    
                                         };
           NSDictionary *finalResponse =    @{
                                              @"response": response,
                                               @"request": request
    
                                               };
            // NSArray *array = @[finalResponse];
    
           [finalarrayresp addObject:finalResponse];

    
           currentPings =0;
           totalPctRecieved =0;
    
    
    
    
           if([cmd.arguments count]==i+1){
               CDVPluginResult* pluginResult = nil;
                i=0;
                pluginResult =  [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:finalarrayresp];
    
                // currentPings =0;
                //totalPctRecieved =0;
    
               [self.commandDelegate sendPluginResult:pluginResult callbackId:cmd.callbackId];
            }else{
                i++;
                [self pingNext:cmd];
            }
    
    
    
            //  [self pingNext:cmd];
    
            //  CDVPluginResult* pluginResult = nil;
            //  pluginResult =    [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:array];
            //  currentPings =0;
            //totalPctRecieved =0;
    
           //  [self.commandDelegate sendPluginResult:pluginResult callbackId:cmd.callbackId];
    


    
    
    
    
    
    
   // currentPings++;
   // [self checkNextPing];
    //   [sendTimer invalidate];
    //    sendTimer = nil;
    
    // No need to call -stop.  The pinger will stop itself in this case.
    // We do however want to nil out pinger so that the runloop stops.
    
    /// pinger = nil;
}



- (void)simplePing:(SimplePing *)pinger didSendPacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber {
#pragma unused(pinger)
    
#pragma unused(packet)
    NSLog(@"#%u sent", (unsigned int) sequenceNumber);
    pingTimer = [NSTimer scheduledTimerWithTimeInterval:timeoutVal target:self selector:@selector(timerFired:) userInfo:nil repeats:NO];
}



- (void)simplePing:(SimplePing *)pinger didFailToSendPacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber error:(NSError *)error {
#pragma unused(pinger)
    
#pragma unused(packet)
    
    
    NSLog(@"#%u send failed: %@", (unsigned int) sequenceNumber, shortErrorFromError(error));
    
    
    
    NSLog(@"failed to start");
    NSDictionary *request =    @{
                                 @"query": cmd.arguments[i][@"query"],
                                 @"timeout": cmd.arguments[i][@"timeout"],
                                 @"retry": cmd.arguments[i][@"retry"],
                                 @"version": cmd.arguments[i][@"version"]
                                 
                                 };
    
    
    NSDictionary *response =    @{
                                  @"status": @"error"
                                  
                                  };
    NSDictionary *finalResponse =    @{
                                       @"response": response,
                                       @"request": request
                                       
                                       };
    // NSArray *array = @[finalResponse];
    
    [finalarrayresp addObject:finalResponse];
    
    
    currentPings =0;
    totalPctRecieved =0;
    
    
    
    
    if([cmd.arguments count]==i+1){
        CDVPluginResult* pluginResult = nil;
        i=0;
        pluginResult =  [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:finalarrayresp];
        
        // currentPings =0;
        //totalPctRecieved =0;
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:cmd.callbackId];
    }else{
        i++;
        [self pingNext:cmd];
    }
    
    //currentPings++;
   // [self checkNextPing];
   
}


- (void)simplePing:(SimplePing *)pinger didReceivePingResponsePacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber rtt:(double)rtt {
    if(currentPings==sequenceNumber){
        [pingTimer invalidate];
#pragma unused(pinger)
        
#pragma unused(packet)
        //  self.pinger = nil;
        
        NSLog(@"REPLY>  %u", (unsigned int)sequenceNumber);
        NSTimeInterval str = rtt;
        NSNumber *rtt1 = [NSNumber numberWithDouble:str];
          rtt1= @([rtt1 floatValue] * 1000);
        NSLog(@"The rtt = %f", [rtt1 floatValue]);
        
       
        [arrayout addObject:rtt1 ];
        
        // NSLog(@"Appended Array: '%@'",arrayout);
        
        totalPctRecieved ++ ;
        currentPings ++;
        [self checkNextPing];
        
    }
}


- (void)simplePing:(SimplePing *)pinger didFailWithTimeout:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber {
#pragma unused(pinger)
    
#pragma unused(packet)
    
    
    NSLog(@"TIMOUT> %u",(unsigned int) sequenceNumber);
    NSTimeInterval str = 0;
    NSNumber *rtt = [NSNumber numberWithDouble:str];
    
    NSLog(@"The rtt = %f", [rtt floatValue]);
    
    
    [arrayout addObject:rtt ];
    
    // NSLog(@"Appended Array: '%@'",arrayout);
    currentPings++;
    [self checkNextPing];
    
    NSLog(@"#%u timout", (unsigned int) sequenceNumber);
    
}

- (void)simplePing:(SimplePing *)pinger didReceiveUnexpectedPacket:(NSData *)packet {
#pragma unused(pinger)
    
    
    [pingTimer invalidate];
    
    NSTimeInterval str = 0;
    NSNumber *rtt = [NSNumber numberWithDouble:str];
    
    NSLog(@"The rtt = %f", [rtt floatValue]);
    
    
    [arrayout addObject:rtt ];
    
    // NSLog(@"Appended Array: '%@'",arrayout);
    currentPings ++;
    
    [self checkNextPing];
    
    NSLog(@"unexpected packet, size=%zu", (size_t) packet.length);
    
    
}







//-------------------------------
//-------------------------------
- (void) getPingInfo:(CDVInvokedUrlCommand*)command

{
    [self.commandDelegate runInBackground:^{
        finalarrayresp =[[NSMutableArray alloc]init];
        cmd =command;
        i=0;
        [self pingNext:command];
        
    }];
    
}


/*! The Objective-C 'main' for this program.
 *  \details This creates a SimplePing object, configures it, and then runs the run loop
 *      sending pings and printing the results.
 *  \param hostName The host to ping.
 */

- (void)runWithHostName:(NSString *)hostName {
    
    
    pinger = [[SimplePing alloc] initWithHostName:hostName];
    
    
    // By default we use the first IP address we get back from host resolution (.Any)
    // but these flags let the user override that.
    
    if (forceIPv4 && !forceIPv6) {
        pinger.addressStyle = SimplePingAddressStyleICMPv4;
    } else if (forceIPv6 && ! forceIPv4) {
        pinger.addressStyle = SimplePingAddressStyleICMPv6;
    }
    
    pinger.delegate = self;
    [pinger start];
    int i = 0;
    do {
        [[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode beforeDate:[NSDate distantFuture]];
        i++;
    } while (pinger!=nil);
}


-(void) pingNext:(CDVInvokedUrlCommand*)command
{
    
    NSLog(@"%@",command.arguments[i][@"query"]);
    // ping = [[GBPing alloc] init];
    host = command.arguments[i][@"query"];
    // ping.delegate = self;
    timeoutVal = [command.arguments[i][@"timeout"] doubleValue];
    //  ping.pingPeriod = 0;
    totalPings = [command.arguments[i][@"retry"] intValue];
    arrayout =[[NSMutableArray alloc]init];
   // currSeq = 0;
    sequencer =[[NSMutableDictionary alloc] init];
    if([command.arguments[i][@"version"] isEqual:@"v6"]){
        forceIPv4 = NO;
        forceIPv6 = YES;
    }else{
        forceIPv6 = NO;
        forceIPv4 = YES;
    }
    
    
    [self runWithHostName:host];
    
  
    
}

-(void)checkNextPing{
    if (totalPings>currentPings){
        [self sendPing];
    }else{
        [sendTimer invalidate];
        sendTimer = nil;
        [pingTimer invalidate];
        
        // No need to call -stop.  The pinger will stop itself in this case.
        // We do however want to nil out pinger so that the runloop stops.
        
        pinger = nil;
        
        
        NSLog(@"Total Packet sent :%d",currentPings);
        NSLog(@"Total Packet received :%d",totalPctRecieved);
        
        
        NSNumber * total = [NSNumber numberWithInt:currentPings];
        NSNumber * recieved = [NSNumber numberWithInt:totalPctRecieved];
        
        NSNumber * max = [arrayout valueForKeyPath:@"@max.floatValue"];
        NSNumber * min = [arrayout valueForKeyPath:@"@min.floatValue"];
        NSNumber * avg = [arrayout valueForKeyPath:@"@avg.floatValue"];
        
        NSLog(@"Max Value = %f ",[max floatValue]);
        NSLog(@"Min Value = %f ",[min floatValue]);
        NSLog(@"Avg Value = %f ",[avg floatValue]);
        
        float pctLoss = (((float)currentPings-totalPctRecieved)/currentPings)*100;
        NSNumber * pctLostPer = @(pctLoss );
        NSString *percentString=[NSString stringWithFormat:@"%@%@",pctLostPer,@"%"];
        
        CDVPluginResult* pluginResult = nil;
        
        NSDictionary *result =    @{
                                    @"target":cmd.arguments[i][@"query"],
                                    @"pctReceived":recieved,
                                    @"maxRtt": max,
                                    @"minRtt": min,
                                    @"avgRtt": avg,
                                    @"pctTransmitted":total,
                                    @"pctLoss":percentString
                                    
                                    };
        
        
        
        NSString *status = @"success";
        if([avg floatValue] <= 0){
            status =@"timeout";
            
            
        }
        
        NSDictionary *response =    @{
                                      @"status": status,
                                      @"result": result
                                      
                                      };
        
        
        
        NSDictionary *request =    @{
                                     @"query": cmd.arguments[i][@"query"],
                                     @"timeout": cmd.arguments[i][@"timeout"],
                                     @"retry": cmd.arguments[i][@"retry"],
                                     @"version": cmd.arguments[i][@"version"]
                                     
                                     };
        
        
        NSDictionary *finalResponse =    @{
                                           @"response": response,
                                           @"request": request
                                           
                                           };
        //  NSArray *array = @[finalResponse];
        [finalarrayresp addObject:finalResponse];
        currentPings =0;
        totalPctRecieved =0;
        
        
        if([cmd.arguments count]==i+1){
            i=0;
            pluginResult =    [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:finalarrayresp];
            
            // currentPings =0;
            //totalPctRecieved =0;
            
            [self.commandDelegate sendPluginResult:pluginResult callbackId:cmd.callbackId];
        }else{
            i++;
            [self pingNext:cmd];
        }
    }
}

/*-(void)ping:(GBPing *)pinger didReceiveReplyWithSummary:(GBPingSummary *)summary {
 NSLog(@"REPLY>  %@", summary);
 NSTimeInterval str = summary.rtt;
 NSNumber *rtt = [NSNumber numberWithDouble:str];
 
 NSLog(@"The rtt = %f", [rtt floatValue]);
 
 
 [arrayout addObject:rtt ];
 
 // NSLog(@"Appended Array: '%@'",arrayout);
 
 totalPctRecieved ++ ;
 currentPings ++;
 [self checkNextPing];
 }*/

/*-(void)ping:(GBPing *)pinger didReceiveUnexpectedReplyWithSummary:(GBPingSummary *)summary {
 NSLog(@"BREPLY> %@", summary);
 NSTimeInterval str = summary.rtt;
 NSNumber *rtt = [NSNumber numberWithDouble:str];
 
 NSLog(@"The rtt = %f", [rtt floatValue]);
 
 
 [arrayout addObject:rtt ];
 
 // NSLog(@"Appended Array: '%@'",arrayout);
 currentPings ++;
 [self checkNextPing];
 }
 */
/*-(void)ping:(GBPing *)pinger didSendPingWithSummary:(GBPingSummary *)summary {
 NSLog(@"SENT>   %@", summary);
 // currentPings++;
 // [self checkNextPing];
 }
 */
/*-(void)ping:(GBPing *)pinger didTimeoutWithSummary:(GBPingSummary *)summary {
 NSLog(@"TIMOUT> %@", summary);
 NSTimeInterval str = summary.rtt;
 NSNumber *rtt = [NSNumber numberWithDouble:str];
 
 NSLog(@"The rtt = %f", [rtt floatValue]);
 
 
 [arrayout addObject:rtt ];
 
 // NSLog(@"Appended Array: '%@'",arrayout);
 currentPings++;
 [self checkNextPing];
 }
 */
/*
 -(void)ping:(GBPing *)pinger didFailWithError:(NSError *)error {
 NSLog(@"FAIL>   %@", error);
 currentPings++;
 [self checkNextPing];
 }
 */
/*
 -(void)ping:(GBPing *)pinger didFailToSendPingWithSummary:(GBPingSummary *)summary error:(NSError *)error {
 NSLog(@"FSENT>  %@, %@", summary, error);
 currentPings++;
 [self checkNextPing];
 }
 */


@end

