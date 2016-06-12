/**
 * Creator: yeliex <yeliex@yeliex.com>
 * Description: 异步转同步mongo连接类
 */
var mongo = require("mongodb").MongoClient;
(function () {
    const Mongo = function (url, options) {
        // 首先建立连接
        options = options || {};
        options.autoReconnect = true;
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
        this.count = function *(collectionName, query, options) {
            var collection = yield this.collection(collectionName);
            return collection.count(query, options);
        };
        this.insert = function *(collectionName, data) {
            var collection = yield this.collection(collectionName);
            return collection.insert(data);
        };
        this.find = function *(collectionName, filter, condition, cursor) {
            var collection = yield this.collection(collectionName);
            if (!cursor) {
                return collection.find(filter, condition).toArray();
            } else {
                return collection.find(filter, condition);
            }
        };
        this.findOne = function *(collectionName, filter) {
            var collection = yield this.collection(collectionName);
            return collection.findOne(filter);
        };
        this.update = function *(collectionName, filter, data) {
            var collection = yield this.collection(collectionName);
            return collection.update(filter, data, {upsert: true});
        };
        this.updateOne = function *(collectionName, filter, data) {
            var collection = yield this.collection(collectionName);
            return collection.updateOne(filter, data, {upsert: true});
        };
        this.remove = function *(collectionName, filter, options) {
            var collection = yield this.collection(collectionName);
            return collection.deleteMany(filter, options);
        };
        this.aggregate = function *(collectionName, pipeline, options) {
            var collection = yield this.collection(collectionName);
            return new Promise(function (rec, rej) {
                collection.aggregate(pipeline, function (err, res) {
                    if (err) {
                        rej(err);
                    } else {
                        rec(res);
                    }
                });
            });
        };
        return this;
    };

    module.exports = function (url, options) {
        return (new Mongo(url, options));
    }
}());