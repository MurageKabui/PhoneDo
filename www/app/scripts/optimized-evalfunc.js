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
        this._apiTemplate = null; // Cache for the static part of the API
        this.initializeBridges();
    }
    /**
     * Initialize all bridge objects for native functionality
     */
    initializeBridges() {
        // Clipboard Bridge
        this.bridges.clipboard = {
            _clipboardSetText: async text => {
                return new Promise((resolve, reject) => {
                    app.plugins.decsoft.clipboard.setText(text, () => resolve(true), error => reject("clipboard error: " + error));
                });
            }
        };
        // Console Bridge
        this.bridges.console = {
            _prompt: () => new Promise((resolve) => {
                app.store.jqconsole.Prompt(true, function (input) {
                    app.store.jqconsole.ScrollWindowToPrompt();
                    resolve(input);
                });
            }),
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
            _send: async function (phoneNumber, message) {
                return new Promise((resolve, reject) => {
                    try {
                        SMS.sendSMS(phoneNumber, message, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            },
            // List SMS
            _list: async function (filter = {}) {
                return new Promise((resolve, reject) => {
                    try {
                        SMS.listSMS(filter, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            },
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
            },
            _Confirm: async (message, title, klass = app.kind.primary, a_oButtons = [{
                text: "Cancel",
                kind: app.kind.secondary,
                size: app.size.md
            }, {
                text: "OK",
                kind: app.kind.primary,
                size: app.size.md
            }]) => {
                return new Promise(resolve => {
                    app.showAlert(message, title, klass, a_oButtons, index => resolve(index === 1));
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
            // Default configuration
            DEFAULT_CONFIG: {
                // Basic window features
                zoom: 'no',
                hardwareback: 'yes',
                footer: 'no',
                location: 'no',
                hideurlbar: 'yes',
                hidenavigationbuttons: 'no',

                // Colors and appearance
                toolbarcolor: '#4a4968',
                navigationbuttoncolor: '#ffffff',
                closebuttoncolor: '#1E1E2A',

                // Toolbar options
                toolbar: 'yes',
                enableViewportScale: 'yes',
                mediaPlaybackRequiresUserAction: 'yes',
                shouldPauseOnSuspend: 'yes',

                // Security features
                clearcache: 'no',
                clearsessioncache: 'no',

                // Presentation
                presentationstyle: 'pagesheet',
                transitionstyle: 'crossdissolve',

                // Hidden by default, can be enabled
                lefttoright: 'yes',
                fullscreen: 'no',

                // User interaction
                usewkwebview: 'yes',
                keyboardDisplayRequiresUserAction: 'yes'
            },

            /**
             * Opens a URL in the InAppBrowser with custom configuration
             * @param {string} url - The URL to open
             * @param {string} target - Target window ('_blank', '_self', '_system')
             * @param {Object} customConfig - Optional custom configuration
             * @returns {Promise<InAppBrowserObject>} - Promise resolving to browser instance
             */
            _openBrowser: async (url, target = '_blank', customConfig = {}) => {
                return new Promise((resolve, reject) => {
                    try {
                        // Input validation
                        if (!url || typeof url !== 'string') {
                            throw new Error('Invalid URL provided');
                        }

                        if (!['_blank', '_self', '_system'].includes(target)) {
                            throw new Error('Invalid target. Must be _blank, _self, or _system');
                        }

                        // Merge default config with custom config
                        const config = { ...this.bridges.browser.DEFAULT_CONFIG, ...customConfig };

                        // Convert config object to features string
                        const features = Object.entries(config)
                            .map(([key, value]) => `${key}=${value}`)
                            .join(',');

                        // Create browser instance
                        const browserInstance = cordova.InAppBrowser.open(url, target, features);

                        if (!browserInstance) {
                            throw new Error('Failed to create browser instance');
                        }

                        // Set up event listeners
                        browserInstance.addEventListener('loadstart', (event) => {
                            console.log('Started loading:', event.url);
                        });

                        browserInstance.addEventListener('loadstop', (event) => {
                            console.log('Finished loading:', event.url);
                        });

                        browserInstance.addEventListener('loaderror', (event) => {
                            console.error('Loading error:', event.message);
                        });

                        browserInstance.addEventListener('exit', () => {
                            console.log('Browser closed');
                        });

                        resolve(browserInstance);
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            /**
             * Opens a URL with safe defaults for viewing untrusted content
             * @param {string} url - The URL to open
             * @returns {Promise<InAppBrowserObject>} - Promise resolving to browser instance
             */
            _openSafeMode: async (url) => {
                const safeConfig = {
                    clearcache: 'yes',
                    clearsessioncache: 'yes',
                    toolbar: 'yes',
                    enableViewportScale: 'no',
                    mediaPlaybackRequiresUserAction: 'yes',
                    shouldPauseOnSuspend: 'yes',
                    usewkwebview: 'yes'
                };
                return this.bridges.browser._openBrowser(url, '_blank', safeConfig);
            },

            /**
             * Opens a URL in fullscreen mode
             * @param {string} url - The URL to open
             * @returns {Promise<InAppBrowserObject>} - Promise resolving to browser instance
             */
            _openFullscreen: async (url) => {
                const fullscreenConfig = {
                    fullscreen: 'yes',
                    footer: 'no',
                    toolbar: 'no',
                    location: 'no',
                    hideurlbar: 'yes',
                    hidenavigationbuttons: 'yes'
                };
                return this.bridges.browser._openBrowser(url, '_blank', fullscreenConfig);
            },

            /**
             * Opens a URL in a minimal UI mode (just the content)
             * @param {string} url - The URL to open
             * @returns {Promise<InAppBrowserObject>} - Promise resolving to browser instance
             */
            _openMinimal: async (url) => {
                const minimalConfig = {
                    toolbar: 'no',
                    footer: 'no',
                    location: 'no',
                    hideurlbar: 'yes',
                    hidenavigationbuttons: 'yes',
                    presentationstyle: 'fullscreen'
                };
                return this.bridges.browser._openBrowser(url, '_blank', minimalConfig);
            },

            /**
             * Opens a URL in the system's default browser
             * @param {string} url - The URL to open
             * @returns {Promise<InAppBrowserObject>} - Promise resolving to browser instance
             */
            _openExternal: async (url) => {
                return this.bridges.browser._openBrowser(url, '_system');
            }
        };
        // Sleep/Delay Bridge
        this.bridges.timer = {
            /**
             * Creates a promise that resolves after the specified delay
             * @param {number} ms - Time to sleep in milliseconds
             * @returns {Promise<void>} - Promise that resolves after the delay
             */
            _sleep: async (ms) => {
                return new Promise((resolve) => {
                    if (typeof ms !== 'number' || ms < 0) {
                        throw new Error('Sleep duration must be a positive number');
                    }
                    setTimeout(resolve, ms);
                });
            }
        };
        // Android Permissions Bridge
        this.bridges.permissions = {
            // Permission constants
            ACCESS_COARSE_LOCATION: cordova.plugins.permissions.ACCESS_COARSE_LOCATION,
            ACCESS_FINE_LOCATION: cordova.plugins.permissions.ACCESS_FINE_LOCATION,
            CAMERA: cordova.plugins.permissions.CAMERA,
            READ_CONTACTS: cordova.plugins.permissions.READ_CONTACTS,
            WRITE_CONTACTS: cordova.plugins.permissions.WRITE_CONTACTS,
            READ_CALENDAR: cordova.plugins.permissions.READ_CALENDAR,
            WRITE_CALENDAR: cordova.plugins.permissions.WRITE_CALENDAR,
            READ_EXTERNAL_STORAGE: cordova.plugins.permissions.READ_EXTERNAL_STORAGE,
            WRITE_EXTERNAL_STORAGE: cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE,
            RECORD_AUDIO: cordova.plugins.permissions.RECORD_AUDIO,
            MODIFY_AUDIO_SETTINGS: cordova.plugins.permissions.MODIFY_AUDIO_SETTINGS,
            READ_PHONE_STATE: cordova.plugins.permissions.READ_PHONE_STATE,
            CALL_PHONE: cordova.plugins.permissions.CALL_PHONE,
            READ_SMS: cordova.plugins.permissions.READ_SMS,
            SEND_SMS: cordova.plugins.permissions.SEND_SMS,
            RECEIVE_SMS: cordova.plugins.permissions.RECEIVE_SMS,
            READ_CALL_LOG: cordova.plugins.permissions.READ_CALL_LOG,
            WRITE_CALL_LOG: cordova.plugins.permissions.WRITE_CALL_LOG,
            ADD_VOICEMAIL: cordova.plugins.permissions.ADD_VOICEMAIL,
            USE_SIP: cordova.plugins.permissions.USE_SIP,
            PROCESS_OUTGOING_CALLS: cordova.plugins.permissions.PROCESS_OUTGOING_CALLS,
            BODY_SENSORS: cordova.plugins.permissions.BODY_SENSORS,
            RECEIVE_WAP_PUSH: cordova.plugins.permissions.RECEIVE_WAP_PUSH,
            RECEIVE_MMS: cordova.plugins.permissions.RECEIVE_MMS,
            READ_CELL_BROADCASTS: cordova.plugins.permissions.READ_CELL_BROADCASTS,
            BLUETOOTH: cordova.plugins.permissions.BLUETOOTH,
            BLUETOOTH_ADMIN: cordova.plugins.permissions.BLUETOOTH_ADMIN,
            BLUETOOTH_CONNECT: cordova.plugins.permissions.BLUETOOTH_CONNECT,
            BLUETOOTH_SCAN: cordova.plugins.permissions.BLUETOOTH_SCAN,
            BLUETOOTH_ADVERTISE: cordova.plugins.permissions.BLUETOOTH_ADVERTISE,
            ACCESS_NETWORK_STATE: cordova.plugins.permissions.ACCESS_NETWORK_STATE,
            ACCESS_WIFI_STATE: cordova.plugins.permissions.ACCESS_WIFI_STATE,
            CHANGE_WIFI_STATE: cordova.plugins.permissions.CHANGE_WIFI_STATE,
            CHANGE_NETWORK_STATE: cordova.plugins.permissions.CHANGE_NETWORK_STATE,
            CHANGE_CONFIGURATION: cordova.plugins.permissions.CHANGE_CONFIGURATION,
            GET_ACCOUNTS: cordova.plugins.permissions.GET_ACCOUNTS,
            MANAGE_ACCOUNTS: cordova.plugins.permissions.MANAGE_ACCOUNTS,
            USE_BIOMETRICS: cordova.plugins.permissions.USE_BIOMETRICS,
            USE_FINGERPRINT: cordova.plugins.permissions.USE_FINGERPRINT,
            USE_IRIS: cordova.plugins.permissions.USE_IRIS,
            USE_FACE: cordova.plugins.permissions.USE_FACE,
            POST_NOTIFICATIONS: cordova.plugins.permissions.POST_NOTIFICATIONS,
            READ_MEDIA_IMAGES: cordova.plugins.permissions.READ_MEDIA_IMAGES,
            READ_MEDIA_VIDEO: cordova.plugins.permissions.READ_MEDIA_VIDEO,
            READ_MEDIA_AUDIO: cordova.plugins.permissions.READ_MEDIA_AUDIO,

            /**
             * Checks if a specific permission is granted
             * @param {string} permission - The permission to check
             * @returns {Promise<{hasPermission: boolean}>} - Promise resolving to permission status
             */
            _checkPermission: async (permission) => {
                return new Promise((resolve, reject) => {
                    try {
                        if (!permission || typeof permission !== 'string') {
                            throw new Error('Invalid permission specified');
                        }

                        cordova.plugins.permissions.checkPermission(
                            permission,
                            (status) => resolve(status),
                            (error) => resolve(error)
                        );
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            /**
             * Requests a specific permission from the user
             * @param {string} permission - The permission to request
             * @returns {Promise<{hasPermission: boolean}>} - Promise resolving to permission status
             */
            _requestPermission: async (permission) => {
                return new Promise((resolve, reject) => {
                    try {
                        if (!permission || typeof permission !== 'string') {
                            throw new Error('Invalid permission specified');
                        }

                        cordova.plugins.permissions.requestPermission(
                            permission,
                            (status) => resolve(status),
                            (error) => reject(error)
                        );
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            /**
             * Requests multiple permissions from the user
             * @param {string[]} permissions - Array of permissions to request
             * @returns {Promise<{hasPermission: boolean}>} - Promise resolving to permission status
             */
            _requestPermissions: async (permissions) => {
                return new Promise((resolve, reject) => {
                    try {
                        if (!Array.isArray(permissions) || permissions.length === 0) {
                            throw new Error('Invalid permissions array');
                        }

                        cordova.plugins.permissions.requestPermissions(
                            permissions,
                            (status) => resolve(status),
                            (error) => reject(error)
                        );
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            /**
             * Legacy method to check if a permission is granted (deprecated)
             * @param {string} permission - The permission to check
             * @returns {Promise<{hasPermission: boolean}>} - Promise resolving to permission status
             */
            _hasPermission: async (permission) => {
                return new Promise((resolve, reject) => {
                    try {
                        if (!permission || typeof permission !== 'string') {
                            throw new Error('Invalid permission specified');
                        }

                        cordova.plugins.permissions.hasPermission(
                            permission,
                            (status) => resolve(status),
                            (error) => reject(error)
                        );
                    } catch (error) {
                        reject(error);
                    }
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
            _applicationStorageDirectory: cordova.file.applicationStorageDirectory,
            _dataDirectory: cordova.file.dataDirectory,
            _cacheDirectory: cordova.file.cacheDirectory,
            _externalApplicationStorageDirectory: cordova.file.externalApplicationStorageDirectory,
            _externalDataDirectory: cordova.file.externalDataDirectory,
            _externalCacheDirectory: cordova.file.externalCacheDirectory,
            _externalRootDirectory: cordova.file.externalRootDirectory,
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
                        error => resolve(error.code == 0 ? true : false)
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
                return new Promise((resolve, reject) => {
                    // Resolve the filesystem URL
                    window.resolveLocalFileSystemURL(sPath, (directoryEntry) => {
                        // Get or create the file
                        directoryEntry.getFile(
                            sFileName, { create: true, exclusive: false },
                            (fileEntry) => {
                                // Create a FileWriter object
                                fileEntry.createWriter((fileWriter) => {
                                    fileWriter.onwriteend = () => {
                                        // console.log("File written successfully:", fileEntry.nativeURL);
                                        resolve(fileEntry.nativeURL); // Return the file's URI
                                    };

                                    fileWriter.onerror = (error) => {
                                        // console.error("File writing failed:", error);
                                        reject(error);
                                    };

                                    // Convert content to a Blob and write it
                                    const blob = new Blob([sContent], { type: "text/plain" });
                                    fileWriter.write(blob);
                                });
                            },
                            (error) => {
                                // console.error("Error accessing file:", error);
                                reject(error);
                            }
                        );
                    },
                        (error) => {
                            // console.error("Error resolving file system path:", error);
                            reject(error);
                        });
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
            },

            _resolveLocalFileSystemURL: async (sPath) => {
                return new Promise((resolve, reject) => {
                    if (!sPath) {
                        reject(new Error("Path is required"));
                        return;
                    }
                    // Ensure path starts with file:// if it doesn't already
                    const fullPath = sPath.startsWith('file://') ? sPath : 'file://' + sPath;
                    window.resolveLocalFileSystemURL(fullPath, (entry) => {
                        // Add toNativeURL method if it doesn't exist
                        if (!entry.toNativeURL && entry.toURL) {
                            entry.toNativeURL = function () {
                                // Get the native URL using Cordova's built-in method if available
                                if (typeof this.getNativeURL === 'function') {
                                    return this.getNativeURL();
                                }

                                // Fallback: construct URL based on filesystem type
                                const url = this.toURL();
                                const fsRoot = this.filesystem.root.fullPath;
                                const fsName = this.filesystem.name;

                                // Handle different filesystem types
                                switch (fsName) {
                                    case 'temporary':
                                        return url.replace('file://', 'content://' + cordova.file.cacheDirectory);
                                    case 'persistent':
                                        return url.replace('file://', 'content://' + cordova.file.dataDirectory);
                                    case 'external':
                                        return url.replace('file://', 'content://' + cordova.file.externalRootDirectory);
                                    default:
                                        return url;
                                }
                            };
                        }
                        resolve(entry);
                    }, (error) => {
                        reject(error);
                    });
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
        this.bridges.ble = {
            // Scan for devices with timeout
            _scanBT: async function (onDeviceFound, onScanError, timeout = 10) {
                return new Promise((resolve, reject) => {
                    try {
                        // Start scanning
                        evothings.ble.startScan(
                            onDeviceFound,
                            (error) => {
                                onScanError && onScanError(error);
                                reject(error);
                            }
                        );

                        app.store.jqconsole.Write(`Scanning for devices. Timeout: ${timeout} seconds\n`, "infoStyle");

                        // Set a timer to stop scanning after the specified timeout
                        setTimeout(() => {
                            this._stopBTScan()
                                .then(() => {
                                    app.store.jqconsole.Write('Scanning stopped due to timeout.\n', "infoStyle");
                                    resolve(); // Resolve after stopping scan
                                })
                                .catch((error) => {
                                    app.store.jqconsole.Write(`Error stopping scan after timeout: ${error}\n`, "infoStyle");
                                    reject(error);
                                });
                        }, timeout * 1000); // Convert seconds to milliseconds
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            // Stop scanning for devices
            _stopBTScan: async function () {
                return new Promise((resolve, reject) => {
                    try {
                        evothings.ble.stopScan();
                        app.store.jqconsole.Write('Stopped scanning for devices.', "infoStyle");
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            // Connect to a BLE device
            _connectBT: async function (device, onConnected, onDisconnected, onConnectError, options = {}) {
                return new Promise((resolve, reject) => {
                    try {
                        evothings.ble.connectToDevice(
                            device,
                            (connectedDevice) => {
                                onConnected && onConnected(connectedDevice);
                                resolve(connectedDevice);
                            },
                            (disconnectedDevice) => {
                                onDisconnected && onDisconnected(disconnectedDevice);
                            },
                            (error) => {
                                onConnectError && onConnectError(error);
                                reject(error);
                            },
                            options
                        );
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            // Get a service by UUID
            _getBTService: async function (device, serviceUUID) {
                return new Promise((resolve, reject) => {
                    try {
                        const service = evothings.ble.getService(device, serviceUUID);
                        resolve(service);
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            // Get a characteristic by UUID
            _getBTCharacteristic: async function (service, characteristicUUID) {
                return new Promise((resolve, reject) => {
                    try {
                        const characteristic = evothings.ble.getCharacteristic(service, characteristicUUID);
                        resolve(characteristic);
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            // Read a characteristic
            _readBTCharacteristic: async function (device, characteristic) {
                return new Promise((resolve, reject) => {
                    evothings.ble.readCharacteristic(
                        device,
                        characteristic,
                        (data) => resolve(data),
                        (error) => reject(error)
                    );
                });
            },

            // Write to a characteristic
            _writeBTCharacteristic: async function (device, characteristic, data) {
                return new Promise((resolve, reject) => {
                    evothings.ble.writeCharacteristic(
                        device,
                        characteristic,
                        data,
                        () => resolve(),
                        (error) => reject(error)
                    );
                });
            },

            // Enable notifications for a characteristic
            _enableBTNotification: async function (device, characteristic, onData) {
                return new Promise((resolve, reject) => {
                    evothings.ble.enableNotification(
                        device,
                        characteristic,
                        (data) => {
                            onData && onData(data);
                        },
                        (error) => reject(error)
                    );
                    resolve();
                });
            },

            // Disable notifications for a characteristic
            _disableBTNotification: async function (device, characteristic) {
                return new Promise((resolve, reject) => {
                    try {
                        evothings.ble.disableNotification(device, characteristic);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        };

        this.bridges.http = {
            // Default configurations
            DEFAULT_TIMEOUT: 60.0, // seconds

            // Initialize plugin settings
            _initializeSettings: async function () {
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
            _sendRequest: async function (url, options = {}) {
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
                            function (response) {
                                resolve(response); // Resolve on success
                            },
                            function (errorResponse) {
                                reject(errorResponse); // Reject on failure
                            }
                        );
                    } catch (error) {
                        reject(error); // Catch synchronous errors
                    }
                });
            },

            // Upload file(s)
            _uploadFile: async function (url, params = {}, headers = {}, filePath, name) {
                return new Promise((resolve, reject) => {
                    cordova.plugin.http.uploadFile(url, params, headers, filePath, name,
                        response => resolve(response),
                        error => reject(error)
                    );
                });
            },

            // Download file
            _downloadFile: async function (url, params = {}, headers = {}, filePath) {
                return new Promise((resolve, reject) => {
                    cordova.plugin.http.downloadFile(url, params, headers, filePath,
                        (entry, response) => resolve({ entry, response }),
                        error => reject(error)
                    );
                });
            },

            // Set headers for specific host
            _setHeader: async function (hostname, header, value) {
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
            _setDataSerializer: async function (serializer) {
                if (['urlencoded', 'json', 'utf8', 'multipart', 'raw'].includes(serializer)) {
                    cordova.plugin.http.setDataSerializer(serializer);
                    return true;
                }
                throw new Error('Invalid serializer type');
            },

            // Set request timeout
            _setTimeout: async function (timeout) {
                if (typeof timeout === 'number' && timeout > 0) {
                    cordova.plugin.http.setRequestTimeout(timeout);
                    return true;
                }
                throw new Error('Invalid timeout value');
            },

            // Set SSL/TLS settings
            _setServerTrustMode: async function (mode) {
                return new Promise((resolve, reject) => {
                    cordova.plugin.http.setServerTrustMode(mode,
                        () => resolve(true),
                        error => reject(error)
                    );
                });
            },

            // Cookie management
            _getCookieString: async function (url) {
                return new Promise((resolve, reject) => {
                    try {
                        const cookieString = cordova.plugin.http.getCookieString(url);
                        resolve(cookieString);
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            _setCookie: async function (url, cookie, options = {}) {
                return new Promise((resolve, reject) => {
                    try {
                        cordova.plugin.http.setCookie(url, cookie, options);
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                });
            },

            _clearCookies: async function () {
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
        this.bridges.callNumber = {
            _callNumber: async (number, bypassAppChooser = true) => new Promise((resolve, reject) => {
                window.plugins.CallNumber.callNumber(
                    (result) => resolve(result),
                    (error) => resolve(error),
                    number,
                    bypassAppChooser
                );
            }),
        };

        this.bridges.spinner = {
            _showSpinner: async (title = null, message = "Please wait...", cancelable = false) => {
                try {
                    if (typeof SpinnerDialog !== 'undefined') {
                        SpinnerDialog.show(title, message, cancelable);
                    } else {
                        app.store.jqconsole.ShowSpinner();
                    }
                } catch (error) {
                    console.error('Error showing spinner:', error);
                }
            },
            _hideSpinner: async () => {
                try {
                    if (typeof SpinnerDialog !== 'undefined') {
                        SpinnerDialog.hide();
                    } else {
                        app.store.jqconsole.HideSpinner();
                    }
                } catch (error) {
                    console.error('Error hiding spinner:', error);
                }
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
        // Security: allow-same-origin is required for the parent to access the iframe's contentWindow for bridge injection.
        this.iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
        this.iframe.style.display = "none";
        document.body.appendChild(this.iframe);
        this.idSandBox = this.iframe.contentWindow;

        // Security: Listen for unhandled errors within the sandbox
        this.idSandBox.addEventListener('error', (event) => {
            this.bridges.console._errorPrint(`Runtime Error: ${event.message} at ${event.filename}:${event.lineno}`);
        });

        this.idSandBox.addEventListener('unhandledrejection', (event) => {
            this.bridges.console._errorPrint(`Unhandled Promise Rejection: ${event.reason}`);
        });

        this.isRunning = true;
        // Inject all bridges into sandbox
        Object.values(this.bridges).forEach(bridge => {
            Object.entries(bridge).forEach(([key, value]) => {
                this.idSandBox[key] = value;
            });
        });

        // Set the console specifically to our bridge
        this.idSandBox.console = this.bridges.console;
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
        if (!this._apiTemplate) {
            this._generateAPITemplate();
        }

        // Add dynamic parts (like device info) to the template
        const deviceInfo = this.bridges.deviceInfo.getInfo();
        return `
            ${this._apiTemplate}
            // Device Information & Controls
            const device = Object.freeze({
                ...${JSON.stringify(deviceInfo)},
                vibrate: _vibrate,
                beep: _beep,
            });
        `;
    }

    /**
     * Generate the static part of the sandbox API template
     */
    _generateAPITemplate() {
        this._apiTemplate = `
        // Core Utilities
        const cout = _Print;
        const exit = _exitEval;
        const log = _Print;

        // Android Permissions
        const permission = Object.freeze({
            // Permission Constants
            ACCESS_COARSE_LOCATION: ACCESS_COARSE_LOCATION,
            ACCESS_FINE_LOCATION: ACCESS_FINE_LOCATION,
            CAMERA: CAMERA,
            READ_EXTERNAL_STORAGE: READ_EXTERNAL_STORAGE,
            WRITE_EXTERNAL_STORAGE: WRITE_EXTERNAL_STORAGE,
            READ_CONTACTS: READ_CONTACTS,
            WRITE_CONTACTS: WRITE_CONTACTS,
            READ_CALENDAR: READ_CALENDAR,
            WRITE_CALENDAR: WRITE_CALENDAR,
            READ_PHONE_STATE: READ_PHONE_STATE,
            CALL_PHONE: CALL_PHONE,
            READ_CALL_LOG: READ_CALL_LOG,
            WRITE_CALL_LOG: WRITE_CALL_LOG,
            ADD_VOICEMAIL: ADD_VOICEMAIL,
            USE_SIP: USE_SIP,
            PROCESS_OUTGOING_CALLS: PROCESS_OUTGOING_CALLS,
            READ_SMS: READ_SMS,
            SEND_SMS: SEND_SMS,
            RECEIVE_SMS: RECEIVE_SMS,
            RECEIVE_WAP_PUSH: RECEIVE_WAP_PUSH,
            RECEIVE_MMS: RECEIVE_MMS,
            READ_CELL_BROADCASTS: READ_CELL_BROADCASTS,
            BLUETOOTH: BLUETOOTH,
            BLUETOOTH_ADMIN: BLUETOOTH_ADMIN,
            BLUETOOTH_CONNECT: BLUETOOTH_CONNECT,
            BLUETOOTH_SCAN: BLUETOOTH_SCAN,
            BLUETOOTH_ADVERTISE: BLUETOOTH_ADVERTISE,
            ACCESS_NETWORK_STATE: ACCESS_NETWORK_STATE,
            ACCESS_WIFI_STATE: ACCESS_WIFI_STATE,
            CHANGE_WIFI_STATE: CHANGE_WIFI_STATE,
            CHANGE_NETWORK_STATE: CHANGE_NETWORK_STATE,
            CHANGE_CONFIGURATION: CHANGE_CONFIGURATION,
            GET_ACCOUNTS: GET_ACCOUNTS,
            MANAGE_ACCOUNTS: MANAGE_ACCOUNTS,
            USE_BIOMETRICS: USE_BIOMETRICS,
            USE_FINGERPRINT: USE_FINGERPRINT,
            USE_IRIS: USE_IRIS,
            USE_FACE: USE_FACE,
            POST_NOTIFICATIONS: POST_NOTIFICATIONS,
            READ_MEDIA_IMAGES: READ_MEDIA_IMAGES,
            READ_MEDIA_VIDEO: READ_MEDIA_VIDEO,
            READ_MEDIA_AUDIO: READ_MEDIA_AUDIO,
            RECORD_AUDIO: RECORD_AUDIO,
            MODIFY_AUDIO_SETTINGS: MODIFY_AUDIO_SETTINGS,
            BODY_SENSORS: BODY_SENSORS,
            // Methods
            checkPermission: _checkPermission,
            requestPermission: _requestPermission,
            requestPermissions: _requestPermissions,
            hasPermission: _hasPermission // Legacy method
        });

        // Browser Bridge
        const browser = {
            open: _openBrowser,
            openSafe: _openSafeMode,
            openFullscreen: _openFullscreen,
            openMinimal: _openMinimal,
            openExternal: _openExternal
        };
        
        Object.freeze(browser);

        const SMS = Object.freeze({
            sendSMS: _send,
            listSMS: _list
        });

        const ANSI = Object.freeze({
            RESET: '\\x1b[0m',
            BLACK: '\\x1b[30m', // Foreground (text) colors
            RED: '\\x1b[31m',
            GREEN: '\\x1b[32m',
            YELLOW: '\\x1b[33m',
            BLUE: '\\x1b[34m',
            MAGENTA: '\\x1b[35m',
            CYAN: '\\x1b[36m',
            WHITE: '\\x1b[37m',
            BG_BLACK: '\\x1b[40m', // Background colors
            BG_RED: '\\x1b[41m',
            BG_GREEN: '\\x1b[42m',
            BG_YELLOW: '\\x1b[43m',
            BG_BLUE: '\\x1b[44m',
            BG_MAGENTA: '\\x1b[45m',
            BG_CYAN: '\\x1b[46m',
            BG_WHITE: '\\x1b[47m',
            BOLD: '\\x1b[1m', // Additional formatting
            ITALIC: '\\x1b[3m',
            UNDERLINE: '\\x1b[4m',
            BLINK: '\\x1b[5m',
            INVERSE: '\\x1b[7m',
            STRIKETHROUGH: '\\x1b[9m'
        });
            
        // Console Interface
        const console = Object.freeze({
            prompt : _prompt,
            log: _infoPrint,
            info: _infoPrint,
            warn: _errorPrint,
            error: _errorPrint,
            success: _successPrint,
            clear: _consoleclear,
            cls: _consoleclear,
            assert: assert,
            count: count,
            debug: debug,
            dir: dir,
            dirxml: dirxml,
            group: group,
            groupCollapsed: groupCollapsed,
            groupEnd: groupEnd,
            memory: memory,
            profile: profile,
            profileEnd: profileEnd,
            table: table,
            time: time,
            timeEnd: timeEnd,
            timeLog: timeLog,
            trace: trace,
            warn: warn
        });

        // Global Dialog Functions
        const alert = (message, title) => _Alert(message, title);
        const confirm = (message, title) => _Confirm(message, title);

        // Device Hardware Controls
        const flashlight = Object.freeze({
            switchOn: _turnOnFlashlight,
            switchOff: _turnOffFlashlight,
            toggleState: _toggleFlashlight
        });

        // UI Dialogs
        const dialog = Object.freeze({
            alert: _Alert,
            confirm: _Confirm
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
            removeDirectory: _removeDirectory,
            resolveLocalFileSystemURL: _resolveLocalFileSystemURL,
            fileURLToPath: (fileURL) => fileURL.replace('file://', '')
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

        // SIM Card Operations
        const sim = Object.freeze({
            hasPermission: _checkSimPermission,
            requestPermission: _requestSimPermission,
            getInfo: _getSimInfo,
            callNumber: _callNumber
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

        const sleep = _sleep;

        const spinner = Object.freeze({
            show: _showSpinner,
            hide: _hideSpinner
        });
        `;
    }
    /**
     * Execute script in sandbox
     */
    async executeScript(scriptContent) {
        try {
            const api = this.getSandboxAPI();
            const wrappedScript = `
                (async function() {
                    "use strict";
                    try {
                        ${api}
                        ${scriptContent}
                    } catch (innerError) {
                        const msg = innerError instanceof Error ? innerError.message : String(innerError);
                        _errorPrint(" ❌ Runtime Error: " + msg);
                    }
                })();
            `;
            await this.idSandBox.eval(wrappedScript);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            app.store.jqconsole.Write(" ❌ Evaluation Error: " + errorMessage + "\n", "errorStyle");
            console.error("Sandbox Execution Failed:", error);
        }
    }
}

/**
 * Main evaluation function
 */

async function evaluate(scriptContent) {
    if (app.store.runningscript) {
        // Show a confirmation dialog instead of a toast message
        app.cordova.dialogs.confirm(
            'A script is currently running. Do you want to stop it and run this script instead?',
            'Shell Busy',
            function (id) {
                switch (id) {
                    case 1: // User clicked "Stop and Run"
                        // Clean up the current running script
                        if (app.store.sandboxedIframe) {
                            document.body.removeChild(app.store.sandboxedIframe);
                            app.store.sandboxedIframe = null;
                        }
                        app.store.runningscript = false;
                        app.store.jqconsole.Enable();

                        // Now run the new script
                        const sandbox = new SandboxedEnvironment();
                        app.store.sandboxedIframe = sandbox.iframe;
                        app.store.runningscript = true;
                        sandbox.initialize()
                            .then(() => sandbox.executeScript(scriptContent))
                            .finally(() => {
                                sandbox.cleanup();
                                app.store.sandboxedIframe = null;
                                app.store.runningscript = false;
                                app.store.jqconsole.Enable();
                            });
                        break;
                    case 2: // User clicked "Cancel"
                        app.toastMsg("Script execution cancelled.", "short");
                        break;
                }
            },
            ['Stop and Run', 'Cancel']
        );
        return;
    }
    const sandbox = new SandboxedEnvironment();
    app.store.sandboxedIframe = sandbox.iframe;
    app.store.runningscript = true;
    try {
        await sandbox.initialize();
        await sandbox.executeScript(scriptContent);
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        app.store.jqconsole.Write(" ❌ Setup Error: " + msg + "\n", "errorStyle");
        console.error("Sandbox Initialization Failed:", err);
    } finally {
        sandbox.cleanup();
        app.store.sandboxedIframe = null;
        app.store.runningscript = false;
        app.store.jqconsole.Enable();
    }
}