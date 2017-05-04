const fita = document.getElementById('fita');
const btn = document.getElementById('executarFita');
const mensagem = document.getElementById('mensagem');
const listaTransicoes = document.getElementById('listaTransicoes').querySelector('tbody');
const image = document.getElementsByTagName('img')[0];

let estadosCampos;
let simbolosEntrada;

let numLinha = 0;

const saidas = {
	'1' : {
		url: 'imagens/gato.png'
	},
	'2' : {
		url: 'imagens/cachorro.png'
	},
	'3' : {
		url: 'imagens/passaro.png'
	}
}

const estados = []

let transicoes = []


init()

function init() {
    adicionaLinha();
}

function adicionaLinha() {
	let tr = document.createElement('tr')
    tr.innerHTML += `<td>
							t(
						</td>
						<td>
							<input type="text" id="estadoAtual${numLinha}">
						</td>
						<td>
							,
						</td>
						<td>
							<input type="text" id="simbolo${numLinha}">
						</td>
						<td>
							) = (
						</td>
						<td>
							<input type="text" id="estadoSeguinte${numLinha}">
						</td>
						<td>
							,
						</td>
						<td>
							<select name="" id="saida${numLinha}">
								<option value="1">Gato</option>
								<option value="2">Cachorro</option>
								<option value="3">Pássaro</option>
							</select>
						</td>
						<td>
							)
						</td>`;

	listaTransicoes.appendChild(tr);

    numLinha++;
}

function carregarCampos(){
    estadosCampos = document.getElementById('estados').value.split(',');
    simbolosEntrada = document.getElementById('simbolosEntrada').value.split(',');
 	estadoInicial = document.getElementById('estadoInicial').value;
 	estadosFinais = document.getElementById('estadosFinais').value.split(',');

 	transicoes = [];

 	estadosCampos.map((e) => {	
	 	estados.push({
	 		chave: e,
	 		inicial: e == estadoInicial,
	 		final: estadosFinais.some((ef) => ef == e)
	 	})
 	})

 	for (var i = 0; i < numLinha; i++) {

 		let eAtual = document.getElementById('estadoAtual' + i).value;
 		let simbolo = document.getElementById('simbolo' + i).value;
 		let eSeguinte = document.getElementById('estadoSeguinte' + i).value;
 		let saida = document.getElementById('saida' + i).value;

 		transicoes.push({
 			nome: simbolo,
 			inicio: getEstadoPorChave(eAtual),
 			fim: getEstadoPorChave(eAtual),
 			saida: saida
 		})
 	}
 	executarFita();
}

function getEstadoPorChave(dado){
	return estados.filter((e) => e.chave == dado)[0]
}

function executarFita() {

    let valida;
    let posFita = 0;
    let estadoAtual;
    f = [...fita.value];
    estadoAtual = checarPosAtual(estados[0].chave, f[0]);

    if (estadoAtual) {
        for (let i = 1; i < f.length; i++) {
        	image.src = saidas[estadoAtual.saida].url;
        	setTimeout(function(){
            	estadoAtual = checarPosAtual(estadoAtual.fim.chave, f[i]);
        	}, 500)
            
            if (!estadoAtual) {
                exibirMensagem('Sentença inválida')
                return;
            } else {

            }
        }


        if (estadoAtual.fim.final) {
            exibirMensagem('Sentença válida')
        } else {
            exibirMensagem('Sentença inválida')
        }

    } else {
        exibirMensagem('Sentença inválida')
    }

}


function checarPosAtual(estadoAtual, simbolo) {
    return transicoes.filter(t => {
        return t.nome == simbolo && t.inicio.chave == estadoAtual
    })[0]
}

function exibirMensagem(valor) {
    mensagem.innerText = valor;
}
