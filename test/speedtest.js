const ID = require("../index.js");

console.time("encoding");
let ids = [];
for(let i = 0; i < 10000; i++)
{
	ids.push(ID("item", "test", "test", Math.random().toString().replace(".", "")));
}
console.timeEnd("encoding");

console.time("decoding");
for(let i = 0; i < 10000; i++)
{
	ID(ids[i]);
}
console.timeEnd("decoding");