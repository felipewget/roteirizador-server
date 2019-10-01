
/**
 *  Rotas de Roteizizacao
 *  Este arquivo contem rotas sobre roteirizacao
 */
module.exports = function(app){

    let routeController   = require("./../controllers/routeController.js");


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
		app.get( '/route/:route_id' , function( req, res ){
			( new routeController() ).getRouteById( req, res, app );
		});


		/**
		 *  Lista minhas rotas
     *
     *  @method   GET
     *
     *  @param    string  token
     *
     *  @return json
		 */
    app.get( '/routes' , function( req, res ){
    	( new routeController() ).listMyRoutes( req, res, app );
    });


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
    app.post( '/route/create' , ( req, res ) => {
			( new routeController() ).createRoute( req, res, app );
		});

}
