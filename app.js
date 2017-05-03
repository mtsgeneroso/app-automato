const fita = document.getElementById('fita');
const btn = document.getElementById('executarFita');

let estados = {
	'A': { inicial: true},
	'B': {},
	'C': {},
	'D': { final: true },
	'E': {}
};

/*let transicoes = [
	'a': [
		{
			inicio: estados.B,
			fim: estados.A
		},
		{
			inicio: estados.B,
			fim: estados.D
		}
		{
			inicio: estados.C,
			fim: estados.A
		},
		{
			inicio: estados.B,
			fim: estados.D
		}
	],
	'b': [
		{
			inicio: estados.A,
			fim: estados.C
		},
		{
			inicio: estados.B,
			fim: estados.D
		}
	]
]*/

let f = [];

for((chave, valor) of estados){
	console.log(chave, valor)
}


function executarFita(){
	let valida;
	f = [...fita.value];
	if(!getTransicao(fita[0]).inicio.inicial){
		console.log('Inválido')
	} 

	valida = checaEstado(0, f);


}

function checaEstado(pos, fita) {

}

function getTransicao(name){
	return transicoes.filter(
			(t) => t.name == name
		)[0]
}