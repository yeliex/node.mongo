# node.mongo

[![npm](https://img.shields.io/npm/v/node.mongo.svg?style=flat-square)](https://www.npmjs.com/package/node.mongo)

node mongo library

## Installation
```
$ npm install node.mongo
```

## Usage
```js
var mongo = require("node.mongo")(url,options);

var res = yeild mongo.findOne(collection,condition);
````

## Example
```js
var mongo = require("node.mongo")("mongodb://localhost/test");

var query = yield mongo.findOne("test",{});
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
- updateOne(collection,filter,data)
    - *upsert a new item*
- find(collection,filter,condition,cursor)
    - *return a group of items (array) (cursor = false)*
    - *return a MongoCursor object (object) (cursor = true)*
- findOne(collectionName,filter)
    - *return first item accord with filter*
- femove(collectionName,filter,option)
    - *remove any numbers of document*
- aggregate(collectionName,pipeline, options)
    - *Execute an aggregation framework pipeline against the collection*
    - ```mongo.aggregate("collection",{id:"$id"})```<br>
     =<br>
     ```db.collection.aggregate([{$group:{_id:{id:"$id"}}}])```<br>
     Result:
        ```
        { "_id" : { "id" : "1" } }
        { "_id" : { "id" : "2" } }
        { "_id" : { "id" : "3" } }
        ```