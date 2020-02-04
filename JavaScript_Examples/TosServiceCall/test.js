class Top {
    constructor(name) {
        this.myName = name;
    }
}

// console.log(Top);

Top.LocalService = class LocalService extends Top {
    constructor() {
        super("nono");
        console.log("Hello");
    }
    static showName() {
        console.log(this.name);
    }
}



// function () {

//     LocalService.prototype = Object.create(Top.prototype);
//     LocalService.prototype.constructor = LocalService;

//     function LocalService(obj) {
//         console.log("Hello");
//     };

//     return LocalService;
// }();


console.log(Top.LocalService);