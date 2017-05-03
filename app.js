const fita = document.getElementById('fita');
const btn = document.getElementById('executarFita');

let estados = [
	{
		name: 'A',
		inicial: true,
		final: true
	},
	{
		name: 'B'
	},
	{
		name: 'C'

	}
];

let transicoes = [
	{
		name: '1',
		inicio: estados[0],
		fim: estados[1]
	},
	{
		name: '2',
		inicio: estados[1],
		fim: estados[2]
	},
	{
		name: '3',
		inicio: estados[2],
		fim: estados[0]
	}
]

let f = [];


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