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

const cdl_id_class = ID();

console.time("validating");
for(let i = 0; i < 10000; i++)
{
	cdl_id_class.valid(ids[i]);
}
console.timeEnd("validating");

console.time("invalidating");
for(let i = 0; i < 10000; i++)
{
	cdl_id_class.valid(i);
}
for(let i = 0; i < 10000; i++)
{
	cdl_id_class.valid("abc");
}
console.timeEnd("invalidating");