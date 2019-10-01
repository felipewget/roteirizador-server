/**
 *	routeController
 *
 *	Controler com metodos relacionados a rotas( roteirizacao )
 *
 *	@author 	Fe Oliveira<felipe.wget@gmail.com>
 * 	@version 	0.0.1
 */
var routeController = function() {} // routeController constructor


/**
 *  Recupera rota por ID
 *
 *  @method GET
 *
 *  @param  string  route_id
 *  @param  string  token
 *
 *  @return json
 */
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


/**
 *  Lista minhas rotas
 *
 *  @method   GET
 *
 *  @param    string  token
 *
 *  @return json
 */
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


/**
 *  Cria uma rota
 *
 *  @method   POST
 *
 *  @param    string  token
 *  @param    string  obj_route
 *
 *  @return json
 */
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
