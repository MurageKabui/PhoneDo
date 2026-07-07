
var utils = require('cordova/utils'),
	exec = require('cordova/exec'),
	cordova = require('cordova');

function Ping (ipList) {
	this.results = null;
}

Ping.prototype.ping = function (ipList, success, err) {
	var successCallback, errorCallback, self;
	self = this;
	successCallback = function (r) {
		self.results = r;
		if (success && typeof success === 'function') {
			success(r);
		}
	};
	errorCallback = function (e) {
		if (err && typeof err === 'function') {
			err(e);
		}
	};
	exec(successCallback, errorCallback, "Ping", "getPingInfo", ipList);
};

module.exports = Ping;
