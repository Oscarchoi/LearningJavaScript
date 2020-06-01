var obj = {
  promise: null,
  atInitialized: null,
  atFailed: null,
  getInstance: function () {
    return this.promise;
  },
  init: function () {
    this.promise = new Promise((resolve, reject) => {
      this.atInitialized = resolve;
      this.atFailed = reject;
    });
    console.log("in init");
    setTimeout(() => {
      this.atInitialized();
      console.log("timeout");
    }, 3000);
    //this.__init();
  },
  __init: async function () {
    // await function call
  }
}

obj.init();