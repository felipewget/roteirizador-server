/**
 *	authController
 *
 *	Controler com metodos relacionados a autenticacao
 *
 *	@author 	Fe Oliveira<felipe.wget@gmail.com>
 * 	@version 	0.0.1
 */
var authController = function() {} // authController constructor


/**
 *  Verfifica o login do usuario
 *
 *  @method   POST
 *
 *  @param    string login
 *  @param    string password
 *
 *  @return   json
 */
authController.prototype.authenticate = async function(req, res, app) {

	var authService = new ( require("./../services/authService.js") )();

	let {
		login,
		password
	} = req.query && req.query.login
				? req.query
				: req.body;

	var response = await authService.authenticate( login, password, app );

	res.send( response );
	res.end();

}


/**
 *  Verifica se o token de autenticacao do usuario e valido
 *
 *  @method   GET
 *
 *  @param    string token
 *
 *  @return   json
 */
authController.prototype.isAuthenticated = async function(req, res, app) {

	var authService = new ( require("./../services/authService.js") )();

	let { token } = req.query && req.query.token
										? req.query
										: req.body;

	var response = await authService.isAuthenticated( token, app );

	res.send(response);
	res.end();

}


/**
 *  Faz o logout do usuario
 *
 *  @method DELETE
 *
 *  @param  string token
 *
 *  @return json
 */
authController.prototype.logout = async function(req, res, app) {

	var authService = new ( require("./../services/authService.js") )();

	var { token } = req.query;

	var response = await authService.logout( token, app );

	res.send(response);
	res.end();

}

module.exports = authController;
