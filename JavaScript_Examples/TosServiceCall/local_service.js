Top.LocalService = function () {
  LocalService.prototype = Object.create(Top.prototype);
  LocalService.prototype.constructor = LocalService;

  function LocalService(obj) {
    Object.assign(this, obj);
  };

  LocalService.requests = {};

  class ServiceRequest {
    constructor(settings) {
      this.service = settings.service;
      this.status = 0;
      this.statusText = '';
      this.handler = settings.handler;  // for signals
      this._promise = new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
        if (typeof settings.beforeSend === 'function' &&
          settings.beforeSend(this, settings) === false) {
          this.abort();
        }
      });
    }

    done(onHttpFulfilled) {
      this._promise.then((data) => {
        onHttpFulfilled(data, this._getCategoryStatus(), this);
      });
      return this;
    }

    fail(onHttpRejected) {
      this._promise.catch((data) => {
        onHttpRejected(this, this._getCategoryStatus(), data);
      });
      return this;
    }

    always(onHttpFinally) {
      this._promise.finally((data) => {
        const textStatus = this._getCategoryStatus();
        const success = textStatus === 'success';
        let dataorthis = success ? data : this;
        let thisorerror = success ? this : data;
        onHttpFinally(dataorthis, textStatus, thisorerror);
      });
      return this;
    }

    then(onFulfilled, onRejected) {
      this._promise.then(onFulfilled, onRejected);
      return this;
    }

    catch(onRejected) {
      this._promise.catch(onRejected);
      return this;
    }

    finally(onFinally) {
      this._promise.finally(onFinally);
      return this;
    }

    abort(error) {
      if (!error) {
        error = Error('aborted');
      }
      this._reject(error);
    }

    _getCategoryStatus() {
      const code = this.status;
      if (code === 0) {
        return 'notmodified';
      } else if (code === 499) {
        return 'abort';
      } else if (code === 444) {
        return 'nocontent';
      } else if (code === 408 || code === 504) {
        return 'timeout';
      } else if (code < 100) {
        return 'parsererror';  // FIXME
      } else if (code < 200) {
        return 'continue';
      } else if (code < 300) {
        return 'success';  // ex. OK 200
      } else if (code < 400) {
        return 'redirect'  // FIXME
      } else if (code < 500) {
        return 'error'  // ex. Bad Request 400
      } else if (code < 600) {
        return 'error'  // ex. Internal Server Error 500
      } else {
        return 'parsererror'  // invalid code
      }
    }

    _execute(data, statusCode, cbtype) {
      this.status = statusCode;
      switch (cbtype) {
        case 'signal':
          this.handler(data);
          break;
        case 'success':
          this._resolve(JSON.parse(data)["return"]);
          break;
        case 'error':
          this._reject(data);
          break;
        case 'complete':  // do nothing (resolve or reject already handled)
        default:
          break;
      }
    }
  }

  LocalService._checkProperty = function (settings, prop) {
    if (!settings.hasOwnProperty(prop)) {
      throw Error(prop + ' not found');
    }
  };

  LocalService.signal = function (settings) {
    this._checkProperty(settings, 'service');
    this._checkProperty(settings, 'handler');

    var request = new ServiceRequest(settings);
    this.requests[settings.service] = request;
    Service.setSignalHandler(settings.service);
    return request;
  };

  LocalService.unsetSignal = function (settings) {
    this._checkProperty(settings, 'service');

    var request = new ServiceRequest(settings);
    this.requests[settings.service] = request;
    Service.unsetSignalHandler(settings.service);
    return request;
  };

  LocalService.acall = async function (config, ...params) {
    if (typeof config !== 'Object') {
      config = {
        service: config,
        data: '{' + params.map(entry => '"":' + JSON.stringify(entry)).join(',') + '}'
      };
    }
    this._checkProperty(config, 'service');

    let request = new ServiceRequest(config);
    let token = Service.invoke(settings.service, settings.data);
    LocalService.requests[token] = request;
    request.finally(function () {
      delete LocalService.requests[token];
    });
    return request;
  };

  return LocalService;
}();




