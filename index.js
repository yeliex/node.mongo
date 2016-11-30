/**
 * Creator: yeliex <yeliex@yeliex.com>
 * Description: 异步转同步mongo连接类
 */
const mongo = require("mongodb").MongoClient;
(() => {
  const Mongo = (url, options) => {
    // 首先建立连接
    options = options || {};
    options.autoReconnect = true;
    const connect = mongo.connect(url, options);
    this.collections = async() => {
      return await connect.then((db) => {
        return db.collections();
      });
    };
    this.collection = async(collectionName) => {
      return connect.then((db) => {
        return db.collection(collectionName);
      });
    };
    this.count = async(collectionName, query, options) => {
      const collection = await this.collection(collectionName);
      return collection.count(query, options);
    };
    this.insert = async(collectionName, data) => {
      const collection = await this.collection(collectionName);
      return collection.insert(data);
    };
    this.find = async(collectionName, filter, condition, cursor) => {
      const collection = await this.collection(collectionName);
      if (!cursor) {
        return collection.find(filter, condition).toArray();
      } else {
        return collection.find(filter, condition);
      }
    };
    this.findOne = async(collectionName, filter, condition) => {
      const collection = await this.collection(collectionName);
      return collection.findOne(filter, condition);
    };
    this.update = async(collectionName, filter, data, options) => {
      const collection = await this.collection(collectionName);
      return collection.update(filter, data, Object.assign({}, { upsert: false }, options));
    };
    this.updateOne = async(collectionName, filter, data, options) => {
      const collection = await this.collection(collectionName);
      return collection.updateOne(filter, data, Object.assign({}, { upsert: true }, options));
    };
    this.remove = async(collectionName, filter, options) => {
      const collection = await this.collection(collectionName);
      return collection.deleteMany(filter, options);
    };
    this.aggregate = async(collectionName, pipeline, options) => {
      const collection = await this.collection(collectionName);
      return new Promise((rec, rej) => {
        collection.aggregate(pipeline, (err, res) => {
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

  module.exports = (url, options) => {
    return (new Mongo(url, options));
  }
})();