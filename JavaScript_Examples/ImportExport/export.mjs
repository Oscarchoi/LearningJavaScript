(function() {
  console.log("Function executed in imported javascript");
})();

let localNumber = 12;
let localString = "I'm Local";
function createOne() {
  console.log("Instanting IIFE returned object.....");
  return localString + localNumber;
}
let objectOne = createOne();

export { objectOne };
