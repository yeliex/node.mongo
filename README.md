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
- count(collection)
    - *return number of result in specified collection*
- insert(collection,data)
    - *insert a series of new item*
- updateOne(collection,filter,data)
    - *upsert a new item*
- find(collection,filter,condition)
    - *return a group of items (array)*
- findOne(collectionName, filter)
    - *return first item accord with filter*