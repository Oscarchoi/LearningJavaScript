var myService = {
  acall: ({ service, data, beforeSend }) => {
    return new Promise((resolve, reject) => {
      console.log("ServiceRequest Created!!!");
      console.log(`service: ${service}, data: ${data}, beforeSend ${beforeSend}`);

      resolve(JSON.parse(`{"name":"App1"}`));
      //reject("Oh My God.");
    })
  }
}

function serviceCall(request, ...arguments) {
  return myService.acall({
    service: request,
    data: arguments,
    beforeSend: function () { }
  }).catch(function (error) {
    console.error(error);
  });
}

async function main() {
  console.log("==== Test Starting ====");

  // Sync Call 
  let data1 = await serviceCall("tos.service.Package.getUser", "all");
  console.log(data1);

  // ASync Call
  let data2 = serviceCall("getList", "root");
  console.log(data2);

  console.log("==== Test Ended ====");
};

main();