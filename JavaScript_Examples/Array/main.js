var target = [1, "Hello", ["a", "b", "c"], { name: "choi" }];
var target2 = [{ name: "choi", age: 27 }];

let regex = /[0-9]+/;
let result = regex.exec("abc123");
console.log(result);




// Convert to anonymouns arguments 
let convert = '{' + target.map(entry => '"":' + JSON.stringify(entry)).join() + '}';
console.log(convert);

let convert2 = '{' + target2.map(entry => '"":' + JSON.stringify(entry)).join(',') + '}';
console.log(convert2);


let func = function (value, ...values) {
    console.log("Logging expandable parameters");
    console.log(values);
}
func(1, 2, 3, 4);
func(1, "a");


let func2 = function (value) {
    var value = { "value": value, "Greet": "Hello" };
    console.log(value);
}

func2("ABC");


var myArray = ["A", "B", "C"];
var number = 1;
var myString = "D";
var object = { "": "a", "": "b" };

//let json = JSON.stringify({ "": myArray.reduce((str, entry) => entry, {}) });
//let json = JSON.stringify(myArray);






//let data = myArray.reduce((obj, entry) => obj.push(entry), {});

let data2 = Object.values(myArray);

//console.log(data2);