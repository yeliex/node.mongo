/**
 * Creator: yeliex <yeliex@yeliex.com>
 * Description: 异步转同步mongo连接类
 */
const mongo = require("mongodb").MongoClient;

const extend = {
  no: () => data => data,
  update: (key = 'updatedTime') => (data) => {
    if (!data || !data.$set) {
      return data;
    }
    data.$currentDate = Object.assign({}, {
      [key]: true
    }, data.$currentDate || {});

    delete data.$set[key];

    return data;
  },
  create: (key = 'createdTime') => (data) => {
    if (!data) {
      return data;
    }
    if (data instanceof Array) {
      data = data.map((d) => {
        d[key] = d[key] || new Date();
        return d;
      })
    } else {
      data[key] = data[key] || new Date();
    }
    return data;
  }
};

(() => {
  //constructor cannot be arrow function
  const Mongo = function (url, options) {
    // 首先建立连接
    options = options || {};
    options.autoReconnect = true;

    const { timestamp = true, updatedTime, createdTime } = options;

    const extendUpdate = timestamp ? extend.update(updatedTime) : extend.no();
    const extendCreate = timestamp ? extend.create(createdTime) : extend.no();

    const connect = mongo.connect(url, options);

    this.collections = () => {
      return connect.then((db) => {
        return db.collections();
      });
    };
    this.collection = (collectionName) => {
      return connect.then((db) => {
        return db.collection(collectionName);
      });
    };
    this.count = (collectionName, query, options) => {
      return this.collection(collectionName).then((collection) => {
        return collection.count(query, options);
      });
    };
    this.create = this.insert = (collectionName, data) => {
      return this.collection(collectionName).then((collection) => {
        return collection.insert(extendCreate(data));
      });
    };
    this.find = (collectionName, filter, condition, cursor) => {
      return this.collection(collectionName).then((collection) => {
        if (!cursor) {
          return collection.find(filter, condition).toArray();
        } else {
          return collection.find(filter, condition);
        }
      });
    };
    this.findOne = (collectionName, filter, condition) => {
      return this.collection(collectionName).then((collection) => {
        return collection.findOne(filter, condition);
      });
    };
    this.update = (collectionName, filter, data, options) => {
      return this.collection(collectionName).then((collection) => {
        return collection.update(filter, extendUpdate(data), Object.assign({}, { upsert: false }, options));
      });
    };
    this.updateOne = (collectionName, filter, data, options) => {
      return this.collection(collectionName).then((collection) => {
        return collection.updateOne(filter, extendUpdate(data), Object.assign({}, { upsert: true }, options));
      });
    };
    this.remove = (collectionName, filter, options) => {
      return this.collection(collectionName).then((collection) => {
        return collection.deleteMany(filter, options);
      });
    };
    this.aggregate = (collectionName, pipeline, options) => {
      return this.collection(collectionName).then((collection) => {
        return new Promise((rec, rej) => {
          collection.aggregate(pipeline, (err, res) => {
            if (err) {
              rej(err);
            } else {
              rec(res);
            }
          });
        });
      });
    };
    return this;
  };

  module.exports = (url, options) => {
    return (new Mongo(url, options));
  };
})();