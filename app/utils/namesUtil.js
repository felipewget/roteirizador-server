/**
 *	namesUtil
 *
 *	Metodos uteis relacionados ao tratamento de nome
 *
 *	@author 	Fe Oliveira<felipe.wget@gmail.com>
 *
 * 	@version 	0.0.1
 */
 var namesUtil = function() {} // namesUtil constructor

/**
 *	Formata o nome para um modo valido de insercao
 *
 *	@params string name
 *
 *	@return obj
 */
namesUtil.prototype.formatName = function( name ) {

	var name;
	response = {
		cod: 200
	}

	try {

		return new Promise((sucess, reject) => {

			var arrName = name.split(' ');
			if( arrName.length > 1 ){

				var indexArr = arrName.length - 1;

				response.name = {
					full_name: 	name,
					first_name: arrName[0],
					last_name: 	arrName[indexArr],
				}

				return sucess( response );

			} else {

				response.name = {
					full_name: 	name,
					first_name: arrName[0],
					last_name: 	null,
				}

				return sucess( response );

			}


		});

	} catch ( e ) {

		response.cod = 500;
		response.error = "Problema interno";
		response.message = "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso";

		// console.log( e.message );
		return sucess( response );

	}

}

module.exports = function(){
	return namesUtil;
}
