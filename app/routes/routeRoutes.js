
/**
 *  Profile Routes
 *  This archive has routes about user profile page
 */
module.exports = function(app){

    let routeController   = require("./../controllers/routeController.js");

    /**
		 *  Update my personal profile`s link   When register was creted random link
     *                                      and user can update to personal link
     *                                      one time.
     *
     *  @method PUT
     *
		 *  @TODO   It`s check only other profiles to don`t reapeat link but in future,
     *          I need check pesges and community too
     *
     *  @param  string  personal_link
     *  @param  string  token         Oauth Token
     *
     *  @return json
		 */
		app.get( '/route/:route_id' , function( req, res ){
			( new routeController() ).getRouteById( req, res, app );
		});

		/**
		 *  Get basic informations about profile
     *
     *  @method   GET
     *
     *  @internal Used to get header information profile
     *
		 *  @param    string  token       Oauth Token
		 *  @param    string  profile_id
     *
     *  @return json
		 */
    app.get( '/routes' , function( req, res ){
    	( new routeController() ).listMyRoutes( req, res, app );
    });

    /**
		 *  Get basic informations about profile
     *
     *  @method   GET
     *
     *  @internal Used to get header information profile
     *
		 *  @param    string  token       Oauth Token
		 *  @param    string  profile_id
     *
     *  @return json
		 */
    app.post( '/route/create' , ( req, res ) => {
			( new routeController() ).createRoute( req, res, app );
		});

}
