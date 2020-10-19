//실행 컨텍스트는 실행할 코드에 제공할 환경 정보들을 모아놓은 객체.
//동일한 환경에 있는 코드들을 실행할 때 필요한 환경 정보들을 모아 컨텍스트를 구성하고, 이를 콜 스택에 쌓아 올렸다가, 가장 위에 쌓여있는 컨텍스트와 관련있는
//코드들을 실행하는 식으로 전체 코드의 환경과 순서를 보장

var a = 1;
function outer() {
    function inner() {
        console.log(a); //undifined
        var a = 3;
    }
    inner();
    console.log(a); //1
}
outer();
console.log(a); //1

//코드를 실행하는 순간 전역 컨텍스트가 콜 스택에 담김
//outer 함수를 호출하면 자바스크립트 엔진은 outer에 대한 환경 정보를 수집해서 outer 실행 컨텍스트를 생성한 후 콜 스택에 담김
//콜 스택의 맨 위에 outer 실행 컨텍스트가 놓인 상태가 됐으므로 전역 컨텍스트와 관련된 코드의 실행을 일시중단하고 대신 outer 실행 컨텍스트와 관련된 코드, 즉 outer 함수 내부의 
//코드들을 순차로 실행
//inner함수가 호출되고 그 실행컨텍스트가 콜 스택의 가장 위에 담기면 outer컨텍스트와 관련된 코드의 실행을 중단하고 inner 함수 내부의 코드를 순서대로 진행
//inner 함수 내부에서 a 변수에 값 3을 할당하고 나면 inner 함수의 실행이 종료되면서 inner 실행 컨텍스트가 콜 스택에서 제거
//아래에 있던 outer 컨텍스트가 이어서 실행되고 a의 값을 출력하고 나면 outer 함수의 실행이 종료 콜스택에서 제거
//콜스택에는 전역컨텍스트만 남아있는 상태. 다시 이어서 실행/  a변수값을 출력하고 나면 전역공간에 더는 실행할 코드가 남아있지 않게됨. 전역 컨텍스트도 제거

//실행 컨텍스트객체에 담기는 정보는 다음과 같다.
//VariableEnvironment: 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보. 선언 시점의 LexicalEnvironment의 스냅샷으로 변경사항은 반영되지 않음.
//LexicalEnvironment: 처음에는 VariableEnvironment와 같지만 변경 사항이 실시간으로 반영
//ThisBinding: this 식별자가 바라봐야 할 대상 객체.

//VariableEnvironment
//VariableEnvironment에 담기는 내용은 LexicalEnvironment와 같지만 최초 실행 시에 스냅샷을 유지한다는 점이 다르다.
//실행 컨텍스트를 생성할 때 VariableEnvironment에 정보를 먼저 담은 다음, 이를 그대로 복사해서 LexicalEnvironment를 만들고, 이후에는 LexicalEnvironment를 주로 활용
//VariableEnvironment와 LexicalEnvironment의 내부는 environmentRecord와 outer-EnvironmentReference로 구성

//LexicalEnvironment
//현재 컨텍스트내부에는 a,b,c와 같은 식별자들이 있고 그 외부정보는 D를 참조하도록 구성돼있다 같은 컨텍스트를 구성하는 환경정보들을 사전에서 접하는 느낌으로 모아놓은 것

//environmentRecord와 호이스팅
//environmentRecord에는 현태 컨텍스트와 관련된 코드의 식별자 정보들이 저장됨
//컨텍스트를 구성하는 함수에 지정된 매개변수 식별자, 선언한 함수가 있을 경우 그 함수 자체, var로 선언된 변수의 식별자 등이 식별자에 해당
//컨텍스트 내부 전체를 처음부터 끝까지쭉 훑어나가며 순서대로 수집
//변수 정보 수집을 모두 마쳤더라도 아직 실행 컨텍스트가 관여할 코드들은 실행되기 전의 상태.
//코드가 실행되기 전임에도 불구하고 자바스크립트 엔진은 이미 해당 환경에 속한 코드의 변수명들을 모두 알고 있게 되는 셈이다.
//그러므로 자바스크립트 엔진은 식별자들을 최상단으로 끌어올려놓은 다음 실제 코드를 실행한다 라고 생각하더라고 코드를 해석하는 데는 문제될 것이 없을것이다.
//여기서 호이스팅이라는 개념이 등장

