/* Node.js - Event Loop */
const events = require("events");
const eventEmitter = new events.EventEmitter();

const eventHandler = () => {
  console.log("Event[click] received");
  eventEmitter.emit("doubleClick");
};

// Bind event and event handler
eventEmitter.on("click", eventHandler);
eventEmitter.on("doubleClick", () => {
  console.log("Event[doubleClick] received");
});

// Fire an event
eventEmitter.emit("click");

console.log("Scope end here");
