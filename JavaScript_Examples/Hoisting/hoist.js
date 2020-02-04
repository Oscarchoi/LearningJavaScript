var TOP = { "Bye": true };

importScripts("./main.js");
function wait() {
    setTimeout(2000, () => { console.log("Timeout!"); });
}

wait();

function hoistAgain() {
    console.log(`In hoistAgain()`);
    console.log(TOP);
}



