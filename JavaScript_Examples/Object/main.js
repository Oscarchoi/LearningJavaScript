let json = `{"": "hello", "": "bye"}`;
let data = JSON.parse(json);

console.log(data);
console.log(data[""]);