console.log("==== Start ====");
let promise = new Promise(function (resolve, reject) {

  let timeout = setTimeout(() => {
    console.log("Timeout!");
    reject();
  }, 2000, new Error("promise timed out"));

  setTimeout(() => {
    console.log("Resolve!");
    clearTimeout(timeout);
    resolve();
  }, 1000);

  console.log("Promise");

}).then(data => { console.log("In Promise.then()"); });
console.log("==== End ====");
