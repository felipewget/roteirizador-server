var routeService = function() {} // routeService constructor

/**
 *	List medias by profile
 *
 *	@param obj params {
 *		auth_token: user_auth_token,
 *		link			: link_of_profile,
 *		page			: page_in_pagination
 *	}
 *	@param obj app
 *
 *	@return json
 */
 routeService.prototype.listRouteById = async function( params, app ) {

 	try {

		// Dependencies
		var conn 								= require("./../../config/dbConnect");
		var authService 				= new ( require("./authService.js") )();
		var routesDAO = new app.app.models.routesDAO( conn );
		var usersInfoDAO 				= new app.app.models.usersInfoDAO( conn );

		// variables
		let {
			auth_token,
      route_id
		} = params;

		// check if is authenticated
		let user = await authService.isAuthenticated( auth_token, app );

		if( user.metadata && user.metadata.authenticated === true ){

				// convert text IDs to MongoID
				var ObjectId 				= require('mongodb').ObjectId;

				let obj_user_id 	= new ObjectId( user.metadata.user_id );
        let obj_id 	      = new ObjectId( route_id );

				// query - List medias in album
				// User Id is required how security
				let obj_medias = await routesDAO.getRouteById( obj_id, obj_user_id );

				if( obj_medias.success === true ){

					return {
						success : true,
						metadata: obj_medias.metadata
					};

				} else { // If has problem with Model, capture log
					throw { message: "Model routesDAO | " + obj_medias.error };
				}

		} else {

			return {
				success: 	false,
				error: 		"Token Invalido"
			};

		}

	} catch ( e ) {

		let response = {};

		response.error 		= "Problema interno";
		response.message 	= "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso";

		// Save error log
		let logs_service 	= new ( require("./logService.js") )();

		var obj_log 	 		= {
			service 			: 'routeService',
			method 				:	'listMediasInAlbum',
			error 				: e.message,
			method_params	: params,
			showed_to_user: response
		};

		await logs_service.saveLog( obj_log, 'error', app );

		// Return error to front-end
		return response;

	}

}


/**
 *	List medias in one album of profile
 *
 *	@param obj params {
 *		auth_token: user_auth_token,
 *		link			: link_of_profile,
 *		album_id	: album_id_in_profile,
 *		page			: page_in_pagination
 *	}
 *	@param obj app
 *
 *	@return json
 */
routeService.prototype.listRoutes = async function( params, app ) {

	try {

		// Dependencies
		var conn 								= require("./../../config/dbConnect");
		var authService 				= new ( require("./authService.js") )();
		var routesDAO = new app.app.models.routesDAO( conn );
		var usersInfoDAO 				= new app.app.models.usersInfoDAO( conn );

		// variables
		let {
			auth_token
		} = params;

		// check if is authenticated
		let user = await authService.isAuthenticated( auth_token, app );

		if( user.metadata && user.metadata.authenticated === true ){

				// convert text IDs to MongoID
				var ObjectId 				= require('mongodb').ObjectId;

				let obj_user_id 	= new ObjectId( user.metadata.user_id );

				// query - List medias in album
				// User Id is required how security
				let obj_medias = await routesDAO.listMyRoutes( obj_user_id );

				if( obj_medias.success === true ){

					return {
						success : true,
						metadata: obj_medias.metadata
					};

				} else { // If has problem with Model, capture log
					throw { message: "Model routesDAO | " + obj_medias.error };
				}

		} else {

			return {
				success: 	false,
				error: 		"Token Invalido"
			};

		}

	} catch ( e ) {

		let response = {};

		response.error 		= "Problema interno";
		response.message 	= "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso";

		// Save error log
		let logs_service 	= new ( require("./logService.js") )();

		var obj_log 	 		= {
			service 			: 'routeService',
			method 				:	'listMediasInAlbum',
			error 				: e.message,
			method_params	: params,
			showed_to_user: response
		};

		await logs_service.saveLog( obj_log, 'error', app );

		// Return error to front-end
		return response;

	}

}


/**
 *	Insert obj media album
 *
 @param obj params {
 *		auth_token	: user_auth_token,
 *		title				: title of album,
 *		description	: description,
 *		privacy			: privacy
 *	}
 *	@param obj app
 *
 *	@return json
 */
routeService.prototype.save = async function( params, app ) {

	try {

		var conn 								= require("./../../config/dbConnect");
		var authService 				= new ( require("./authService.js") )();
		var routesDAO = new app.app.models.routesDAO( conn );

		let {
	  	auth_token,
	  	route
	  } = params;

		let obj = 	{
      user_id :	null,	// Id do usuario da collection Users
      route   : route,
      created :	Date.now(),
      updated :	null,
      deleted :	null,
		};

		// check if user is authenticated

		let user = await authService.isAuthenticated( auth_token, app );

		if( user.metadata && user.metadata.authenticated === true ){

			obj.user_id = user.metadata.user_id;

			let response = await routesDAO.save( obj );

			if( response.success === true ){

				return {
					success : true,
					metadata: response.metadata
				};

			} else { // If has problem with Model, capture log
				throw { message: "Model routesDAO | " + response.error };
			}

		} else {

			return {
				success: 	false,
				error: 		"Token Invalido"
			};

		}

	} catch ( e ) {

		let response = {};

		response.error 		= "Problema interno";
		response.message 	= "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso";

		// Save error log
		let logs_service 	= new ( require("./logService.js") )();

		var obj_log 	 		= {
			service 			: 'routeService',
			method 				:	'createAlbumMedia',
			error 				: e.message,
			method_params	: params,
			showed_to_user: response
		};

		await logs_service.saveLog( obj_log, 'error', app );

		// Return error to front-end
		return response;

	}

}


module.exports = routeService;
