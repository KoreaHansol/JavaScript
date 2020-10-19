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
