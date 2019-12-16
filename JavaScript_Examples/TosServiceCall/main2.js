function serviceCall(request, ...arguments) {
  return LocalService.acall({
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