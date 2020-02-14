async function thisThrows() {
  throw new Error("Thrown from thisThrows()");
}

// As a Promise
thisThrows()
  .then(data => console.log("Under then() - " + data))
  .catch(error => console.log("Under catch() - " + error));

// Promise instance
let p = new Promise((resolve, reject) => {
  throw new Error("Thrown from Promise");
});
p.then(data => console.log("Under then() - " + data)).catch(error =>
  console.log("Under catch() - " + error)
);

//await
let f = async function() {
  try {
    await thisThrows();
  } catch (error) {
    console.log("Under await catch() - " + error);
  }
};
f();
