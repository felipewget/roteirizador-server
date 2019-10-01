/**
 *	tokensUtil
 *
 *	Metodos uteis relacionados aos tokens
 *
 *	@author 	Fe Oliveira<felipe.wget@gmail.com>
 *
 * 	@version 	0.0.1
 */
 var tokensUtil = function() {} // tokensUtil constructor

 /**
  *	Cria um novo access_token
  *
  *	@params string login
  *
  *	@return obj
  */
tokensUtil.prototype.createAccessToken = function( login ) {

	var sha1 = require('sha1');
	var response = {
		cod: 200,
		token: null,
	};

	try {

		return new Promise((sucess, reject) => {

			response.token = sha1( Date.now() + "_" + login + "_access_token")
			return sucess( response );

		});

	} catch ( e ) {

		response.cod = 500;
		response.error = "Problema interno";
		response.message = "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso";

		return sucess( response );

	}

}

/**
 *	Cria um token pelo password
 *
 *	@params string password
 *
 *	@return obj
 */
tokensUtil.prototype.createUserPasswordToken = function( password ) {

	var sha1 = require('sha1');
	var response = {
		cod: 200,
		password: null,
	};

	try {

		return new Promise((sucess, reject) => {

			response.password = sha1( password );
			return sucess( response );

		});

	} catch ( e ) {

		response.cod = 500;
		response.error = "Problema interno";
		response.message = "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso";

		return sucess( response );

	}

}

module.exports = function(){
	return tokensUtil;
}
