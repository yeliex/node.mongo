/**
 * Creator: yeliex <yeliex@yeliex.com>
 * Description: yeliex 异步转同步mongo连接类
 */

var mongo = require("mongodb").MongoClient;
(function () {
    module.exports = function (url, options) {
        // 首先建立连接
        var connect = mongo.connect(url, options);
        this.collections = function *() {
            return yield connect.then(function (db) {
                return db.collections();
            });
        };
        this.collection = function *(collectionName) {
            return connect.then(function (db) {
                return db.collection(collectionName);
            });
        };
        this.count = function *(collectionName) {
            var collection = yield this.collection(collectionName);
            return collection.count();
        };
        this.insert = function *(collectionName, data) {
            var collection = yield this.collection(collectionName);
            return collection.insert(data);
        };
        this.find = function *(collectionName, filter, condition) {
            var collection = yield this.collection(collectionName);
            return collection.find(filter, condition).toArray();
        };
        this.findOne = function *(collectionName, filter) {
            var collection = yield this.collection(collectionName);
            return collection.findOne(filter);
        };
        this.updateOne = function *(collectionName, filter, data) {
            var collection = yield this.collection(collectionName);
            return collection.updateOne(filter, data, {upsert: true});
        };
        return this;
    }
}());