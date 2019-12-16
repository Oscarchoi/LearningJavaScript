myInstance = {
  myValue: "Hello",
  self: this,

  resolveAfter2Seconds: function (name) {
    // 2. 
    console.log("starting slow promise.");
    return new Promise(resolve => {
      console.log("slow promise inside"); // 3.
      setTimeout(function (name) {
        resolve(20);
        console.log("slow promise is done.");
        console.log(name);
      }, 0, name); // 3.5 등록
    });
  },

  resolveAfter1Second: function () {
    console.log("starting fast promise.");
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(10);
        console.log("fast promise is done.");
      }, 1000);
    });
  },

  sequentailStart: async function () {
    console.log("==SEQUENTIAL START==");

    // 1. 
    const slow = this.resolveAfter2Seconds(this.myValue);
    console.log(slow); // 4.

    const fast = await this.resolveAfter1Second().then(function (data) {
      console.log(`data = ${data + 30}`);
      return "HaHa";
    }); // 잠깐 기다림.
    console.log(fast);
  }
}

myInstance.sequentailStart();
