//    Top.Dom.selectById('pl_logger').setText("Hey");
Top.Controller.create('pl_mainViewLogic', {
  init: function(event, widget) {
    this.resetProgramInfo();
    this.queryAppList("root")
      .then(() =>{
	ProgramInfo.update("SystemPrograms");
	this.showContents();
      })
      .catch( error => {
	console.log("========== Querying Application Information Failed... ==========");
      });
  },

  printElapsed: function(start) {
    let elapsed = new Date().getTime() - start;
    console.log('elapsed time = ' + elapsed + 'ms');
    let log = Top.Dom.selectById('pl_logger').getText();
    log += ' / elapsed=' + elapsed;
    Top.Dom.selectById('pl_logger').setText(log);
  },

  resetProgramInfo: function() {
    console.log(ProgramInfo.SystemPrograms);
    ProgramInfo.reset('SystemPrograms');
    console.log('System programs informaiont is cleared.');
  },

  queryAppInfo: async function(appName) {
    console.log(`==== Querying Application Information on ${appName}... ====`);

    await Top.LocalService.acall('tos.service.PackageManager.getApplicationInfo', appName)
      .then(appMeta => {
	ProgramInfo.SystemPrograms.push({
	  name: appMeta["app"],
	  developer: appMeta["developer"],
	  version: appMeta["version_name"],
	  icon: appMeta["icon_path"],
	  installed_date: appMeta["install_date"]	  
	});
	console.log(`=== Application Information Received : ${appName}`);
      })
      .catch(error => {
	console.log("Service request failed. - 'tos.service.PackageManager.getApplicationInfo()' " + error)
      });
  },

  queryAppList: async function(userName) {	 
    console.log (`==== Querying Application List...  ====`);
    let appList = await Top.LocalService
      .acall('tos.service.PackageManager.getAppList', userName)
      .catch(error => {
	console.log("Service request failed. - 'tos.service.PackageManager.getAppList()' " + error)
      });

    let requests = [];
    for (const appName of appList) requests.push(await this.queryAppInfo(appName));

    return Promise.all(requests).then(() => {
      console.log("==== Service request all done. ====");
    });
  },

  addRandomApp: function(event, widget) {
    console.log('New program is added to List');
    let app_name = Math.random().toString(36).substring(7);
    let app_info = Math.random().toString(36).substring(8);
    let app = {
      name: app_name,
      version: app_info,
      installed_date: app_info,
      developer: app_info
    };
    ProgramInfo.addValue('SystemPrograms', app);
    this.showContents();
  },

  removeRandomApp: function(event, widget) {
    console.log('Removing the last program');
    ProgramInfo.removeValue(
      'SystemPrograms.' + (ProgramInfo.SystemPrograms.length - 1));
    this.showContents();
  },

  showContents: function() {
    let app_count = ProgramInfo.SystemPrograms.length;
    const emptyView = Top.Dom.selectById('pl_empty_view');
    const listView = Top.Dom.selectById('pl_list_view');

    if (app_count === 0) {
      emptyView.setProperties({visible: 'visible'});
      listView.setProperties({visible: 'none'});
      console.log('No Apps!');
      return;
    }

    emptyView.setProperties({visible: 'none'});
    listView.setProperties({visible: 'visible'});
    this.setAppCount();
    this.setEntryLayout();
  },

  setAppCount: function() {
    Top.Dom.selectById('pl_list_count').setText(ProgramInfo.SystemPrograms.length);
  },

  setEntryLayout: function() {
    for (let i = 0; i < ProgramInfo.SystemPrograms.length; i++) {
      // If the developer information is empty, do not show "developer" contents.
      let appDeveloper = Top.Dom.selectById('pl_app_developer_' + i);
      if ( appDeveloper.getText() === '' ||
	appDeveloper.getText() === '{developer}' /*default value*/ ) {
	Top.Dom.selectById('pl_app_developer_' + i).setProperties({
	  visible: 'hidden'
	});
	Top.Dom.selectById('pl_app_version_seperator_' + i).setProperties({
	  visible: 'hidden'
	});
      }

      // Color the odd order entry.
      if (i % 2 == 0) {
	let entryLayout = Top.Dom.selectById('pl_programEntry_' + i);
	entryLayout.setProperties({
	  'background-color':
	  Top.ValuesManager.get('colors', 'AppCenterColors').TS_Light_Gray
	});
      }
    }
  },

  refresh: function(event, widget) {
    console.log('Refreshed!!');
  }
});
