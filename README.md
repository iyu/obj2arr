obj2arr
====
convert object to array

## Installation
```
npm install obj2arr
```

## Usage
### setup
```js
var obj2arr = require('obj2arr');

var defs = {
  case1: {
    type: 'array',
    items: [
      {
        id: 'key',
        type: 'string'
      },
      {
        id: 'num',
        type: 'number'
      }
    ]
  }
};
obj2arr.define(defs);
```

### encode
```js
var data = {
  key: 'test1',
  num: 10
};
var encoded = obj2arr.encode('case1', data);
console.log(encoded);
// -- output --
// [ 'test1', 10 ]
```

### decode
```js
var decoded = obj2arr.decode('case1', encoded);
console.log(decoded);
// -- output --
// { key: 'test1', num: 10 }
```

## Tools
### toArrSchema
```js
var objSchema = {
  type: 'object',
  properties: {
    key: {
      id: 'key',
      type: 'string'
    },
    num: {
      id: 'num',
      type: 'number'
    }
  }
};
var arrSchema = obj2arr.tools.toArrSchema(objSchema);
console.log(arrSchema);
// -- output --
// { type: 'array',
//   items: [ { id: 'key', type: 'string' }, { id: 'num', type: 'number' } ] }
```

### toObjSchema
```js
var arrSchema = {
  type: 'array',
  items: [
    {
      id: 'key',
      type: 'string'
    },
    {
      id: 'num',
      type: 'number'
    }
  ]
};
var objSchema = obj2arr.tools.toObjSchema(arrSchema);
console.log(objSchema);
// -- output --
// { type: 'object',
//  properties:
//   { key: { id: 'key', type: 'string' },
//     num: { id: 'num', type: 'number' } } }
```

## Contribution
1. Fork it ( [https://github.com/iyu/obj2arr/fork](https://github.com/iyu/obj2arr/fork) )
2. Create a feature branch
3. Commit your changes
4. Rebase your local changes against the master branch
5. Run test suite with the `npm test` command and confirm that it passes
5. Create new Pull Request
