// 1. Crie uma função que declara uma variável sem atribuir valor a ela
// e retorna essa variável;

function declareVar() {
    var a;
    return a;
};

// 2. Crie uma função que declara uma variável, atribuindo valor a ela
// e retorna essa variável;

function declareVarValue(a) {
    var varValue = a;
    return varValue;
};

// 3. Crie uma função que retorne a soma de três números quaisquer.

function sum(a, b, c) {
    return a + b + c;
};

// 4. Crie uma função que verifica se um numero é maior que outro, usando o
// if e o else. ex: ehMaior(2,1) => true; ehMaior(1,2) => false

function ehMaior(a, b) {
    if (a > b) return true;
    else return false;
};

// 5. Crie uma função que verifica se um numero é maior que outro, SEM usar o
// if e o else. ex: ehMaior(2,1) => true; ehMaior(1,2) => false

function ehMaiorNoIf(a, b) {
    return a > b ? true : false;
};
