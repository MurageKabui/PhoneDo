var PLUGIN_NAME = 'WifiPlugin';

var exec = require('cordova/exec');

class WifiManager {
    getWifiList() {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, PLUGIN_NAME, 'getWifiList', []);
        });
    }
    ping(address, count, timeout) {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, PLUGIN_NAME, 'ping', [address, count, timeout]);
        });
    }
    getIpInfo() {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, PLUGIN_NAME, 'getIpInfo', []);
        });
    }
    getSignalStrength() {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, PLUGIN_NAME, 'getSignalStrength', []);
        });
    }
    getWifiStrength() {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, PLUGIN_NAME, 'getWifiStrength', []);
        });
    }

    getAllWifiDetails() {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, PLUGIN_NAME, 'getAllWifiDetails', []);
        });
    }

    isConnectedToInternet() {
        return new Promise((resolve, reject) => {
            exec(function (result) {
                resolve(result == '1');
            }, reject, PLUGIN_NAME, 'isConnectedToInternet', []);
        });
    }

    canConnectToInternet() {
        return new Promise((resolve, reject) => {
            exec(function (result) {
                resolve(result == '1');
            }, reject, PLUGIN_NAME, 'canConnectToInternet', []);
        });
    }

    canConnectToRouter() {
        return new Promise((resolve, reject) => {
            exec(function (result) {
                resolve(result == '1');
            }, reject, PLUGIN_NAME, 'canConnectToRouter', []);
        });
    }

    connectToNetwork(ssid, password) {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, PLUGIN_NAME, 'connectToNetwork', [ssid, password]);
        });
    }

    disconnectFromNetwork() {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, PLUGIN_NAME, 'disconnectFromNetwork', []);
        });
    }

    isWifiEnabled() {
        return new Promise((resolve, reject) => {
            exec(function (result) {
                resolve(result == '1');
            }, reject, PLUGIN_NAME, 'isWifiEnabled', []);
        });
    }

    wifiToggle() {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, PLUGIN_NAME, 'wifiToggle', []);
        });
    }

    checkAndRequestWifiPermission() {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, PLUGIN_NAME, 'checkAndRequestWifiPermission', []);
        });
    }

    getConnectedDevices() {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, PLUGIN_NAME, 'getConnectedDevices', []);
        });
    }
}

module.exports = new WifiManager();
