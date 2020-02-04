var abort;

setRequestTimeout = function (request) {
  console.log(request);
  return new Promise(function (resolve, reject) {
    const timer = setTimeout(gAbort, 2 * 1000, new Error("Error - Request timed out."));
    request.then(function (...args) {
      clearTimeout(timer);
      resolve(...args);
    }).catch(function (...args) {
      clearTimeout(timer);
      reject(...args);
    });
  });
}

console.log("==== Start ====");

let token = {};
let promise = new Promise(function (resolve, reject) {
  Object(token).cancel = () => { reject(); };
  abort = reject;
  console.log("Promise Instanciated.");
  setTimeout(() => {
    console.log("Resolved!");
    resolve();
  }, 3000);
}).then(data => { console.log("Resolved Promise.then() called."); });

setRequestTimeout(promise);

console.log("==== End ====");



