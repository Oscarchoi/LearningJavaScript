const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(resolve, 100, "foo")
);
const promises = [promise1, promise2];

Promise.all(promises).then(results =>
  results.forEach(result => console.log(result))
);

// expected output:
// 3
// foo

const promise4 = Promise.resolve(1).then(() => {
  return 2;
});
const promise5 = Promise.resolve("Hello");
const promise6 = Promise.resolve("Bye");

const pAll1 = Promise.all([promise4, promise5]);
const pAll2 = Promise.all([pAll1, promise6]).then(results =>
  results.forEach(result => console.log(result))
);

function inner() {
  let promise = Promise.resolve("Hello - First Chain").then(data => {
    console.log(data);
    return data;
  });
  return promise;
}

inner().then(data => {
  console.log(data + " - Second Chain");
});

function both(input) {
  if (input) return Promise.resolve("I'm promise.");
  return "I'm string";
}

let response = both(1).then(() => {
  console.log("heyhey");
});

async function waitForMe() {
  console.log("Wait for me!");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Here I am!");
      resolve(1);
    }, 2000);
  });
}

(async function() {
  await waitForMe();
  console.log("I'm Leaving.");
})();
