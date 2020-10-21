//기본적으로 자바스크립트에서 this는 실행컨텍스트가 생성될 때 함께 결정된다.
//실행 컨텍스트는 함수를 호출할 때 생성되므로, 바꿔 말하면 this는 함수를 호출할 때 결정된다.
//함수를 어떤 방식으로 호출하느냐에 따라 값이 달라지는것


//전역 공간에서 this는 전역 객체를 가리킴. 전역 컨텍스트를 생성하는 주체가 바로 전역 객체이기 때문

console.log(this === window) //true (node.js환경에서는 global)

//전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당

var a = 1;
console.log(window.a) //1
console.log(this.a) //1

//자바스크립트의 모든 변수는 실은 특정 객체의 프로퍼티로서 동작
//특정 객체는 실행컨텍스트의 LexicalEnvironment이고 실행컨텍스트를 변수를 수집해서 L.E의 프로퍼티로 저장
//이후 어떤 변수를 호출하면 L.E를 조회해서 일치하는 프로퍼티가 있을 경우 그 값을 반환하고 전역 컨텍스트의 경우 L.E는 전역 객체를 그대로 참조

//전역에서 a만 호출해도 1이 나오는 이유는 변수 a에 접근하고자 하면 스코프체인에서 a를 검색하다 가장 마지막에 도달하는 전역스코프의 L.E, 즉 전역객체에서
//해당 프로퍼티 a를 발견해서 그 값을 반환하기 때문



//메서드로서 호출할 때 그 메서드 내부에서의 this
//함수와 메서드를 구분하는 유일한 차이는 독립성. 함수는 그 자체로 독립적인 기능을 수행하지만, 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행

var func = function (x) {
    console.log(this, x);
};
func(1); //window 1

var obj = {
    method: func
};
obj.method(2); //method:f 2

//함수를 변수에 담아 호출한 경우와 obj객체의 프로퍼티에 할당해서 호출한 경우에 this가 달라짐
//메서드 내부에서의 this는 .표기법인경우 .앞의 객체가 this -> (obj.inner.methodB) 에서 this는 obj.inner

//어떤 함수를 함수로써 호출할 경우에는 this가 지정되지 않는다. 그리고 실행컨텍스트를 활성화 할 당시에 this가 지정되지 않은 경우 this는 전역객체를 바라본다.



//메서드의 내부함수에서의 this
var obj1 = {
    outer: function() {
        console.log(this);
        var innerFunc = function() {
            console.log(this)
        }
        innerFunc(); //전역

        var obj2 = {
            innerMethod: innerFunc 
        }
        obj2.innerMethod(); //obj2
    }
}
obj1.outer();//outer

//우회하는법은?
var obj1 = {
    outer: function() {
        console.log(this);
        var innerFunc = function() {
            console.log(this)
        }
        innerFunc(); //전역

        var self = this; //self에 outer객체의 this를 할당
        var innerFunc2 = function() {
            console.log(self);
        }
        innerFunc2(); //outer
    }
}
obj1.outer();

//ES6에서 우회하는 법은 화살표 함수 (ES5에서는 사용 불가)
