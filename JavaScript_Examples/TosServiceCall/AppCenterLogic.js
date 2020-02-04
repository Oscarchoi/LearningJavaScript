// queryAppInfo: function(appName) {
//     const service = 'tos.service.PackageManager.getApplicationInfo';
//     console.log(`Querying Application Information on ${appName}... `);
//     return Top.LocalService
//         .acall(service, appName)
//         .then(appMeta => {
//             ProgramInfo.SystemPrograms.push({
//                 name: appMeta["app"],
//                 developer: appMeta["developer"],
//                 version: appMeta["version_name"],
//                 icon: appMeta["icon_path"],
//                 installed_date: appMet["install_date"]
//             });
//         })
//         .catch(error => { console.log("Service request failed. - 'tos.service.PackageManager.getApplicationInfo()' " + error) });
// }

// queryAppList: function(userName) {
//     let self = this;
//     const service = "tos.service.PackageManager.getAppList";
//     let appList = await Top.LocalService
//         .acall(service, userName)        
//         .catch(error => { console.log("Service request failed. - 'tos.service.PackageManager.getAppList()' " + error) })
//         .finally(() => { console.log("Service request done. - 'tos.service.PackageManager.getAppList()'") });


//     let v = await Top.LocalService.acall("tos.service", arg1,arg2);

//     Top.LocalService.acall("tos.service", arg1,arg2)
//     .then()

//     let requests;
//     for (const appName of appList) requests.push(queryAppInfo(appName));
//     Promise.all(requests).then(() => { ProgramInfo.update(); });
// };