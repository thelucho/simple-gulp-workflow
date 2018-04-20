(function(){
	function nombrar(nombre){
		return nombre;
	}

	function saludar(nombre){
		console.info(nombre, ', un saludo.....!!!');
	}

	saludar(nombrar('Pepe'));
})();