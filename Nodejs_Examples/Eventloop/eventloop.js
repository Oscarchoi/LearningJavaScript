function func(count, message) {
  console.log("[Info] Step processed", count, message);
}

console.log("[Info] Start here!");

// invoked at firt event loop - timer phase
setTimeout(() => {
  func(10, "- timer callback");
  setTimeout(() => {
    func(100, "- second timer callback"); // this will be invoked at seconde event loop timer phase;
  }, 0);
  process.nextTick(func, 20, "- nextTick callback");
}, 0);

setImmediate(() => {
  func(30, "- check callback");
  process.nextTick(func, 40, "- nextTick callback\n");
})

// nextTick callback queue & micro task queue
process.nextTick(func, 0, "- nextTick callback");
Promise.resolve(2).then(res => {
  func(res, "- promise callback\n");
});
process.nextTick(func, 1, "- nextTick callback");

// end of stack
console.log("[Info] Stack ended here.\n");

