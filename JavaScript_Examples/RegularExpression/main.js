let test1 = "2020/01-20 14:25:00";

let date_only = test1.match(/^[0-9.\-\/]*/g);  // -, / , . 을 모두 포함할 수 있음
console.log(date_only); // 2020/01-20