Top.Controller.create('TestAppLogic', {
  call: async function (event, widget) {
    var name = Top.Dom.selectById('ServiceName').getText();
    var input = Top.Dom.selectById('ServiceInput').getText();

    Repo1.setValue('Inst1', { Result: '...' })
    try {
      let appList = await Top.LocalService.acall("tos.service.PackageManager.getAppList", "root");
      console.log(appList);

      Top.LocalService
        .acall({ service: name, data: input, beforeSend: function () { } })
        .then(function (data) {
          console.log("request callback then() called.");
          console.log(data);
        }).catch(function (error) {
          console.log("request callback catch() called." + error);
        }).finally(function () {
          console.log("request callback finally() called.");
        });
    } catch (err) {
      console.log(`Error Caught : ${err.message}`);
    }

  },
  signal: function (event, widget) {
    var name = Top.Dom.selectById('ServiceName').getText();
    try {
      Top.LocalService
        .signal({
          service: name,
          beforeSend: function () {
            Repo1.setValue('Inst2', { Result: 'processing ' + name });
          },
          handler: () => {
            Repo1.setValue(
              'Inst2', { Result: 'signal handled (data: ' + data + ')' });
          }
        })
        .done(function (data, textStatus, req) {
          Repo1.setValue('Inst2', {
            Result: 'signal ' + textStatus + ' (' + req.status +
              '): ' + req.service + ' (data: ' + data + ')'
          });
          req.abort();
        });
    } catch (e) {
      Repo1.setValue('Inst2', { Result: 'exception: ' + e.message })
    }
    //  }
  },
  unsetSignal: function (event, widget) {
    //  if(event.key == 'Enter'){
    var name = Top.Dom.selectById('ServiceName').getText();
    var input = Top.Dom.selectById('ServiceInput').getText();
    Repo1.setValue('Inst2', { Result: '...' })
    // var input = widget.getText();
    try {
      Top.LocalService
        .unsetSignal({
          service: name,
          beforeSend: function () {
            Repo1.setValue('Inst2', { Result: 'unsetSignal ' + name });
          }
        })
        .done(function (data, textStatus, req) {
          Repo1.setValue('Inst2', {
            Result: 'signal ' + textStatus + ' (' + req.status +
              '): ' + req.service + ' (data: ' + data + ')'
          });
          req.abort();
        });
    } catch (e) {
      Repo1.setValue('Inst2', { Result: 'exception: ' + e.message })
    }
    //  }
  },
  signal2: function (event, widget) {
    //  if(event.key == 'Enter'){
    var name = Top.Dom.selectById('SystemServiceName').getText();
    var input = Top.Dom.selectById('SystemServiceInput').getText();
    Repo1.setValue('Inst4', { Result: '...' })
    // var input = widget.getText();
    try {
      Top.LocalService
        .signal({
          service: name,
          beforeSend: () => {
            Repo1.setValue('Inst4', { Result: 'processing ' + name });
          },
          handler: (data) => {
            Repo1.setValue(
              'Inst4', { Result: name + ' handler (data: ' + data + ')' });
          }
        })
        .then((data) => {
          Repo1.setValue('Inst4', { Result: 'signal (data: ' + data + ')' });
        });
    } catch (e) {
      Repo1.setValue('Inst4', { Result: 'exception: ' + e.message })
    }
    //  }
  },
  unsetSignal2: function (event, widget) {
    //  if(event.key == 'Enter'){
    var name = Top.Dom.selectById('SystemServiceName').getText();
    var input = Top.Dom.selectById('SystemServiceInput').getText();
    Repo1.setValue('Inst4', { Result: '...' })
    // var input = widget.getText();
    try {
      Top.LocalService
        .unsetSignal({
          service: name,
          beforeSend: () => {
            Repo1.setValue('Inst4', { Result: 'processing unset ' + name });
          }
        })
        .then((data) => {
          Repo1.setValue(
            'Inst4', { Result: 'unset signal (data: ' + data + ')' });
          req.abort();
        });
    } catch (e) {
      Repo1.setValue('Inst4', { Result: 'exception: ' + e.message })
    }
    //  }
  },
  MakeSystemServiceCall: function (event, widget) {
    var selectedServiceCall =
      Top.Dom.selectById('SystemServiceCallSelectBox').getSelectedText();
    Top.Dom.selectById('SystemServiceName').setText(selectedServiceCall);
  },
  ResultClear: function (event, widget) {
    Repo1.setValue('Inst1', { Result: 'Result' })
    Repo1.setValue('Inst2', { Result: 'Result' })
  },
  MakePoServiceCall: function (event, widget) {
    var selectedServiceCall =
      Top.Dom.selectById('PO_ServiceCallSelectBox').getSelectedText();
    Top.Dom.selectById('ServiceName').setText(selectedServiceCall);
  },
  ResultClear2: function (event, widget) {
    Repo1.setValue('Inst3', { Result: 'Result' })
    Repo1.setValue('Inst4', { Result: 'Result' })
  }
});
