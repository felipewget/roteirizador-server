/**
 *	registerController
 *
 *	Controler com metodos relacionados ao cadastro
 *
 *	@author 	Fe Oliveira<felipe.wget@gmail.com>
 * 	@version 	0.0.1
 */
var registerController = function() {} // registerController constructor


/**
 *  Registra um usuario
 *
 *  @method   POST
 *
 *  @param    string name 			Full_name
 *  @param    string login
 *  @param    string password
 *
 *  @return   json
 */
registerController.prototype.register = async function(req, res, app) {

	var registerService = new ( require("./../services/registerService.js") )();

	let {
		name,
		login,
		password
	} = req.query && req.query.login
			? req.query
			: req.body;

	// Validation

	let params = {
		name			:	name,
		login			:	login,
		password	: password
	};

	var response = await registerService.register( params, app );

	res.json( response );
	res.end();

}

module.exports = registerController;
