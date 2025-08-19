// 1º PASSO: Selecionando os elementos do HTML

const resultado = document.querySelector('.resultado');
const botoes = document.querySelectorAll('.botoes button');

let numAtual = "";
let primeiroNum = null;
let operador = null;
let limpar = false;

function atualizaResultado(limparVisor = false){
    resultado.innerHTML = limparVisor ? 0 : numAtual.replace(".", ",");
}

function adicionaDigito(digito) {
    if (digito === "," && (numAtual.includes(","))) {
        return;
    }
    if (limpar) {
        numAtual = digito;
        limpar = false;
    } else {
        numAtual += digito;
    }
    atualizaResultado();
}

function operadorSelecionado(novoOperador) {
    if (numAtual) {
        calcular();
        primeiroNum = parseFloat(numAtual.replace(",", "."));
        numAtual = "";
    }
    operador = novoOperador;
}

function calcular() {
    if (operador == null || primeiroNum == null) return;

    let segundoNum = parseFloat(numAtual.replace(",", "."));
    let valorFinal;

    switch(operador) {
        case "+": 
         valorFinal = primeiroNum + segundoNum;
         break;
        case "-":
         valorFinal = primeiroNum - segundoNum; 
         break;
        case "x": 
         valorFinal = primeiroNum * segundoNum; 
         break;
        case "÷": 
         valorFinal = primeiroNum / segundoNum; 
         break;
    }

    if (valorFinal.toString().split(".")[1]?.length > 5) {
        numAtual = parseFloat(valorFinal.toFixed(5)).toString();
    } else {
        numAtual = valorFinal.toString();
    }

    operador = null;
    primeiroNum = null;
    limpar = true;
    atualizaResultado();
}

function limpaCalculadora() {
    numAtual = "";
    primeiroNum = null;
    operador = null;
    atualizaResultado(true);
}

function porcentagemCalculadora() {
    let resultado = parseFloat(numAtual) / 100;
    if(["+", "-"].includes(operador)) {
        resultado = resultado * (primeiroNum || 1);
    }
    if (resultado.toString().split(".")[1]?.length > 5) {
        resultado = resultado.toFixed(5);
    }
    numAtual = resultado.toString();
    atualizaResultado();
}

botoes.forEach((button) => {
    button.addEventListener("click", () => {
        let textoBotao = button.innerHTML;

        if (/^[0-9,]+$/.test(textoBotao)) {
            adicionaDigito(textoBotao);
        } else if(["+", "-", "x", "÷"].includes(textoBotao)) {
            operadorSelecionado(textoBotao);
        } else if(textoBotao === "=") {
            calcular();
        } else if(textoBotao === "C") {
            limpaCalculadora();
        } else if (textoBotao === "±") {
            numAtual = (parseFloat(numAtual || primeiroNum) * -1).toString();
            atualizaResultado();
        } else if(textoBotao === "%") {
            porcentagemCalculadora();
        }
    });
});
