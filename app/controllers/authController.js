var authController = function() {} // authController constructor

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

authController.prototype.isAuthenticated = async function(req, res, app) {

	var authService = new ( require("./../services/authService.js") )();

	let { token } = req.query && req.query.token
										? req.query
										: req.body;

	var response = await authService.isAuthenticated( token, app );

	res.send(response);
	res.end();

}

authController.prototype.logout = async function(req, res, app) {

	var authService = new ( require("./../services/authService.js") )();

	var { token } = req.query;

	var response = await authService.logout( token, app );

	res.send(response);
	res.end();

}

module.exports = authController;
