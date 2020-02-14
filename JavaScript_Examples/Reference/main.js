function func() {
  original[0].age += 1;
  console.log(array);
}

let original = [
  { name: "Choi", age: 28 },
  { name: "Kim", age: 25 },
  { name: "Lee", age: 26 }
];

let array = [];
original.forEach(element => {
  if (element.age > 25) array.push(element);
});

let found = original.findIndex(element => element.name === "Lee");
original[found] = { name: "Park", age: 30 };
console.log(original);

let obj = { species: "cat", age: 5 };
original.push(obj);
console.log(original[3].age);
obj.age += 2;
console.log(original);
