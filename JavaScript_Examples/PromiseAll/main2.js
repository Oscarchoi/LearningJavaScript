// Test for Promise.all()

var gResolve;

var promise1 = new Promise(function(resolve,reject){
  //gResolve = resolve;
  setTimeout(resolve,1000, "Timeout 1"); //wait 2000 ms
});

promise1.then( function(data){
  console.log("data input "+data);
  return 6;
}).then( function(data){
  console.log("data input2 "+data);
});

console.log("promise1 initialized.");


//var promise2 = 42;
var promise2 = new Promise(function(onResolve, onReject){
//  onResolve("promise2");
  onReject("I'm rejected.");
  //setTimeout(onResolve, 2000, "Timeout"); //wait 2000 ms
});

promise2.then((data)=>{
  console.log("Processed by "+data);
});

var promise3 = new Promise(function(onResolve, onReject){
  onResolve("promise3");
  onReject("I'm rejected.");
  //setTimeout(onResolve, 2000, "Timeout"); //wait 2000 ms
});
promise3.then((data)=>{
  console.log("Processed by "+data);
});

let pResult = Promise.all([promise1, promise3, promise2]).then(function(values){
  console.log("All Promise Done!");
  console.log(values);
}).catch(function(reason){
  console.log("I'm failed." + reason); 
}).then(function(){
  console.log("If rejected promise instances are catched, it becomes to fulfiled.");
});

console.log(pResult);


console.log("stack end.");
