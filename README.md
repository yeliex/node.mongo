# node.mongo

[![npm](https://img.shields.io/npm/v/node.mongo.svg?style=flat-square)](https://www.npmjs.com/package/node.mongo)

node mongo library

## Installation
```
$ npm install node.mongo
```

## Usage
```js
const mongo = require("node.mongo")(url, options);

const res = await mongo.findOne(collection,condition);
```

## Example
```js
const mongo = require("node.mongo")("mongodb://localhost/test");

const query = await mongo.findOne("test",{});
```

## API Methods

- collections
    - *return all collections in db*
- collection(name)
    - *return specified  collection (for other methods not defined)*
- count(collection,query,options)
    - *return number of result in specified collection*
- insert(collection,data)
    - *insert a series of new item*
- update(collection,filter,data,options)
    - *upsert many items*
- updateOne(collection,filter,data,options)
    - *upsert a new item (auto upsert)*
- find(collection,filter,condition,cursor)
    - *return a group of items (array) (cursor = false)*
    - *return a MongoCursor object (object) (cursor = true)*
- findOne(collectionName,filter,condition)
    - *return first item accord with filter*
- femove(collectionName,filter,option)
    - *remove any numbers of document*
- aggregate(collectionName,pipeline, options)
    - *Execute an aggregation framework pipeline against the collection*