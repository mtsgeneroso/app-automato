const fita = document.getElementById('fita');
const btn = document.getElementById('executarFita');
const mensagem = document.getElementById('mensagem');

const estados = [
	{
		chave: 'A',
		inicial: true
	},
	{
		chave: 'B'
	},
	{
		chave: 'C'
	},
	{
		chave: 'D',
		final: true
	},
	{
		chave: 'E'
	}
]

const transicoes = [
	{
		nome: 'b',
		inicio: estados[0],
		fim: estados[2]
	},
	{
		nome: 'b',
		inicio: estados[2],
		fim: estados[1]
	},
	{
		nome: 'b',
		inicio: estados[1],
		fim: estados[3]
	},
	{
		nome: 'b',
		inicio: estados[3],
		fim: estados[3]
	},
	{
		nome: 'b',
		inicio: estados[4],
		fim: estados[1]
	},
	{
		nome: 'a',
		inicio: estados[1],
		fim: estados[0]
	},
	{
		nome: 'a',
		inicio: estados[2],
		fim: estados[4]
	},
	{
		nome: 'a',
		inicio: estados[4],
		fim: estados[4]
	},
	{
		nome: 'a',
		inicio: estados[3],
		fim: estados[1]
	}
]


function executarFita(){
	let valida;
	let posFita = 0;
	let estadoAtual;
	f = [...fita.value];
	estadoAtual = checarPosAtual(estados[0].chave, f[0]);

	if(estadoAtual){
		for(let i = 1; i < f.length; i++){
			estadoAtual = checarPosAtual(estadoAtual.fim.chave, f[i]);
			if (!estadoAtual) {
				exibirMensagem('Sentença inválida')
				return;
			}
		}


		if(estadoAtual.fim.final){
			exibirMensagem('Sentença válida')
		} else {
			exibirMensagem('Sentença inválida')
		}

	} else {
		exibirMensagem('Sentença inválida')
	}



}


function checarPosAtual(estadoAtual, simbolo){
	return transicoes.filter(t => {
		return t.nome == simbolo 
		    && t.inicio.chave == estadoAtual
	})[0]
}

function exibirMensagem(valor){
	mensagem.innerText = valor;
}