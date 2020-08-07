# Compass Digital ID

Creates ids for use in the Compass Digital platform. Decodes ids to reveal the meta-data within.

## Requirements
- node.js 6+

## Installation
```sh
npm install @compassdigital/id
```

## Usage

```js
const ID = require("@compassdigital/id");

// or use ES6 module import syntax
import ID from "@compassdigital/id";

var new_id = ID({
    service: "menu",
    provider: "Acme XYX",
    type: "item",
    id: "abc1234"
});
// lBprpeED47ILDZBwAYB4iwy0D8Ne55INALa576e9iKX4

var decoded = ID(new_id);
/*
{ 
    service: 'menu',
    provider: 'Acme XYX',
    type: 'item',
    id: 'abc1234' 
}
*/

// Convenience method
new_id = ID("menu", "Acme XYX", "item", "abc1234");
// lBprpeED47ILDZBwAYB4iwy0D8Ne55INALa576e9iKX4

```

## Testing

```sh
npm install mocha -g # if you don't have it installed already
npm test
```
