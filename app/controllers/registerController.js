var registerController = function() {} // registerController constructor

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
