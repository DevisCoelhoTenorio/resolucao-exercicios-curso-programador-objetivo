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

// 6. Crie uma função que retorna um preço após aplicado um desconto de 10%
// ex: precoComDesconto(10) => 9

function precoComDesconto(valor) {
    const desconto = 10
    return a - ((valor * desconto) / 100);
};

// 7. Crie uma função que retorna um preço após aplicado um desconto de n%

function precoComDescontoN(valor, desconto) {
    return a - ((valor * desconto) /100);
};

// 8. Crie uma função que classifica uma idade em jovem, meia-idade e idoso
// jovens são aqueles que possuem até 39 anos;
// meia-idade são os que estão entre 40 e 60 anos;
// idosos são os que posssuem mais de 60 anos;
// ex: classificaIdade(60) => "meia-idade"

function classificaIdade(idade)