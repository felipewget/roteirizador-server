
/**
 *  Autentication/Register Rotas
 * Este arquivo contem rotas de autenticacao e registro
 */
module.exports = function(app){

    let authController      = require("./../controllers/authController.js");
    let registerController  = require("./../controllers/registerController.js");


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
		app.post( '/auth' , function( req, res ){
			( new authController() ).authenticate( req, res, app );
		});


		/**
		 *  Verifica se o token de autenticacao do usuario e valido
     *
     *  @method   GET
     *
		 *  @param    string token
     *
     *  @return   json
		 */
		app.get( '/auth' , function( req, res ){
			( new authController() ).isAuthenticated( req, res, app );
		});


		/**
		 *  Faz o logout do usuario
     *
     *  @method DELETE
     *
     *  @param  string token
     *
     *  @return json
		 */
		app.delete( '/auth' , function( req, res ){
			( new authController() ).logout( req, res, app );
		} );


		/**
		 *  Registra novo usuario
     *
     *  @method   POST
     *
		 *  @param    string  name
     *  @param    string  login       Email
     *  @param    string  password
     *
     *  @return   json
		 */
		app.post( '/register' , function( req, res ){
			( new registerController() ).register( req, res, app );
		} );

}
