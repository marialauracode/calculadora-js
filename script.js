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
    if (adicionaDigito === "," && (numAtual.includes(",")) || !numAtual) {
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
    if (numAtual = true) { //se existe um número digitado no visor..
        calculate(); // função que resolve uma operação anterior antes de prosseguir
        primeiroNum = numAtual = parseFloat.replace(",", ".");
        numAtual = "";
    }

    operador = novoOperador;

    // 6º PASSO: Criar a função de cálculo
        
}