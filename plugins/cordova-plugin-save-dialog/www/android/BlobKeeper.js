let moduleMapper = require("cordova/modulemapper");
let indexedDB = moduleMapper.getOriginalSymbol(window, "indexedDB") || window.indexedDB;

function openDB() {
    if (!indexedDB) {
        return Promise.reject("indexedDB is not supported");
    }
    if (openDB._db) {
        return Promise.resolve(openDB._db);
    }
    return new Promise((resolve, reject) => {
        let openRequest = indexedDB.open("CordovaPluginSaveDialog");
        openRequest.onupgradeneeded = () => {
            openRequest.result.createObjectStore("blobs");
        };
        openRequest.onsuccess = () => {
            openDB._db = openRequest.result;
            resolve(openDB._db);
        };
        openRequest.onerror = () => {
            openDB._db = null;
            reject(openRequest.error);
        };
    });
}

function writeBlob(blob) {
    return openDB().then(db => new Promise((resolve, reject) => {
        let objectStore = db.transaction(["blobs"], "readwrite").objectStore("blobs");
        let putRequest = blob ? objectStore.put(blob, 0) : objectStore.clear();
        putRequest.onsuccess = () => {
            resolve();
        };
        putRequest.onerror = () => {
            reject(putRequest.error);
        };
    }));
}

function getBlob() {
    return openDB().then(db => new Promise((resolve, reject) => {
        let objectStore = db.transaction(["blobs"], "readonly").objectStore("blobs");
        let getRequest = objectStore.get(0);
        getRequest.onsuccess = () => {
            resolve(getRequest.result);
        };
        getRequest.onerror = () => {
            reject(getRequest.error);
        };
    }));
}

function warn(reason) {
    console.warn("[SaveDialog]", reason);
}

module.exports = {
    keep: blob => writeBlob(blob).catch(warn),
    get: () => getBlob().catch(warn),
    clear: () => writeBlob(null).catch(warn)
};
