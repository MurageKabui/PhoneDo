/*global cordova, module*/

module.exports = {
    getTheme: function (successCallback, errorCallback) {
        cordova.exec(function(isdark) {if (isdark == "true") {successCallback(true)} else {successCallback(false)}}, errorCallback, "AutoTheme", "getTheme");
    }
};