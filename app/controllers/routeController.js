var routeController = function() {} // routeController constructor

routeController.prototype.getRouteById = async function(req, res, app) {

	var routeService 	= new ( require("./../services/routeService.js") )();

	let { token } = req.query;
	let { route_id } = req.params;

	// Validation

	let params = {
		auth_token	:	token,
		route_id		:	route_id
	};

	var response = await routeService.listRouteById( params, app );

	res.json( response );
	res.end();

}

routeController.prototype.listMyRoutes = async function(req, res, app) {

	var routeService 	= new ( require("./../services/routeService.js") )();

	let { token } = req.query;

	// Validation

	let params = {
		auth_token	:	token
	};

	var response = await routeService.listRoutes( params, app );

	res.json( response );
	res.end();

}

routeController.prototype.createRoute = async function(req, res, app) {

	var routeService 	= new ( require("./../services/routeService.js") )();

	let { token,
	 			obj_route } = req.query && req.query.token
												? req.query
												: req.body;

	// Validation

	let params = {
		auth_token	:	token,
		route				:	obj_route
	};

	var response = await routeService.save( params, app );

	res.json( response );
	res.end();

}

module.exports = routeController;
