console.log("==== Start ====");
let promise = new Promise(function (resolve, reject) {
  console.log("In Promise");
  resolve();
}).then(data => { console.log("In Promise.then()"); });
console.log("==== End ====");