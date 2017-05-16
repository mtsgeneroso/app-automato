let tbody = document.querySelector('tbody');
let numRows = 0;
let estadoInicial, estadosFinais, estados, simbolos, fita, transicoes = [];

adicionaLinha();

function adicionaLinha(){
	let tr = document.createElement('tr');
	tr.innerHTML = `
		<td>t(</td>
		<td>
			<input type="text" id="estadoInicial${numRows}" />
		</td>
		<td>,</td>
		<td>
			<input type="text" id="simbolo${numRows}" />
		</td>
		<td>)</td>
		<td>
			<input type="text" id="estadoSeguinte${numRows}" />
		</td>
		<td>) = (</td>
		<td>
			<select id="saida${numRows}">
				<option value='imagens/gato.png'>Gato</option>
				<option value='imagens/cachorro.png'>Cachorro</option>
				<option value='imagens/passaro.png'>Passaro</option>
			</select>
		</td>
		<td>)</td>
	`;
	tbody.appendChild(tr);
	numRows++;
}

function executaFita(){
	setaAsVariaveis();

	for( let i = 0; i < fita.length; i++ ){
		let trans = retornaObjeto(fita[i], estadoInicial);
		console.log(trans);
		if(!trans) {
			 addTexto('Sentença Invalida First');
			throw new Error('Nao achou a transiçao na fita');
		}


		if(checaUltimoElemento(i+1)){
			console.log('ultimo elemento', fita[i]);
			
			for(final of estadosFinais){
				console.log(final+' ini '+ estadoInicial);
				if(final === estadoInicial){
					addTexto('Sentença VÁLIDA!!!!');
					throw new Error('Sentença Valida');
				}
			}
			addTexto('Sentença Invalida Last');
			throw new Error('Sentença inválida last');
		}

		imprimeImagem(trans);
		estadoInicial = trans.estadoSeguinte;

	}

}

function imprimeImagem(trans){
	addTexto(`Transição: (${trans.estadoAtual}, ${trans.simbolo}) = ${trans.estadoSeguinte}`);
	var img = document.createElement("img");
	img.src = trans.saida;
	var element = document.getElementById('result');
	element.appendChild(img);
}

function addTexto(texto){
	var node = document.createElement("p");
	var textnode = document.createTextNode(texto);
	node.appendChild(textnode); 
	document.getElementById('result').appendChild(node);
}


function checaUltimoElemento(loop){
	let total = fita.length;
	console.log('Total da fita: '+ total + ' Loop: ' +loop);
	return total === loop ? true : false;
}


function retornaObjeto(simbolo, estado){
	for( let j = 0; j < transicoes.length; j++ ){
		if(transicoes[j].estadoAtual == estado && transicoes[j].simbolo == simbolo){
			return transicoes[j];
		}
	}
	/*
	let aux =  transicoes.map((t) => {
		if(t.estadoAtual == estado && t.simbolo == simbolo) return t;
	})[0];
	return aux;
	*/
}


function setaAsVariaveis(){
	estados = document.getElementById('estados').value.split(',');
	simbolos = document.getElementById('simbolosEntrada').value.split(',');
	estadoInicial = document.getElementById('estadoInicial').value;
	estadosFinais = document.getElementById('estadosFinais').value.split(',');

	fita = document.getElementById('fita').value;
	fita = [...fita];
 
	for (var i = 0; i < numRows; i++){
		let eI = document.getElementById('estadoInicial'+i).value;
		let si = document.getElementById('simbolo'+i).value;
		let eS = document.getElementById('estadoSeguinte'+i).value;
		let sa = document.getElementById('saida'+i).value;

		transicoes.push({
			estadoAtual: eI,
			simbolo: si,
			estadoSeguinte: eS,
			saida: sa
		});
	}
}

