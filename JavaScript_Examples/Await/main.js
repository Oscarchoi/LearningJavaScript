function await1(name){  
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      console.log(`My name is ${name}.`);
      resolve(20);
    },2000);
  });
}

function await2(age){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      console.log(`I'm ${age} years old.`);
      resolve();
    },2000);
  })
}

async function introduce(name){
  const age = await await1(name);
  await await2(age); 
  console.log(`End.`);
};


introduce("Choi");