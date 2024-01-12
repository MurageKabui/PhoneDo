async function evaluate(scriptContent) {
    // scriptContent = scriptContent
    //     .replace(/\/\/[^\n]*/g, '')        // Remove single-line comments
    //     .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove multi-line comments
    if (app.store.runningscript) {
        return app.toastMsg('shell busy.. please wait.', 'long');
    }

    app.setReactiveVar('sandboxedIframe', document.createElement('iframe'));
    app.store.sandboxedIframe.style.display = 'none';
    document.body.appendChild(app.store.sandboxedIframe);

    // app.setReactiveVar('runningscript', true);
    let idSandBox = app.store.sandboxedIframe.contentWindow;
    app.store.runningscript = true;
    async function executeScriptContent() {

        idSandBox._infoPrint = function(...messages) {
            app.store.jqconsole.Write(messages.join(' ') + '\n', 'infoStyle');
            app.store.jqconsole.ScrollWindowToPrompt();
            return;
        };

        idSandBox._successPrint = function(...messages) {
            // app.successPrint(messages.join(' ') + '\n');
            app.store.jqconsole.Write(messages.join(' ') + '\n', 'successStyle');
            app.store.jqconsole.ScrollWindowToPrompt();
            return;
        };

        idSandBox._Print = function(msg = '', customclass = 'successStyle') {
            return app.store.jqconsole.Write(msg, customclass);
        };

        idSandBox._consoleclear = function() {
            return app.store.jqconsole.Clear();
        };

        idSandBox._errorPrint = function(...messages) {
            app.store.jqconsole.Write(messages.join(' ') + '\n', 'errorStyle');
            app.store.jqconsole.ScrollWindowToPrompt();
            return;
        };


        idSandBox._Alert = async function(message, title, klass = app.kind.primary, a_oButtons = [{
            text: 'OK',
            kind: app.kind.primary,
            size: app.size.sm
        }]) {
            return new Promise((resolve) => {
                app.showAlert(
                    message,
                    title,
                    klass,
                    a_oButtons,
                    function(index) {
                        resolve(index);
                    }
                );
            });
        };


        idSandBox._UtterText = async function(txt = '', rate_ = 0.95, pitch_ = 1.0, id_ = 'en-au-x-auc-local') {
            await new Promise((resolve, reject) => {
                TTS.speak({
                    text: txt,
                    rate: rate_,
                    pitch: pitch_,
                    identifier: id_,
                    cancel: true
                }).then(function(res) {
                    resolve(res);
                }, function(reason) {
                    reject(reason);
                });

            });
        };

        idSandBox._getvoices = async function() {
            return new Promise((resolve, reject) => {
                TTS.getVoices().then(function(voices) {
                    resolve(voices);
                }, function(reason) {
                    reject(reason);
                });
            });
        };

        idSandBox._sendRequest = async function(url, methd, hdrs) {
            return new Promise((resolve, reject) => {
                cordova.plugin.http.sendRequest(url, {
                    method: methd,
                    headers: hdrs
                }, function(response) {
                    resolve(response);
                }, function(response) {
                    reject(response);
                });
            });
        };

        idSandBox._requestSimPermission = async function() {
            return new Promise((resolve) => {
                window.plugins.sim.requestReadPermission(function(bPerm) {
                    resolve(bPerm);
                });
            });
        };

        idSandBox._checkSimPermission = async function() {
            return new Promise((resolve) => {
                window.plugins.sim.hasReadPermission(function(hasPermission) {
                    resolve(hasPermission);
                });
            });
        };

        idSandBox._getSimInfo = async function() {
            return new Promise((resolve, reject) => {
                window.plugins.sim.getSimInfo(function(result) {
                    resolve(result);
                }, function(err) {
                    reject(err);
                });
            });
        };

        idSandBox._openBrowser = async function(url, target = '_blank') {
            return new Promise((resolve) => {
                let features = 'zoom=no,navigationbuttoncolor=#ffffff,hardwareback=yes,footer=no,location=no,hideurlbar=no,toolbarcolor=#4a4968,closebuttoncolor=#1E1E2A,navigationbuttoncolor=#1E1E2A';
                resolve(cordova.InAppBrowser.open(url, target, features));
            });
        };


        // UTTER | Speech Recognition : isRecognitionAvailable
        idSandBox._utterCanRec = async function() {
            return new Promise((resolve, reject) => {
                window.plugins.speechRecognition.isRecognitionAvailable(function success(bRes) {
                    resolve(bRes);
                }, function error(err) {
                    reject(err);
                });
            });
        };

        // UTTER | Speech Recognition : Listen
        idSandBox._utterListen = async function(options) {
            return new Promise((resolve, reject) => {
                window.plugins.speechRecognition.startListening(function success(oRes) {
                    resolve(oRes);
                }, function error(err) {
                    reject(err);
                }, options);
            });
        };

        // UTTER : Speech Recognition : Stop Listening
        idSandBox._utterStopListen = async function() {
            return new Promise((resolve, reject) => {
                window.plugins.speechRecognition.stopListening(function success(res) {
                    resolve(res);
                }, function error(err) {
                    reject(err);
                });
            });
        };

        // UTTER : Speech Recognition : Get Supported Languages
        idSandBox._utterGetLangs = async function() {
            return new Promise((resolve, reject) => {
                window.plugins.speechRecognition.getSupportedLanguages(function success(aRes) {
                    resolve(aRes);
                }, function error(err) {
                    reject(err);
                });
            });
        };


        // UTTER : Speech Recognition : Has Permission
        idSandBox._utter_hasPermission = async function() {
            return new Promise((resolve, reject) => {
                window.plugins.speechRecognition.hasPermission(function success(ret) {
                    resolve(ret);
                }, function error(err) {
                    reject(err);
                });
            });
        };

        // UTTER : Speech Recognition : Request Permission
        idSandBox._utter_requestPermission = async function() {
            return new Promise((resolve, reject) => {
                window.plugins.speechRecognition.requestPermission(function success(ret) {
                    resolve(ret);
                }, function error(err) {
                    reject(err);
                });
            });
        };

        idSandBox._exitEval = function(exitCode = 0) {
            throw new Error(' Script Terminated. ExitCode : ' + exitCode + '\n'); // 'Script execution terminated by exit()'
        };

        idSandBox._scanForBLEDevices = async function(tsec = 10) {
            return new Promise((resolve, reject) => {
                // Check if the BLE plugin is available
                if (typeof ble !== 'undefined') {
                    const devicesFound = [];

                    // Start scanning for BLE devices
                    ble.scan([], tsec, (device) => {
                        // Callback when a device is discovered
                        devicesFound.push(device);
                    }, (err) => {
                        // Callback for any error during scanning
                        reject(err);
                    });

                    // Stop scanning after the specified timeout
                    setTimeout(() => {
                        ble.stopScan(() => {
                            resolve(devicesFound);
                        }, (err) => {
                            reject(err);
                        });
                    }, tsec * 1000);
                } else {
                    // BLE plugin is not available
                    reject(' Error : BLE plugin is not available');
                }
            });
        };


        idSandBox._ussdDial = async function(code, simSlotNum = 1) {
            return new Promise((resolve, reject) => {
                ussd.dial(
                    code,
                    simSlotNum,
                    function(response) {
                        resolve(response);
                    },
                    function(err) {
                        reject(err);
                    }
                );
            });
        };


        idSandBox._toggleFlashlight = async function() {
            return new Promise((resolve, reject) => {
                window.plugins.flashlight.available((isAvailable) => {
                    if (isAvailable) {
                        window.plugins.flashlight.toggle(
                            () => {
                                // Flashlight toggled successfully
                                resolve(true);
                            },
                            (err) => {
                                // Failed to toggle flashlight
                                reject(err);
                            }
                        );
                    } else {
                        reject(-1);
                    }
                });
            });
        };

        idSandBox._turnOnFlashlight = async function() {
            return new Promise((resolve, reject) => {
                window.plugins.flashlight.available((isAvailable) => {
                    if (isAvailable) {
                        window.plugins.flashlight.switchOn(
                            () => {
                                // Flashlight turned on successfully
                                resolve(true);
                            },
                            (err) => {
                                // Failed to turn on flashlight
                                reject(err);
                            }
                        );
                    } else {
                        reject(-1);
                    }
                });
            });
        };

        idSandBox._turnOffFlashlight = async function() {
            return new Promise((resolve, reject) => {
                window.plugins.flashlight.available((isAvailable) => {
                    if (isAvailable) {
                        window.plugins.flashlight.switchOff(
                            () => {
                                resolve(true);
                            },
                            (err) => {
                                reject(err);
                            }
                        );
                    } else {
                        reject(-1);
                    }
                });
            });
        };



        // Device
        idSandBox.device = Object.freeze({
            model: app.cordova.device.model(),
            platform: app.cordova.device.platform(),
            uuid: app.cordova.device.uuid(),
            version: app.cordova.device.version(),
            manfacturer: app.cordova.device.manufacturer(),
            manufacturer: app.cordova.device.manufacturer(),
            isVirtual: app.cordova.device.isVirtual(),
            serial: app.cordova.device.serial(),
            batteryLevel: app.cordova.battery.level,
            isCharging: app.cordova.battery.isPlugged,
            vibrate: function(sec) {
                return app.cordova.vibration.vibrate(sec);
            },
            beep: function() {
                return app.beep();
            },
        });


        idSandBox.clipboard = Object.freeze({
            setText: async function(sText = null) {
                return new Promise((resolve, reject) => {
                    app.plugins.decsoft.clipboard.setText(
                        sText,
                        function() {
                            resolve('OK')
                        },
                        function(err) {
                            reject(' clipboard : ' + error);
                        }
                    );
                });
            }
        });

        idSandBox.ANSI = Object.freeze({
            RESET: '\x1b[0m',
            BLACK: '\x1b[30m', // Foreground (text) colors
            RED: '\x1b[31m',
            GREEN: '\x1b[32m',
            YELLOW: '\x1b[33m',
            BLUE: '\x1b[34m',
            MAGENTA: '\x1b[35m',
            CYAN: '\x1b[36m',
            WHITE: '\x1b[37m',
            BG_BLACK: '\x1b[40m', // Background colors
            BG_RED: '\x1b[41m',
            BG_GREEN: '\x1b[42m',
            BG_YELLOW: '\x1b[43m',
            BG_BLUE: '\x1b[44m',
            BG_MAGENTA: '\x1b[45m',
            BG_CYAN: '\x1b[46m',
            BG_WHITE: '\x1b[47m',
            BOLD: '\x1b[1m', // Additional formatting
            ITALIC: '\x1b[3m',
            UNDERLINE: '\x1b[4m',
            BLINK: '\x1b[5m',
            INVERSE: '\x1b[7m',
            STRIKETHROUGH: '\x1b[9m'
        });


        idSandBox._createDirectory = async function(sRootPath = cordova.file.externalRootDirectory, sDirName) {
            return new Promise((resolve, reject) => {
                cordova.file.createDir(sRootPath, sDirName,
                    function() {
                        resolve(1);
                    },
                    function(err) {
                        reject(err);
                    }
                );
            });
        };

        idSandBox._dirExists = async function(sRootPath = cordova.file.externalRootDirectory + 'PhoneDo') {
            return new Promise((resolve, reject) => {
                app.cordova.file.dirExists(sRootPath,
                    function(res) {
                        if (res) {
                            resolve(true);
                        } else {
                            reject(false);
                        }
                    },
                    function(err) {
                        reject(err);
                    }
                );
            });
        };

        idSandBox._fileRead = async function(sPath = cordova.file.externalRootDirectory + 'PhoneDo', sFileName) {
            return new Promise((resolve, reject) => {
                app.cordova.file.readTextFile(
                    sPath,
                    sFileName,
                    function(contents) {
                        resolve(contents);
                    },
                    function(err) {
                        reject(' fileRead error : ' + app.serialize(err));
                    }
                );
            });
        };

        idSandBox._sendSMS = async function(sendTo, textMsg) {
            return new Promise((resolve, reject) => {
                if (SMS) {
                    SMS.sendSMS(
                        sendTo,
                        textMsg,
                        function() {
                            resolve("OK");
                        },
                        function(err) {
                            reject(`Error sending SMS: ${error}`);
                        }
                    );
                } else {
                    reject(" SMS plugin not available.");
                }
            });
        };

        idSandBox._listSMS = async function() {
            return new Promise((resolve, reject) => {
                SMS.listSMS({}, function(data) {
                    resolve(data);
                }, function(err) {
                    reject(err);
                });
            });
        };

        // NETWORK : Get Connection Type.
        idSandBox._connectionType = function() {
            return app.cordova.network.getConnectionType();
        };

        // NETWORK : _getWiFiIP
        idSandBox._getWiFiIPAddress = async function() {
            return new Promise((resolve, reject) => {
                networkinterface.getWiFiIPAddress(
                    function onSuccess(ipInfo) {
                        resolve(ipInfo);
                    },
                    function onError(err) {
                        reject(err);
                    }
                );
            });
        };

        // NETWORK : _getCarrierIP
        idSandBox._getCarrierIPAddress = async function() {
            return new Promise((resolve, reject) => {
                networkinterface.getCarrierIPAddress(
                    function onSuccess(ipInfo) {
                        resolve(ipInfo);
                    },
                    function onError(err) {
                        reject(err);
                    }
                );
            });
        };

        // NETWORK : _getHttpProxyInformation
        idSandBox._getHttpProxyInformation = async function(url) {
            return new Promise((resolve, reject) => {
                networkinterface.getHttpProxyInformation(url, function onSuccess(info) {
                    resolve(info);
                }, function onError(err) {
                    reject(err);
                });
            });
        };

        // NETWORK : PING _ping
        idSandBox._ping = async function(ipList) {
            return new Promise((resolve, reject) => {
                const p = new Ping();
                p.ping(ipList, function success(res) {
                    resolve(res);
                }, function error(err) {
                    reject(err);
                });
            });
        };

        // WifiWizard2.formatWifiConfig(ssid, password, algorithm, isHiddenSSID)
        idSandBox._getWifiIPInfo = async function() {
            return new Promise((resolve, reject) => {
                WifiWizard2.getWifiIPInfo().then(
                    function(info) {
                        resolve(info);
                    },
                    function(err) {
                        reject(err); // Reject with the error if there is one
                    }
                );
            });
        };

        idSandBox._formatConfig = async function(ssid, password, algorithm, isHiddenSSID) {
            return new Promise((resolve, reject) => {
                WifiWizard2.formatWifiConfig(ssid, password, algorithm, isHiddenSSID).then(
                    function(res) {
                        resolve(res);
                    },
                    function(err) {
                        reject(err); // Reject with the error if there is one
                    }
                );
            });
        };

        idSandBox._scanwifi = async function() {
            return new Promise((resolve, reject) => {
                WifiWizard2.scan().then(
                    function(list) {
                        resolve(list);
                    },
                    function(err) {
                        switch (err) {
                            case "WIFI_NOT_ENABLED":
                                resolve(-1);
                                break;
                            default:
                                reject(err);
                                break;
                        }
                    }
                );
            });
        };


        idSandBox._Connectwifi = async function(ssid, bindAll, password, algorithm, isHiddenSSID) {
            return new Promise((resolve, reject) => {
                WifiWizard2.connect(ssid, bindAll, password, algorithm, isHiddenSSID).then(
                    function(ret) {
                        resolve(ret);
                    },
                    function(err) {
                        reject(err); // Reject with the error if there is one
                    }
                );
            });
        };


        idSandBox._getConnectedSSID = async function() {
            return new Promise((resolve, reject) => {
                if (app.cordova.network.getConnectionType() == app.cordova.network.connectionTypes.WIFI) {
                    WifiWizard2.getConnectedSSID().then(
                        function(ssid) {
                            resolve(ssid);
                        },
                        function(err) {
                            reject(err);
                        }
                    );
                } else {
                    resolve(-1);
                }
            });
        };


        idSandBox._enableWifi = async function() {
            return new Promise((resolve, reject) => {
                WifiWizard2.enableWifi().then(
                    function(res) {
                        resolve(res);
                    },
                    function(err) {
                        reject(err); // Reject with the error if there is one
                    }
                );
            });
        };

        idSandBox._disableWifi = async function() {
            return new Promise((resolve, reject) => {
                WifiWizard2.disableWifi().then(
                    function() {
                        resolve("OK");
                    },
                    function(err) {
                        reject(err); // Reject with the error if there is one
                    }
                );
            });
        };

        idSandBox._requestWifiPermission = async function() {
            return new Promise((resolve, reject) => {
                WifiWizard2.requestPermission().then(
                    function() {
                        resolve("OK");
                    },
                    function(err) {
                        reject(err); // Reject with the error if there is one
                    }
                );
            });
        };


        idSandBox._callNumber = async function(number, bypassAppChooser = true) {
            return new Promise((resolve, reject) => {
                window.plugins.CallNumber.callNumber(
                    function(success) {
                        resolve(success);
                    },
                    function(err) {
                        reject(err);
                    },
                    number,
                    bypassAppChooser
                );
            });
        };

        try {
            // Execute user script in the sandboxed app.store.sandboxedIframe.
            await idSandBox.eval(`(async function() {
                "use strict";
                const print = _Print;
                const openBrowser = _openBrowser;
                const exit = _exitEval;

                const sms = Object.freeze({
                    send : _sendSMS,
                    list : _listSMS,
                });

                const fs = Object.freeze({
                    readTextFile: _fileRead,
                    dirExist: _dirExists,
                    makedir: _createDirectory,
                });
                
                const sim = Object.freeze({
                    hasPermission: _checkSimPermission,
                    requestPermission: _requestSimPermission,
                    getInfo: _getSimInfo,
                    dialNumber: _callNumber,
                });
                
                const flashlight = Object.freeze({
                    switchOn: _turnOnFlashlight,
                    switchOff: _turnOffFlashlight,
                    toggleState: _toggleFlashlight,
                });

                const ussd = Object.freeze({
                    dial: _ussdDial
                });

                const network = Object.freeze({
                    getConnectionType: _connectionType,
                    getWIFIIPInfo: _getWiFiIPAddress,
                    getCarrierIPInfo: _getCarrierIPAddress,
                    getHTTPProxyInfo: _getHttpProxyInformation,
                    ping: _ping,
                });
                
                const WIFI = Object.freeze({
                    enable: _enableWifi,
                    disable: _disableWifi,
                    requestPermission: _requestWifiPermission,
                    scan: _scanwifi,
                    getIPInfo: _getWifiIPInfo,
                    formatConfig: _formatConfig,
                    connect: _Connectwifi,
                    getConnectedSSID: _getConnectedSSID,
                });

                const console = Object.freeze({
                    log: _infoPrint,
                    info: _infoPrint,
                    warn: _errorPrint,
                    error: _errorPrint,
                    success: _successPrint,
                    clear: _consoleclear,
                    cls: _consoleclear,
                });

                const utter = Object.freeze({
                    speak: _UtterText,
                    getVoices: _getvoices,
                    canListen: _utterCanRec,
                    listen: _utterListen,
                    stopListening: _utterStopListen,
                    getSupportedLanguages: _utterGetLangs,
                    requestPermission: _utter_requestPermission,
                    hasPermission: _utter_hasPermission,
                });

                const dialog = Object.freeze({
                    alert: _Alert,
                });

                const nts = Object.freeze({
                    makeRequest: _sendRequest,
                });

            ${scriptContent}
          })();`);
        } catch (err) {
            // Handle any evaluation error
            // document.body.removeChild(app.store.sandboxedIframe);
            // idSandBox = null;
            // app.store.sandboxedIframe = null;
            // app.store.jqconsole.Enable();
            // app.store.runningscript = false;
            app.store.jqconsole.Write(' ⚠️ ERROR: ' + err + '\n\n', 'warningStyle');
        } finally {
            document.body.removeChild(app.store.sandboxedIframe);
            idSandBox = null;
            app.store.sandboxedIframe = null;
            app.store.runningscript = false;
            app.store.jqconsole.Enable();
            return;
        }
    }
    await executeScriptContent();
}