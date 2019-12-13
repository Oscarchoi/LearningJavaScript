
var gResolve;
var gReject;

console.log(gResolve);

function done(result){
  console.log("Done - "+result);
  gResolve();
}

let promise = new Promise(function(onResolve, onReject){
 
    gResolve = onResolve;
    gReject = onReject;
  
//  setTimeout(function(){
//  }, 0); //wait 2000 ms
  console.log("Clock start");

})
.then(done)
.catch(function(result){
  console.log("Catch - "+result);
})

  
promise.finally(function(){
  console.log("finally!");
})

var promise2 = Promise.resolve();
promise2.then(() => console.log("abc"));


gResolve("AAAAAAA");

console.log(gResolve);

console.log("aa");

