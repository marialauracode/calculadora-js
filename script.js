// 1º PASSO: Selecionando os elementos do HTML

const resultado = document.querySelector('.resultado');
const botoes = document.querySelectorAll('.botoes button');

// 2º PASSO: Criar as variáveis principais

numAtual = "";
primeiroNum = null;
operador = null;
limpar = false; // quando TRUE, limpa o visor

// 3º PASSO: Criar a função que atualiza o visor

function atualizaResultado(limparVisor = false){

    resultado.innerHTML = limparVisor ? 0 : numAtual.replace(".", ",");

}

// 4º PASSO: Criar a função para adicionar dígitos
// função para adicionar o dígito no visor

function adicionaDigito(digito) {
    if (digito === "," && (numAtual.includes(",")) || !numAtual) {
        return;
    }

    /* com o limpar = false, significa que não é para reiniciar o visor, então
    o dígito é acrescentado ao valor atual.
    
    exemplo: numAtual = numAtual + digito
             numAtual = 1 + 2
             numAtual = 12 */
    
    if (limpar == true) {
        numAtual = digito;
        limpar = false;
    } else {
        numAtual = numAtual + digito;
    }

    atualizaResultado(false); /* chama a função para atualizar o visor e mostrar o número digitado,
    com vírgula no lugar do ponto*/
}

// 5º PASSO: Criar a função para definir o operador

function operadorSelecionado(novoOperador) {
    if (numAtual) { //se existe um número digitado no visor..
        calcular(); // função que resolve uma operação anterior antes de prosseguir
        primeiroNum = numAtual = parseFloat.replace(",", ".");
        numAtual = "";
    }

    operador = novoOperador;

    // 6º PASSO: Criar a função de cálculo

    function calcular() {
        if (operador == null || primeiroNum == null) {
            return;
        }

        var segundoNum = parseFloat(numAtual.replace(",","."));
        var valorFinal; // onde vou guardar o resultado da operação

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

        default:
            return;
        }

        if (valorFinal.toString().split(".")[1]?.length > 5) {
            numAtual = parseFloat(valorFinal.toFixed(5));
        } else {
            numAtual = valorFinal.toString();
        }

        operador = null;
        primeiroNum = null;
        limpar = true;

        atualizaResultado();
    }

    // 7º PASSO: Criar a função de limpar a calculadora
    // chamando quando o botão C é clicado

    function limpaCalculadora() {
        numAtual = "";
        primeiroNum = null;
        operador = null;

        atualizaResultado(true);
    }

    // 8º PASSO: Criar função de porcentagem

    function porcentagemCalculadora() {
        var resultado = parseFloat(numAtual) / 100;

        if(["+", "-"].includes(operador)) {
            resultado = resultado * (primeiroNum || 1);
        }

        if (resultado.toString().split(".")[1]?.length > 5) {
            resultado = resultado.toFixed(5).toString();

        } 

        var numAtual = resultado.toString();
        atualizaResultado();

    }

    // 9º PASSO: Ativar os botões com eventos de clique
    // faz cada botão funcionar chamando a função certa

    botoes.forEach((button)) => {
        button.addEventListener("click", () => {
            var textoBotao = button.innerHTML;
            if (/^ [0-9,] + $ /.test(textoBotao)) {
                adicionaDigito(textoBotao);
            } else if(["+", "-", "x", "÷"].includes(textoBotao)){
                operadorSelecionado(textoBotao);
            } else if(textoBotao === "=") {
                calcular();
            } else if(textoBotao === "C") {
                limpaCalculadora();
            } else if (textoBotao === "±") { // INVERTE O SINAL
                numAtual = (parseFloat(numAtual || primeiroNum) * -1).toString()
                atualizaResultado();
            } else if(textoBotao === "%") {
                porcentagemCalculadora();
            }


        })
    }
        
}