//호이스팅 규칙
function a() {
    var x = 1;
    console.log(x); //1?
    var x;
    console.log(x); //undifined?
    var x = 2;
    console.log(x); //2?
}
a();
//이 상태에서 environmentRecord는 현태 실행될 컨텍스트의 대상 코드 내에 어떤 식별자들이 있는지에만 관심이 있고, 각 식별자에 어떤 값이 할당될 것인지는 관심이 없다.
//따라서 변수를 호이스팅할 때 변수명만 끌어올리고 할당 과정은 원래 자리에 그대로 남겨둔다.(매개변수도 마찬가지)
//다음의 형태로 바뀐다.
function a(){
    var x;
    var x;
    var x;

    x=1;
    console.log(x);//1
    console.log(x);//1
    x=2;
    console.log(x);//2
}
a(1);

//함수 선언의 호이스팅
function a() {
    console.log(b);
    var b = 'bbb'; //수집 대상(변수 선언)
    console.log(b);
    function b() { } //수집 대상(함수 선언)
    console.log(b);
}
a();

//a함수를 실행하는 순간 a함수의 실행 컨텍스트가 생성
//이때 변수명과 함수 선언의 정보를 위로 끌어올린다(수집)
//변수는 선언부와 할당부를 나누어 선언부만 끌어올리는 반면 함수 선언은 함수 전체를 끌어올린다.
//수집대상을 모두 순서대로 끌어올리고 나면 다음과 같은 형태로 변환
function a() {
    var b;
    function b() { }

    console.log(b); //함수
    b = 'bbb';
    console.log(b); //bbb
    console.log(b); //bbb
}
a();
//다음과 같은 순서로 실행
//변수 b를 선언 이때 메모리에서는 저장할 공간을 미리 확보하고, 확보한 공간의 주솟값을 변수 b에 연결해 둔다.
//다시 변수 b를 선언하고 함수 b를 선언된 변수 b에 할당하라고 함. 이미 선언된 변수 b가 있으므로 선언과정은 무시
//함수는 별도의 메모리에 담길 것이고, 그 함수가 저장된 주솟값을 b와 연결된 공간에 저장. 이제 변수b는 함수를 가리키게 됨
//변수 b에 할당된 함수 b를 출력
//변수 b에 'bbb'를 할당하라고 함. b와 연결된 메모리 공간에는 함수가 저장된 주솟값이 담겨있었는데 이걸 문자열 'bbb'가 담긴 주솟값으로 덮어씀


//함수 선언문과 함수 표현식
//함수 선언문은 function 정의부만 존재하고 별도의 할당 명령이 없는 것
//함수 표현식은 정의한 function을 별도의 변수에 할당하는 것을 말함
//함수 선언문은 반드시 함서명이 정의돼 있어야 하는 반면, 함수 표현식은 없어도됨
function a() {} //함수 선언문 함수명 a가 곧 변수명
var b = function() {} //함수 표현식, 변수명 b가 곧 함수명
var c = function d() {} //기명 함수 표현식 변수명은 c 함수명은 d
c();//실행됨
d();//에러

//함수 선언문과 함수 표현식의 실질적인 차이
console.log(sum(1,2));
console.log(multyply(3,4));

function sum(a,b) {
    return a+b;
}
var multyply = function(a,b) {
    return a*b;
}

//호이스팅하면

function sum(a,b) {
    return a+b;
}
var multyply;

console.log(sum(1,2)); //3
console.log(multyply(3,4)); //multyply is not function

multyply = function(a,b) {
    return a*b;
}

