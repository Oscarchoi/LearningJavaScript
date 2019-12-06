function Parent(){} // 부모 생성자
function Child(){} // 자식 생성자

Child.prototype = new Parent(); // 상속. 자식 생성자의 프로토타입에 부모 생성자의 인스턴스를 할당
var someChild = new Child(); 

console.log(someChild instanceof Parent); // true
console.log(someChild instanceof Child); // true

console.log(someChild.constructor); // Output : Parent
// someChild 인스턴스의 constructor가 출력됩니다.
// constructor는 prototype 객체에 들어있는데, Parent의 인스턴스가 할당되어 있어 Parent가 출력됩니다.


console.log(Object.getPrototypeOf(someChild) === Child.prototype ); // true;
console.log(someChild.__proto__ == Child.prototype); // true;
// 생성자 함수나 객체는prototype 이라는 객체를 가집니다.
// 생성된 인스턴스는 prototype 객체를 가지고 있는 것이 아니라 prototype 객체를 참조할 수 있는 __proto__ 라는 
// 비공개 속성을 갖습니다.



// 0. 부모 객체 설정
function Person(){
  this._name = 'adam';
  this._age = 0;
  this.name = function(){
    console.log(`Hi, I'm ${this._name}.`);
  };
  console.log("Congratulation! new birth. Constructor is ",arguments.calle);
}

Person.prototype.age = function(){
  console.log(`I'm ${this._age} years old.`);
}

// 1. 초창기 상속 구현
function Tom(){
  var obj = new Person();
  obj._name = 'tom';
  obj._age = 45;
  return obj;
}

var tom = new Tom();
tom.name();
tom.age();
console.log(tom instanceof Tom);
console.log(tom	instanceof Person);
console.log(tom.constructor); // Person
console.log(tom.__proto__ === Person.prototype) // true

// 2. 특정 Object를 이용해서 prototype을 설정하여 상속
function David(){
  this._name = 'david';
  this._age = 20;
}

David.prototype = new Person();
var david = new David();
david.name(); // Hi, I'm David
david.age(); // I'm 20 years old
console.log(david instanceof David); // true
console.log(david instanceof Person); // true
console.log(david.constructor); // Person
console.log(david.__proto__ === Person.prototype); // false new Person으로 생성된 것이 아닌 Person()으로 생성된 instance 가 할당되었습니다.
// 한계:  david가 David의 instance로 인식되나, constructor는 Person으로 나옴



// 3. Object.create(Person.prototype); //
var jane = Object.create(Person.prototype);

jane.name(); // TypeError : jane.name is not a function. 생성자 안에서 정의한 method이기 때문에, prototype만 상속받는 것으로는 상속되지 않습니다.
jane.age(); // I'm undefined years old. 프로토타입만 상속되어 메소드는 호출되나 생성자에 정의된 this._age를 가져오지 못합니다.
console.log(jane instanceof Person); // true
console.log(jane.constructor); // Person
console.log(jane.__proto__ === Person.prototype); // true

Person.call(jane); // Person의 context를 jane 인스턴스로 변경해줍니다.
jane.name(); // Hi, I'm adam. 생성자에 정의한 method도 사용할 수 있게 되었으나 모양새가 좋지 않습니다.


// 4. Object.create(Person)
var peter = Object.create(Person);

//peter.name(); // TypeError : peter.name is not a function.
//peter.age(); // TypeError : peter.age is not a function.
console.log(peter instanceof Person); // false
console.log(peter.constructor); // Function 
console.log(peter.__proto__ === Person.prototype); // false

// 5. Object.create(new Person());
var benjamin = Object.create(new Person());

benjamin.name(); //Hi, I'm adam. // benjamin에 속성을 설정하지 않았으므로, Constructor의 값이 출력됩니다.
benjamin.age(); // I'm 0 years old. // ..
benjamin._age(); 15;
benjamin.age(); // 15

console.log(benjamin instanceof Person); // true
console.log(benjamin.constructor); // Person
console.log(benjamin.__proto__ === Person.prototype); //false
console.log(benjamin.__proto__.__proto__ === Person.prototype); //true. 중간에 new Person()로 생성된 인스턴스를 한 번 더 가집니다.
// 3번과 5번을 비교하면,
// 3번의 Person.prototype을 넣어주면 prototype만 상속하며, 
// 5번의 new Person()은 생성자를 호출해서 인스턴스를 생성하는 비용이 더 들지만, 생성자에서 정의한 것들을 가져다 쓸 수 있다.


// 6. Object 객체를 상속

// 위의 Person 함수 객체가 아닌 객체 리터널로 정의된 오브젝트 객체를 상속하도록 합니다.
// 따라서 person을 객체 리터럴로 재정의 합니다.
// 오브젝트 객체의 경우, 인스턴스 처럼 prototype이 없고, __proto__ 참조만 갖습니다.
// 따라서 person.prototype.age 가 아닌 person.age로 메서드를 추가합니다.

var person = {
  _name: 'adam',
  _age: 0,
  name: function(){
    console.log(`Hi, I'm ${this._name}.`);
  }
};
person.age = function(){
  console.log(`I'm ${this._age} years old.`);
};


var thomas = Object.create(person);

thomas.name(); //adam
thomas.age(); //0

thomas._age = 15;
thomas.age(); //15

person._age = 80;
thomas.age(); //15 // person._age를 변경하였으나 thomas의 프로토타입에 있는 것이고, thomas에서는 여전히 15입니다.

console.log(thomas.constructor); //Object
console.log(thomas.__proto__ === person.prototype); //false //person은 오브젝트 객체로, prototype이 없습니다.
console.log(thomas.__proto__ === person); //true. // person이 오브젝트 이므로, person의 인스턴스가 아닌 person을 상속받았습니다.

console.log(Object.getPrototypeOf(thomas) === person); //true;
console.log(person.isPrototypeOf(thomas)); //true;


