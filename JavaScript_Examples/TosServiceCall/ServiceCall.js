LocalService = function () {
    //LocalService.prototype = Object.create(Top.prototype);
    LocalService.prototype.constructor = LocalService;
    function LocalService(obj) {
        Object.assign(this, obj)
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
            return this._promise.then(onFulfilled, onRejected);
        }

        catch(onRejected) {
            return this._promise.catch(onRejected);
        }

        finally(onFinally) {
            return this._promise.finally(onFinally);
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
                    this._resolve(data);
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

    LocalService.acall = function (settings) {
        this._checkProperty(settings, 'service');

        var request = new ServiceRequest(settings);
        var serial = Service.invoke(settings.service, settings.data);
        request.finally(function () {
            delete LocalService.requests[serial];
        });
        this.requests[serial] = request;
        return request;
    };

    return LocalService;
}();