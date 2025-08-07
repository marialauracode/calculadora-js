// 1º PASSO: Selecionando os elementos do HTML

const resultado = document.querySelector('.resultado')
const botoes = document.querySelectorAll('.botoes button')

// 2º PASSO: Criar as variáveis principais

numAtual = ""
primeiroNum = null
operador = null
limpar = false // quando TRUE, limpa o visor

// 3º PASSO: Criar a função que atualiza o visor

function atualizaResultado(limparVisor = false){

    resultado.innerHTML = limparVisor ? 0 : numAtual.replace(".", ",")

}