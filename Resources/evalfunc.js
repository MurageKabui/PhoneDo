/**
 * PhoneDo Sandboxed Environment
 * Provides a secure sandbox for executing user scripts with access to device features
 * through Cordova plugins.
 * Author : Murage Kabui
 */
class SandboxedEnvironment {
    constructor() {
        this.iframe = null;
        this.idSandBox = null;
        this.isRunning = false;
        this.bridges = {};
        this.initializeBridges();
    }
    /**
     * Initialize all bridge objects for native functionality
     */
    initializeBridges() {
        // Clipboard Bridgge.,
        this.bridges.clipboard = {
            _clipboardSetText: async text => {
                return new Promise((resolve, reject) => {
                    app.plugins.decsoft.clipboard.setText(text, () => resolve(true), error => reject("clipboard error: " + error));
                });
            }
        };
        // Console Bridge
        this.bridges.console = {
            _infoPrint: (...messages) => {
                app.store.jqconsole.Write(messages.join(" ") + "\n", "infoStyle");
                app.store.jqconsole.ScrollWindowToPrompt();
            },
            _successPrint: (...messages) => {
                app.store.jqconsole.Write(messages.join(" ") + "\n", "successStyle");
                app.store.jqconsole.ScrollWindowToPrompt();
            },
            _Print: (msg = "", customclass = "successStyle") => {
                return app.store.jqconsole.Write(msg, customclass);
            },
            _consoleclear: () => app.store.jqconsole.Clear(),
            _errorPrint: (...messages) => {
                app.store.jqconsole.Write(messages.join(" ") + "\n", "errorStyle");
                app.store.jqconsole.ScrollWindowToPrompt();
            },
            assert: (condition, ...messages) => {
                if (!condition) {
                    this.bridges.console._errorPrint("Assertion failed:", ...messages);
                }
            },
            clear: () => {
                app.store.jqconsole.Clear();
            },
            count: (label = "default") => {
                if (!this.consoleCounters) {
                    this.consoleCounters = {};
                }
                if (!this.consoleCounters[label]) {
                    this.consoleCounters[label] = 0;
                }
                this.consoleCounters[label]++;
                this.bridges.console._infoPrint(`${label}: ${this.consoleCounters[label]}`);
            },
            debug: (...messages) => {
                this.bridges.console._infoPrint(...messages);
            },
            dir: (obj, options) => {
                this.bridges.console._infoPrint(JSON.stringify(obj, null, options?.spaces || 2));
            },
            dirxml: (node) => {
                this.bridges.console._infoPrint((node ? node.outerHTML || node.toString() : 'null')); 
            },
            error: (...messages) => {
                this.bridges.console._errorPrint(...messages);
            },
            group: (label) => {
                this.bridges.console._infoPrint(`--- ${label} ---`); 
            },
            groupCollapsed: (label) => {
                this.bridges.console._infoPrint(`+++ ${label} +++`); 
            },
            groupEnd: () => {
                this.bridges.console._infoPrint('---'); 
            },
            info: (...messages) => {
                this.bridges.console._infoPrint(...messages);
            },
            log: (...messages) => {
                this.bridges.console._infoPrint(...messages);
            },
            memory: () => { 
                this.bridges.console._infoPrint(performance.memory);
            },
            profile: (label) => {
                if (console.profile) { // Check for browser support
                    console.profile(label);
                }
            },
            profileEnd: (label) => {
                if (console.profileEnd) {
                    console.profileEnd(label);
                }
            },
            table: (data, columns) => {
                this.bridges.console._infoPrint(console.table(data, columns)); 
            },
            time: (label = "default") => {
                if (!this.consoleTimers) {
                    this.consoleTimers = {};
                }
                this.consoleTimers[label] = performance.now();
            },
            timeEnd: (label = "default") => {
                if (this.consoleTimers && this.consoleTimers[label]) {
                    let timeDiff = performance.now() - this.consoleTimers[label];
                    this.bridges.console._infoPrint(`${label}: ${timeDiff.toFixed(2)}ms`);
                    delete this.consoleTimers[label];
                }
            },
            timeLog: (label = "default", ...messages) => {
                if (!this.consoleTimers) {
                    this.consoleTimers = {};
                }
                if (!this.consoleTimers[label]) {
                    this.consoleTimers[label] = performance.now();
                }
                let timeDiff = performance.now() - this.consoleTimers[label];
                this.bridges.console._infoPrint(`${label}: ${timeDiff.toFixed(2)}ms - ${messages.join(' ')}`);
            },
            trace: (...messages) => {
                const stack = (new Error()).stack.split('\n').slice(2).join('\n');
                this.bridges.console._infoPrint("Trace:", ...messages, '\n', stack);
            },
            warn: (...messages) => {
                this.bridges.console._errorPrint(...messages);
            }
        };
        // Device Bridge
        this.bridges.device = {
            _toggleFlashlight: async () => {
                return new Promise((resolve, reject) => {
                    window.plugins.flashlight.available(isAvailable => {
                        if (isAvailable) {
                            window.plugins.flashlight.toggle(() => resolve(true), err => reject(err));
                        } else {
                            reject(-1);
                        }
                    });
                });
            },
            _turnOnFlashlight: async () => {
                return new Promise((resolve, reject) => {
                    window.plugins.flashlight.available(isAvailable => {
                        if (isAvailable) {
                            window.plugins.flashlight.switchOn(() => resolve(true), err => reject(err));
                        } else {
                            reject(-1);
                        }
                    });
                });
            },
            _turnOffFlashlight: async () => {
                return new Promise((resolve, reject) => {
                    window.plugins.flashlight.available(isAvailable => {
                        if (isAvailable) {
                            window.plugins.flashlight.switchOff(() => resolve(true), err => reject(err));
                        } else {
                            reject(-1);
                        }
                    });
                });
            },
            _vibrate: duration => {
                app.cordova.vibration.vibrate(duration);
            },
            _beep: () => app.beep()
        };
        // SMS Bridge
        this.bridges.sms = {
            _sendSMS: async (sendTo, textMsg) => {
                return new Promise((resolve, reject) => {
                    if (SMS) {
                        SMS.sendSMS(sendTo, textMsg, () => resolve("OK"), err => reject(`Error sending SMS: ${err}`));
                    } else {
                        reject(" SMS plugin not available.");
                    }
                });
            },
            _listSMS: async () => {
                return new Promise((resolve, reject) => {
                    SMS.listSMS({}, resolve, reject);
                });
            }
        };
        // Dialog Bridge
        this.bridges.dialog = {
            _Alert: async (message, title, klass = app.kind.primary, a_oButtons = [{
                text: "OK",
                kind: app.kind.primary,
                size: app.size.md
            }]) => {
                return new Promise(resolve => {
                    app.showAlert(message, title, klass, a_oButtons, index => resolve(index));
                });
            }
        };

        // Device Info Bridge
        this.bridges.deviceInfo = {
            getInfo: () => ({
                model: app.cordova.device.model(),
                platform: app.cordova.device.platform(),
                uuid: app.cordova.device.uuid(),
                version: app.cordova.device.version(),
                manufacturer: app.cordova.device.manufacturer(),
                isVirtual: app.cordova.device.isVirtual(),
                serial: app.cordova.device.serial(),
                batteryLevel: app.cordova.battery.level,
                isCharging: app.cordova.battery.isPlugged
            })
        };

        // Browser Bridge
        this.bridges.browser = {
            _openBrowser: async (url, target = "_blank") => {
                return new Promise(resolve => {
                    let features = "zoom=no,navigationbuttoncolor=#ffffff,hardwareback=yes,footer=no,location=no,hideurlbar=no,toolbarcolor=#4a4968,closebuttoncolor=#1E1E2A,navigationbuttoncolor=#1E1E2A";
                    resolve(cordova.InAppBrowser.open(url, target, features));
                });
            }
        };
        // Utility Bridge
        this.bridges.utils = {
            _exitEval: (exitCode = 0) => {
                app.hideAlert();
                if (exitCode === 0) {
                    // Ensure the sandboxed iframe exists before attempting to remove it
                    if (
                        app.store &&
                        app.store.sandboxedIframe &&
                        app.store.sandboxedIframe instanceof HTMLElement
                    ) {
                        // Remove iframe from the DOM
                        document.body.removeChild(app.store.sandboxedIframe);
                        app.store.sandboxedIframe = null; // Clear sandboxed iframe reference
                    } else {
                        console.warn('sandboxedIframe is not defined.');
                    }

                    // Mark the script as not running
                    app.store.runningscript = false;
                    // Re-enable jqconsole if available
                    if (app.store.jqconsole && typeof app.store.jqconsole.Enable === 'function') {
                        app.store.jqconsole.Enable();
                    } else {
                        console.warn('jqconsole or its Enable method is not defined.');
                    }
                    return; // Exit successfully
                } else {
                    // Throw an error for non-zero exit codes
                    throw new Error(`Script Terminated. ExitCode: ${exitCode}`);
                }
            }
        };

        // File System Bridge
        this.bridges.filesystem = {
            // Constants for default directories
            _app_rootpath: cordova.file.externalRootDirectory + "Documents/",
            _applicationDirectory: cordova.file.applicationDirectory,
            _applicationStorageDirectory : cordova.file.applicationStorageDirectory,
            _dataDirectory : cordova.file.dataDirectory,
            _cacheDirectory : cordova.file.cacheDirectory,
            _externalApplicationStorageDirectory : cordova.file.externalApplicationStorageDirectory,
            _externalDataDirectory : cordova.file.externalDataDirectory,
            _externalCacheDirectory : cordova.file.externalCacheDirectory,
            _externalRootDirectory : cordova.file.externalRootDirectory,
            // Read text file
            _readTextFile: async (sPath, sFileName) => {
                const path = sPath ?? this.ROOT_PATH;
                return new Promise((resolve, reject) => {
                    app.cordova.file.readTextFile(path, sFileName,
                        contents => resolve(contents),
                        err => reject("readTextFile error: " + app.serialize(err))
                    );
                });
            },

            // Write text to a file
            _writeTextFile: async (sPath, sFileName, sContent) => {
                const path = sPath ?? this.ROOT_PATH;
                return new Promise((resolve, reject) => {
                    app.cordova.file.writeTextFile(path, sFileName, sContent,
                        () => resolve(true),
                        error => reject("writeTextFile error: " + app.serialize(error))
                    );
                });
            },

            // Append text to a file
            _appendTextFile: async (sPath, sFileName, sContent) => {
                const path = sPath ?? this.ROOT_PATH;
                return new Promise((resolve, reject) => {
                    app.cordova.file.appendTextFile(path, sFileName, sContent,
                        () => resolve(true),
                        error => reject("appendTextFile error: " + app.serialize(error))
                    );
                });
            },

            // Create a directory
            _createDirectory: async (sRootPath, sDirName) => {
                const rootPath = sRootPath ?? this.ROOT_PATH;
                return new Promise((resolve, reject) => {
                    app.cordova.file.createDir(rootPath, sDirName,
                        () => resolve(true),
                        error => reject("createDirectory error: " + app.serialize(error))
                    );
                });
            },

            // Check if a directory exists
            _dirExists: async (path) => {
                const rootPath = path ?? this.ROOT_PATH;
                return new Promise((resolve, reject) => {
                    app.cordova.file.dirExists(rootPath,
                        result => resolve(result),
                        error => reject("dirExists error: " + app.serialize(error))
                    );
                });
            },

            // Check if a file exists
            _fileExists: async (sPath, sFileName) => {
                const path = sPath ?? this.ROOT_PATH;
                return new Promise((resolve, reject) => {
                    app.cordova.file.fileExists(path + sFileName,
                        result => resolve(result),
                        error => reject("fileExists error: " + app.serialize(error))
                    );
                });
            },

            // Write content to a file
            _writeFile: async (sPath, sFileName, sContent) => {
                const path = sPath ?? this.ROOT_PATH;
                return new Promise((resolve, reject) => {
                    app.cordova.file.writeFile(path, sFileName, sContent,
                        () => resolve(true),
                        error => reject("writeFile error: " + app.serialize(error))
                    );
                });
            },

            // Delete a file
            _deleteFile: async (sPath, sFileName) => {
                const path = sPath ?? this.ROOT_PATH;
                return new Promise((resolve, reject) => {
                    app.cordova.file.removeFile(path, sFileName,
                        () => resolve(true),
                        error => reject("removeFile error: " + app.serialize(error))
                    );
                });
            },

            // Remove a directory
            _removeDirectory: async (sRootPath, sDirName) => {
                const rootPath = sRootPath ?? this.ROOT_PATH;
                return new Promise((resolve, reject) => {
                    app.cordova.file.removeDir(rootPath + sDirName,
                        () => resolve(true),
                        error => reject("removeDirectory error: " + app.serialize(error))
                    );
                });
            }
        };

        // Network Bridge
        this.bridges.network = {
            _connectionType: () => app.cordova.network.getConnectionType(),
            _getWiFiIPAddress: async () => {
                return new Promise((resolve, reject) => {
                    networkinterface.getWiFiIPAddress(ipInfo => resolve(ipInfo), err => reject(err));
                });
            },
            _getCarrierIPAddress: async () => {
                return new Promise((resolve, reject) => {
                    networkinterface.getCarrierIPAddress(ipInfo => resolve(ipInfo), err => reject(err));
                });
            },
            _getHttpProxyInformation: async url => {
                return new Promise((resolve, reject) => {
                    networkinterface.getHttpProxyInformation(url, info => resolve(info), err => reject(err));
                });
            },
            _ping: async ipList => {
                return new Promise((resolve, reject) => {
                    const p = new Ping();
                    p.ping(ipList, res => resolve(res), err => reject(err));
                });
            }
        };
        this.bridges.wifi = {
            // Basic Controls
            _enableWifi: async () => {
                return new Promise((resolve, reject) => {
                    WifiWizard2.enableWifi().then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _disableWifi: async () => {
                return new Promise((resolve, reject) => {
                    WifiWizard2.disableWifi().then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _isEnabled: () => {
                return new Promise(resolve => {
                    WifiPlugin.isWifiEnabled().then(isEnabled => {
                        resolve(isEnabled);
                    }).catch(error => {
                        resolve(error);
                    });
                });
            },
            _requestWifiPermission: async () => {
                return new Promise((resolve, reject) => {
                    WifiWizard2.requestPermission().then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            // Android 10 (API 29+) Connection Methods
            _suggestConnection: async (ssid, password, algorithm = "WPA", isHiddenSSID = false) => {
                return new Promise((resolve, reject) => {
                    WifiWizard2.suggestConnection(ssid, password, algorithm, isHiddenSSID).then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _specifierConnection: async (ssid, password, algorithm = "WPA", isHiddenSSID = false) => {
                return new Promise((resolve, reject) => {
                    WifiWizard2.specifierConnection(ssid, password, algorithm, isHiddenSSID).then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            // Connection Methods
            _Connectwifi: async (ssid, bindAll, password, algorithm, isHiddenSSID) => {
                return new Promise((resolve, reject) => {
                    WifiWizard2.connect(ssid, bindAll, password, algorithm, isHiddenSSID).then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _disconnectWifi: async ssid => {
                return new Promise((resolve, reject) => {
                    WifiWizard2.disconnect(ssid).then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            // Network Information
            _getConnectedSSID: async () => {
                return new Promise((resolve, reject) => {
                    if (app.cordova.network.getConnectionType() !== app.cordova.network.connectionTypes.WIFI) {
                        resolve(-1);
                        return;
                    }
                    WifiWizard2.getConnectedSSID().then(result => resolve(result)).catch(error => resolve(-1));
                });
            },
            _getConnectedNetworkID: async () => {
                return new Promise(resolve => {
                    WifiWizard2.getConnectedNetworkID().then(result => resolve(result)).catch(error => resolve(-1)); // Return -1 on error, similar to getConnectedSSID
                });
            },
            _getConnectedBSSID: async () => {
                return new Promise((resolve, reject) => {
                    WifiWizard2.getConnectedBSSID().then(result => resolve(result)).catch(error => resolve(null));
                });
            },
            // Connection Verification with controlled error handling
            _isConnectedToInternet: async () => {
                return new Promise(resolve => {
                    WifiPlugin.isConnectedToInternet().then(isConnected => resolve(isConnected)).catch(error => resolve(error));
                });
            },
            _canConnectToRouter: async () => {
                return new Promise(resolve => {
                    WifiWizard2.canConnectToRouter().then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _canConnectToInternet: async () => {
                return new Promise(resolve => {
                    WifiWizard2.canConnectToInternet().then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            // IP Information
            _getWifiIP: async () => {
                return new Promise(resolve => {
                    WifiWizard2.getWifiIP().then(result => resolve(result)).catch(error => resolve(null));
                });
            },
            _getWifiIPInfo: async () => {
                return new Promise(resolve => {
                    WifiWizard2.getWifiIPInfo().then(result => resolve(result)).catch(error => resolve(null));
                });
            },
            // Scanning
            _scanwifi: async () => {
                return new Promise(resolve => {
                    WifiWizard2.scan().then(list => resolve(list)).catch(error => resolve([]));
                });
            },
            // Other methods following same pattern...
            _listNetworks: async () => {
                return new Promise(resolve => {
                    WifiWizard2.listNetworks().then(result => resolve(result)).catch(error => resolve([]));
                });
            },
            // Location services
            _isLocationEnabled: async () => {
                return new Promise(resolve => {
                    WifiWizard2.isLocationEnabled().then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _formatWifiConfig: async (ssid, password, algorithm, isHiddenSSID) => {
                return new Promise(resolve => {
                    WifiWizard2.formatWifiConfig(ssid, password, algorithm, isHiddenSSID).then(result => resolve(result)).catch(error => resolve(null));
                });
            },
            _addNetwork: async wifi => {
                return new Promise(resolve => {
                    WifiWizard2.add(wifi).then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _removeNetwork: async ssid => {
                return new Promise(resolve => {
                    WifiWizard2.remove(ssid).then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _enableNetwork: async (ssid, bindAll, waitForConnection) => {
                return new Promise(resolve => {
                    WifiWizard2.enable(ssid, bindAll, waitForConnection).then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _disableNetwork: async ssid => {
                return new Promise(resolve => {
                    WifiWizard2.disable(ssid).then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _getWifiRouterIP: async () => {
                return new Promise(resolve => {
                    WifiWizard2.getWifiRouterIP().then(result => resolve(result)).catch(error => resolve(null));
                });
            },
            _switchToLocationSettings: async () => {
                return new Promise(resolve => {
                    WifiWizard2.switchToLocationSettings().then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _setBindAll: async () => {
                return new Promise(resolve => {
                    WifiWizard2.setBindAll().then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _resetBindAll: async () => {
                return new Promise(resolve => {
                    WifiWizard2.resetBindAll().then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _reconnectWifi: async () => {
                return new Promise(resolve => {
                    WifiWizard2.reconnect().then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _reassociateWifi: async () => {
                return new Promise(resolve => {
                    WifiWizard2.reassociate().then(result => resolve(result)).catch(error => resolve(false));
                });
            },
            _getSSIDNetworkID: async ssid => {
                return new Promise(resolve => {
                    WifiWizard2.getSSIDNetworkID(ssid).then(result => resolve(result)).catch(error => resolve(-1));
                });
            },
            _timeout: async delay => {
                return new Promise(resolve => {
                    WifiWizard2.timeout(delay).then(result => resolve(result)).catch(error => resolve(true)); // Always resolves true after delay
                });
            }
        };
        // Utter Bridge
        this.bridges.utter = {
            _UtterText: async (txt = "", rate_ = .95, pitch_ = 1, id_ = "en-au-x-auc-local") => {
                return new Promise((resolve, reject) => {
                    TTS.speak({
                        text: txt,
                        rate: rate_,
                        pitch: pitch_,
                        identifier: id_,
                        cancel: true
                    }).then(resolve, reject);
                });
            },
            _getvoices: async () => TTS.getVoices(),
            _utterCanRec: async () => {
                return new Promise((resolve, reject) => {
                    window.plugins.speechRecognition.isRecognitionAvailable(bRes => resolve(bRes), err => reject(err));
                });
            },
            _utterListen: async options => {
                return new Promise((resolve, reject) => {
                    window.plugins.speechRecognition.startListening(oRes => resolve(oRes), err => reject(err), options);
                });
            },
            _utterStopListen: async () => {
                return new Promise((resolve, reject) => {
                    window.plugins.speechRecognition.stopListening(res => resolve(res), err => reject(err));
                });
            },
            _utter_requestPermission: async () => {
                return new Promise((resolve, reject) => {
                    window.plugins.speechRecognition.requestPermission(ret => resolve(ret), err => reject(err));
                });
            },
            _utter_hasPermission: async () => {
                return new Promise((resolve, reject) => {
                    window.plugins.speechRecognition.hasPermission(ret => resolve(ret), err => reject(err));
                });
            }
        };
        // SIM Bridge
        this.bridges.sim = {
            _requestSimPermission: async () => {
                return new Promise(resolve => {
                    window.plugins.sim.requestReadPermission(bPerm => resolve(bPerm));
                });
            },
            _checkSimPermission: async () => {
                return new Promise(resolve => {
                    window.plugins.sim.hasReadPermission(hasPermission => resolve(hasPermission));
                });
            },
            _getSimInfo: async () => {
                return new Promise((resolve, reject) => {
                    window.plugins.sim.getSimInfo(result => resolve(result), err => reject(err));
                });
            }
        };
        // Bluetooth Bridge
        this.bridges.bluetooth = {
            _scanForBLEDevices: async (tsec = 10) => {
                return new Promise((resolve, reject) => {
                    if (typeof bluetoothle !== "undefined") {
                        const devicesFound = [];
                        const params = {
                            services: ["180D", "180F"],
                            allowDuplicates: false,
                            scanTimeout: tsec
                        };
                        bluetoothle.startScan(device => {
                            devicesFound.push(device);
                        }, err => {
                            reject(err);
                        }, params);
                        setTimeout(() => {
                            bluetoothle.stopScan(() => {
                                resolve(devicesFound);
                            }, err => {
                                reject(err);
                            });
                        }, tsec * 1e3);
                    } else {
                        reject("Error: Bluetooth LE plugin is not available");
                    }
                });
            }
        };
        this.bridges.http = {
            // Default configurations
            DEFAULT_TIMEOUT: 60.0, // seconds

            // Initialize plugin settings
            _initializeSettings: async function() {
                return new Promise((resolve, reject) => {
                    try {
                        // Ensure DEFAULT_TIMEOUT is a number
                        const timeout = Number(this.DEFAULT_TIMEOUT);
                        if (isNaN(timeout) || timeout <= 0) {
                            throw new Error(`Invalid timeout value: ${this.DEFAULT_TIMEOUT}`);
                        }

                        // Set default serializer to 'urlencoded'
                        cordova.plugin.http.setDataSerializer('urlencoded');

                        // Set default timeout
                        cordova.plugin.http.setRequestTimeout(timeout);

                        // Set default follow redirect behavior
                        cordova.plugin.http.setFollowRedirect(true);

                        // Set default trust mode
                        cordova.plugin.http.setServerTrustMode('default',
                            () => {
                                console.log('Trust mode set to default');
                                resolve();
                            },
                            error => {
                                console.error('Error setting trust mode:', error);
                                reject(error);
                            }
                        );
                    } catch (error) {
                        reject(error);
                    }
                });
            },
           _sendRequest: async function(url, options = {}) {
                return new Promise((resolve, reject) => {
                    try {
                        // Input validation
                        if (!url || typeof url !== 'string') {
                            throw new Error("The URL must be a non-empty string.");
                        }

                        if (!options.method) {
                            options.method = 'get'; // Default method
                        }

                        const validMethods = [
                            'get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'upload', 'download'
                        ];
                        if (!validMethods.includes(options.method.toLowerCase())) {
                            throw new Error(`Invalid HTTP method: ${options.method}`);
                        }

                        if (options.timeout && (isNaN(Number(options.timeout)) || Number(options.timeout) <= 0)) {
                            throw new Error("Timeout must be a positive number.");
                        }

                        // Ensure responseType is valid
                        const validResponseTypes = ['text', 'json', 'arraybuffer', 'blob'];
                        if (options.responseType && !validResponseTypes.includes(options.responseType.toLowerCase())) {
                            throw new Error(`Invalid responseType: ${options.responseType}`);
                        }

                        // Encode the URL if it contains special characters
                        const encodedUrl = encodeURI(url);

                        // Execute the request
                        cordova.plugin.http.sendRequest(
                            encodedUrl,
                            options,
                            function(response) {
                                resolve(response); // Resolve on success
                            },
                            function(errorResponse) {
                                reject(errorResponse); // Reject on failure
                            }
                        );
                    } catch (error) {
                        reject(error); // Catch synchronous errors
                    }
                });
            },

            // Upload file(s)
            _uploadFile: async function(url, params = {}, headers = {}, filePath, name) {
                return new Promise((resolve, reject) => {
                    cordova.plugin.http.uploadFile(url, params, headers, filePath, name,
                        response => resolve(response),
                        error => reject(error)
                    );
                });
            },

            // Download file
            _downloadFile: async function(url, params = {}, headers = {}, filePath) {
                return new Promise((resolve, reject) => {
                    cordova.plugin.http.downloadFile(url, params, headers, filePath,
                        (entry, response) => resolve({ entry, response }),
                        error => reject(error)
                    );
                });
            },

            // Set headers for specific host
            _setHeader: async function(hostname, header, value) {
                return new Promise((resolve, reject) => {
                    try {
                        cordova.plugin.http.setHeader(hostname, header, value);
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            // Set data serializer
            _setDataSerializer: async function(serializer) {
                if (['urlencoded', 'json', 'utf8', 'multipart', 'raw'].includes(serializer)) {
                    cordova.plugin.http.setDataSerializer(serializer);
                    return true;
                }
                throw new Error('Invalid serializer type');
            },

            // Set request timeout
            _setTimeout: async function(timeout) {
                if (typeof timeout === 'number' && timeout > 0) {
                    cordova.plugin.http.setRequestTimeout(timeout);
                    return true;
                }
                throw new Error('Invalid timeout value');
            },

            // Set SSL/TLS settings
            _setServerTrustMode: async function(mode) {
                return new Promise((resolve, reject) => {
                    cordova.plugin.http.setServerTrustMode(mode,
                        () => resolve(true),
                        error => reject(error)
                    );
                });
            },

            // Cookie management
            _getCookieString: async function(url) {
                return new Promise((resolve, reject) => {
                    try {
                        const cookieString = cordova.plugin.http.getCookieString(url);
                        resolve(cookieString);
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            _setCookie: async function(url, cookie, options = {}) {
                return new Promise((resolve, reject) => {
                    try {
                        cordova.plugin.http.setCookie(url, cookie, options);
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            _clearCookies: async function() {
                return new Promise((resolve, reject) => {
                    try {
                        cordova.plugin.http.clearCookies();
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            // Error codes mapping
            ERROR_CODES: {
                PERMISSION_DENIED: -12,
                NOT_FOUND: -1,
                SECURITY_ERR: -2,
                ABORT_ERR: -3,
                NOT_READABLE_ERR: -4,
                ENCODING_ERR: -5,
                NO_MODIFICATION_ALLOWED_ERR: -6,
                INVALID_STATE_ERR: -7,
                SYNTAX_ERR: -8,
                INVALID_MODIFICATION_ERR: -9,
                QUOTA_EXCEEDED_ERR: -10,
                TYPE_MISMATCH_ERR: -11
            }
        };


    }
    /**
     * Initialize the sandbox environment
     */
    async initialize() {
        if (this.isRunning) {
            throw new Error("Sandbox is already running");
        }
        this.iframe = document.createElement("iframe");
        this.iframe.style.display = "none";
        document.body.appendChild(this.iframe);
        this.idSandBox = this.iframe.contentWindow;
        this.isRunning = true;
        // intercept all console functions.
        this.idSandBox.console = {
            _infoPrint: (...messages) => {
                app.store.jqconsole.Write(messages.join(" ") + "\n", "infoStyle");
                app.store.jqconsole.ScrollWindowToPrompt();
            },
            _successPrint: (...messages) => {
                app.store.jqconsole.Write(messages.join(" ") + "\n", "successStyle");
                app.store.jqconsole.ScrollWindowToPrompt();
            },
            _Print: (msg = "", customclass = "successStyle") => {
                return app.store.jqconsole.Write(msg, customclass);
            },
            _consoleclear: () => app.store.jqconsole.Clear(),
            _errorPrint: (...messages) => {
                app.store.jqconsole.Write(messages.join(" ") + "\n", "errorStyle");
                app.store.jqconsole.ScrollWindowToPrompt();
            },
            assert: (condition, ...messages) => {
                if (!condition) {
                    this.bridges.console._errorPrint("Assertion failed:", ...messages);
                }
            },
            clear: () => {
                app.store.jqconsole.Clear();
            },
            count: (label = "default") => {
                if (!this.consoleCounters) {
                    this.consoleCounters = {};
                }
                if (!this.consoleCounters[label]) {
                    this.consoleCounters[label] = 0;
                }
                this.consoleCounters[label]++;
                this.bridges.console._infoPrint(`${label}: ${this.consoleCounters[label]}`);
            },
            debug: (...messages) => {
                this.bridges.console._infoPrint(...messages);
            },
            dir: (obj, options) => {
                this.bridges.console._infoPrint(JSON.stringify(obj, null, options?.spaces || 2));
            },
            dirxml: (node) => {
                this.bridges.console._infoPrint((node ? node.outerHTML || node.toString() : 'null')); 
            },
            error: (...messages) => {
                this.bridges.console._errorPrint(...messages);
            },
            group: (label) => {
                this.bridges.console._infoPrint(`--- ${label} ---`); 
            },
            groupCollapsed: (label) => {
                this.bridges.console._infoPrint(`+++ ${label} +++`); 
            },
            groupEnd: () => {
                this.bridges.console._infoPrint('---'); 
            },
            info: (...messages) => {
                this.bridges.console._infoPrint(...messages);
            },
            log: (...messages) => {
                this.bridges.console._infoPrint(...messages);
            },
            memory: () => { 
                this.bridges.console._infoPrint(performance.memory);
            },
            profile: (label) => {
                if (console.profile) { // Check for browser support
                    console.profile(label);
                }
            },
            profileEnd: (label) => {
                if (console.profileEnd) {
                    console.profileEnd(label);
                }
            },
            table: (data, columns) => {
                this.bridges.console._infoPrint(console.table(data, columns)); 
            },
            time: (label = "default") => {
                if (!this.consoleTimers) {
                    this.consoleTimers = {};
                }
                this.consoleTimers[label] = performance.now();
            },
            timeEnd: (label = "default") => {
                if (this.consoleTimers && this.consoleTimers[label]) {
                    let timeDiff = performance.now() - this.consoleTimers[label];
                    this.bridges.console._infoPrint(`${label}: ${timeDiff.toFixed(2)}ms`);
                    delete this.consoleTimers[label];
                }
            },
            timeLog: (label = "default", ...messages) => {
                if (!this.consoleTimers) {
                    this.consoleTimers = {};
                }
                if (!this.consoleTimers[label]) {
                    this.consoleTimers[label] = performance.now();
                }
                let timeDiff = performance.now() - this.consoleTimers[label];
                this.bridges.console._infoPrint(`${label}: ${timeDiff.toFixed(2)}ms - ${messages.join(' ')}`);
            },
            trace: (...messages) => {
                const stack = (new Error()).stack.split('\n').slice(2).join('\n');
                this.bridges.console._infoPrint("Trace:", ...messages, '\n', stack);
            },
            warn: (...messages) => {
                this.bridges.console._errorPrint(...messages);
            }
        };

        // Inject all bridges into sandbox
        Object.values(this.bridges).forEach(bridge => {
            Object.entries(bridge).forEach(([key, value]) => {
                this.idSandBox[key] = value;
            });
        });
    }
    /**
     * Clean up sandbox resources
     */
    cleanup() {
        if (this.iframe) {
            document.body.removeChild(this.iframe);
            this.iframe = null;
            this.idSandBox = null;
            this.isRunning = false;
        }
    }
    /**
     * Get the sandbox API configuration with all available features
     * @returns {string} The sandboxed API configuration
     */
    getSandboxAPI() {
        return `
        // Core Utilities
        const cout = _Print;
        const openBrowser = _openBrowser;
        const exit = _exitEval;
        const log = _Print;

        const ANSI = Object.freeze({
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
            
        // Console Interface
        const console = Object.freeze({
            log: _infoPrint,
            info: _infoPrint,
            warn: _errorPrint,
            error: _errorPrint,
            success: _successPrint,
            clear: _consoleclear,
            cls: _consoleclear
        });

        // Device Hardware Controls
        const flashlight = Object.freeze({
            switchOn: _turnOnFlashlight,
            switchOff: _turnOffFlashlight,
            toggleState: _toggleFlashlight
        });

        // UI Dialogs
        const dialog = Object.freeze({
            alert: _Alert
        });

        // File System Operations
        const fs = Object.freeze({
            APP_ROOT_DIR: _app_rootpath,
            APP_DIR: _applicationDirectory,
            APP_STORAGE_DIR: _applicationStorageDirectory,
            DATA_DIR: _dataDirectory,
            CACHE_DIR: _cacheDirectory,
            EX_APP_STORAGE_DIR: _externalApplicationStorageDirectory,
            EX_DATA_DIR: _externalDataDirectory,
            EX_CACHE_DIR: _externalCacheDirectory,
            EX_ROOT_DIR: _externalRootDirectory,

            createDirectory: _createDirectory,
            dirExists: _dirExists,
            createFile: _writeFile,
            writeTextFile: _writeTextFile,
            appendTextFile: _appendTextFile,
            readTextFile: _readTextFile,
            fileExists: _fileExists,
            deleteFile: _deleteFile,
            removeDirectory: _removeDirectory
        });

        // Network Operations
        const network = Object.freeze({
            getConnectionType: _connectionType,
            getWIFIIPInfo: _getWiFiIPAddress,
            getCarrierIPInfo: _getCarrierIPAddress,
            getHTTPProxyInfo: _getHttpProxyInformation,
            ping: _ping,
            getIPInfo: _getWifiIPInfo,
            getRouterIP: _getWifiRouterIP,
            canConnectToRouter: _canConnectToRouter,
            canConnectToInternet: _canConnectToInternet
        });

        // WiFi Operations
        const WIFI = Object.freeze({
           // Basic Controls
           enable: _enableWifi,
           disable: _disableWifi,
           isEnabled: _isEnabled,
           requestPermission: _requestWifiPermission,
           
           // API 29+ (Android 10+) Features 
           suggestConnection: _suggestConnection,     // For internet access across all apps
           specifierConnection: _specifierConnection, // For internet access in your app only
           
           // Scanning & Connection
           scan: _scanwifi,
           connect: _Connectwifi,
           disconnect: _disconnectWifi,
           reconnect: _reconnectWifi,
           reassociate: _reassociateWifi,
           
           // Network Information
           getConnectedSSID: _getConnectedSSID,
           getConnectedBSSID: _getConnectedBSSID,
           getConnectedNetworkID: _getConnectedNetworkID,
           listNetworks: _listNetworks,
           getSSIDNetworkID: _getSSIDNetworkID,
           
           // Network Configuration
           formatConfig: _formatWifiConfig,
           addNetwork: _addNetwork,
           removeNetwork: _removeNetwork,
           enableNetwork: _enableNetwork,
           disableNetwork: _disableNetwork,
           
           // Connection Testing
           isConnectedToInternet: _isConnectedToInternet,
           canConnectToRouter: _canConnectToRouter,
           canConnectToInternet: _canConnectToInternet,
           
           // IP Information
           getIP: _getWifiIP,
           getIPInfo: _getWifiIPInfo,
           getRouterIP: _getWifiRouterIP,
           
           // Location Services
           isLocationEnabled: _isLocationEnabled,
           openLocationSettings: _switchToLocationSettings,
           
           // Connection Binding
           setBindAll: _setBindAll,
           resetBindAll: _resetBindAll,
           
           // Helper Functions
           timeout: _timeout
        });

        // Bluetooth Operations
        const bluetooth = Object.freeze({
            scan: _scanForBLEDevices
        });

        // Device Information & Controls
        const device = Object.freeze({
            ...${JSON.stringify(this.bridges.deviceInfo.getInfo())},
            vibrate: _vibrate,
            beep: _beep,
        });

        // SIM Card Operations
        const sim = Object.freeze({
            hasPermission: _checkSimPermission,
            requestPermission: _requestSimPermission,
            getInfo: _getSimInfo
        });

        // Speech & Voice Operations
        const utter = Object.freeze({
            speak: _UtterText,
            getVoices: _getvoices,
            canListen: _utterCanRec,
            listen: _utterListen,
            stopListening: _utterStopListen,
            requestPermission: _utter_requestPermission,
            hasPermission: _utter_hasPermission
        });

        const clipboard = Object.freeze({
            setText: _clipboardSetText
        });

        const http = Object.freeze({
            initializeSettings: _initializeSettings,
            sendRequest: _sendRequest,
            uploadFile : _uploadFile,
            downloadFile : _downloadFile,
            setHeader : _setHeader,
            setDataSerializer : _setDataSerializer,
            setTimeout : _setTimeout,
            setServerTrustMode : _setServerTrustMode,
            getCookieString : _getCookieString,
            setCookie : _setCookie,
            clearCookies : _clearCookies
        });
       
    `;
    }
    /**
     * Execute script in sandbox
     */
    async executeScript(scriptContent) {
        try {
            await this.idSandBox.eval(`
                (async function() {
                    "use strict";
                    ${this.getSandboxAPI()}
                    ${scriptContent}
                })();
            `);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            app.store.jqconsole.Write(" ❌ Error: " + errorMessage + "\n", "warningStyle");
        }
    }
}
/**
 * Main evaluation function - maintains compatibility with existing code
 */

async function evaluate(scriptContent) {
    if (app.store.runningscript) {
        return app.toastMsg("shell busy.. please wait.", "long");
    }
    const sandbox = new SandboxedEnvironment();
    app.store.sandboxedIframe = sandbox.iframe;
    app.store.runningscript = true;
    try {
        await sandbox.initialize();
        await sandbox.executeScript(scriptContent);
    } finally {
        sandbox.cleanup();
        app.store.sandboxedIframe = null;
        app.store.runningscript = false;
        app.store.jqconsole.Enable();
    }
}
