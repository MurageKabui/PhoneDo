
# cordova-plugin-ping

[![NPM version](https://img.shields.io/npm/v/cordova-plugin-ping.svg)](https://www.npmjs.org/package/cordova-plugin-ping)

This plugin implements the [`ping` software utility](https://en.wikipedia.org/wiki/Ping_%28networking_utility%29).


## Supported Platforms

- Android
- iOS

## Installation

> cordova plugin add cordova-plugin-ping

or

> cordova plugin add https://github.com/t1st3/cordova-plugin-ping.git

## Usage

This plugin defines a global `Ping` object.
Although the object is in the global scope, it is not available until after the `deviceready` event.

### Ping a domain

> - query : Domain or IP address to ping.
> - timeout : Time to wait for a response, in seconds.
> - retry :  Number of echo requests to send.
> - version : Ping IPv4 or IPv6 address (Ping or Ping6).

```js
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  var p, success, err, ipList;
  ipList = [{query: 'www.tiste.org', timeout: 1,retry: 3,version:'v4'},
            {query: 'www.somesite.com', timeout: 2,'retry': 3,version:'v6'}];
  success = function (results) {
    console.log(results);
  };
  err = function (e) {
    console.log('Error: ' + e);
  };
  p = new Ping();
  p.ping(ipList, success, err);
}
```

## API

### Ping.ping

This method takes the following arguments:

* ipList: an array of json objects with parameters : domain to query, retry, timeout and version.
* success: a callback function that handles success
* err: a callback function that handles error

The callback function for success takes one argument, which is a JSON array of results:

```json
[{
    "response": {
        "status": "success",
        "result": {
            "target": "www.tiste.org",
            "avgRtt": "4.476",
            "maxRtt": "6.348",
            "minRtt": "1.007",
            "pctTransmitted": "3",
            "pctReceived": "3",
            "pctLoss": "0%"
        }
    },
    "request": {
        "query": "www.tiste.org",
        "timeout": "1",
        "retry": "3",
        "version": "v4"
    }
 }, {
    "response": {
        "status": "success",
        "result": {
            "target": "www.somesite.com",
            "avgRtt": "4.811",
            "maxRtt": "7.294",
            "minRtt": "0.915",
            "pctTransmitted": "3",
            "pctReceived": "3",
            "pctLoss": "0%"
        }
    },
    "request": {
        "query": "www.somesite.com",
        "timeout": "2",
        "retry": "3",
        "version": "v6"
    }
 }]
```

The callback function for error takes one argument, which is the error emitted.


## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT). Check the [license file](https://github.com/t1st3/cordova-plugin-ping/blob/master/license).
