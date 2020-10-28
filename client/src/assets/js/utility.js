import idb from "./idb";

var dbPromise = idb.open('account', 1, function (db) {
    if (!db.objectStoreNames.contains('account')) {
        db.createObjectStore('account', { keyPath: 'id' }); // db.createObjectStore actually accress the table
    }
    if (!db.objectStoreNames.contains('comment')) {
        db.createObjectStore('comment', { keyPath: 'id' }); // db.createObjectStore actually accress the table
    }
    // if (!db.objectStoreNames.contains('sync-posts')) {
    //     db.createObjectStore('sync-posts', { keyPath: 'id' });
    // }
});

var util = {
    writeData: function (st, data) {
        return dbPromise
            .then(function (db) {
                var tx = db.transaction(st, 'readwrite');
                var store = tx.objectStore(st);
                store.put(data);
                return tx.complete; // to state the transaction has done
            })
            .catch(function (err) {
                console.log(err);
            });
    },
    readAllData: function (st) {
        return dbPromise
            .then(function (db) {
                var tx = db.transaction(st, 'readonly');
                var store = tx.objectStore(st);
                return store.getAll();
            })
    },
    clearAllData: function (st) {
        return dbPromise
            .then(function (db) {
                var tx = db.transaction(st, 'readwrite');
                var store = tx.objectStore(st);
                store.clear();
                return tx.complete;
            })
    },
    deleteItemFromData: function (st, id) {
        return dbPromise
            .then(function (db) {
                var tx = db.transaction(st, 'readwrite');
                var store = tx.objectStore(st);
                store.delete(id);
                return tx.complete;
            })
            .then(function () {
                console.log('Item deleted!');
            })
    },
    urlBase64ToUint8Array: function (base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    },
    dataURItoBlob: function (dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], { type: mimeString });
        return blob;
    }
}

export default util

