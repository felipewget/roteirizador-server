
/**
 *  Autentication/Register Routes
 *  This archive has routes about register, logout and authentications
 */
module.exports = function(app){

    let authController      = require("./../controllers/authController.js");
    let registerController  = require("./../controllers/registerController.js");

		/**
		 *  Check login and password to user`s login
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
		 *  Check Oauth token of account, if is valid session
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
		 *  Make user`s logout
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
		 *  Register new user
     *
     *  @method   POST
     *
		 *  @param    string  name        First name and Last name
     *  @param    string  login       Email
     *  @param    string  password
     *  @param    string  gender      Values Allowed is m|f
     *
     *  @return   json
		 */
		app.post( '/register' , function( req, res ){
			( new registerController() ).register( req, res, app );
		} );

}
