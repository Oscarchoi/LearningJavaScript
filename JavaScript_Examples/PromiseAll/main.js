new Promise(function(resolve, reject){
  setTimeout(function(){
    resolve(1);
  }, 2000);
})
.then(function(result){
  console.log(result);
  return result + 10;
})
.then(function(result){
  console.log(result);
  return result + 100;
})
.then(function(result){
  console.log(result);
});


new Promise(function(resolve, reject){
  setTimeout(function(){
    resolve(2);
  }, 2000);
})
.then(function(result){
  console.log(result);
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve(result+20);
    },2000);
  });
})
.then(function(result){
  console.log(result);
  return result + 200;
})
.then(function(result){
  console.log(result);
});
