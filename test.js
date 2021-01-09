var HashMap = require('hashmap');
var data1 = {name:"123",age:12};
var data2 = {name:"321",age:21};

var map = new HashMap();

map.set(data1,"user1");
map.set(data2,"user2");

var data1 = {name:"1223",age:122};
console.warn(data1.name);