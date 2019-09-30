var authService = function() {} // authService constructor

/**
 *	Authenticate and login of profile user per login and password
 *
 *	@param string login
 *	@param string password
 *	@param obj 		app
 */
authService.prototype.authenticate = async function( login, password, app ) {

	var conn 							= require("./../../config/dbConnect");
	let usersInfoDAO 			= new app.app.models.usersInfoDAO( conn );
	let usersSessionsDAO 	= new app.app.models.usersSessionsDAO( conn );
	let tokensUtil 				= new app.app.utils.tokensUtil;

	let response 	= {};
	let obj_structure_session = {
		user_id			: null,
		link				: null,
		token				: null,
		email				: null,
		token_type	: 'user',
		created			: Date.now(),
		updated			: null,
		expire			: false,
		machine			:	{
			ip			: null,
			browser	: null
		}
 	};

	try {

		let { results } = await usersInfoDAO.authenticate( login, password );

		if( results.length > 0 ){

			let obj_token = await tokensUtil.createAccessToken( login );

			obj_structure_session.user_id = results[0]._id;
			obj_structure_session.link 		= results[0].link;
			obj_structure_session.email 	= results[0].auth.email;
			obj_structure_session.token 	= obj_token.token;

			// Create session record in DB
			await usersSessionsDAO.createSession( obj_structure_session );

			response.success				= true;
			response.metadata 			= {
					authenticated	: true,
					token					: obj_token.token
			};

			return response;

		} else {

			response.success				= true;
			response.metadata 			= {
					authenticated	: false
			};

			return response;

		}

	} catch ( e ) {

		response = {
			success: false,
			metadata: {
				error 		: "Problema interno",
				message 	: "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso"
			}
		}

		// Save error log
		let logService 	= new ( require("./logService.js") )();

		var obj_log 	 		= {
			controller 		: 'authService',
			method 				:	'authenticate',
			error 				: e.message,
			method_params	: {
				login		: login,
				password: password
			},
			show_to_user: response
		};
		await logService.saveLog( obj_log, 'error', app );

		return response;

	}

}

/**
 *	Verify token and check if session is valid
 *
 *	@param 	string token
 *	@param 	obj 	 app
 */
authService.prototype.isAuthenticated = async function( token, app ) {

	var conn 							= require("./../../config/dbConnect");
	let usersSessionsDAO 	= new app.app.models.usersSessionsDAO( conn );

	var response = {};

	try {

		let { results } = await usersSessionsDAO.isValidSession( token );

		if( results.length > 0 ){

			response = {
				success		: true,
				metadata	: {
					authenticated	: true,
					token 				:	token,
					user_id 			:	results[0].user_id,
					link 					:	results[0].link
				}
			}

			return response;

		} else {

			response = {
				success		: true,
				metadata	: {
					authenticated	: false
				}
			}

			return response;

		}

	} catch ( e ) {

		response = {
			success: false,
			metadata: {
				error 		: "Problema interno",
				message 	: "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso"
			}
		}

		// Save error log
		let logService 	= new ( require("./logService.js") )();

		var obj_log 	 		= {
			controller 		: 'authService',
			method 				:	'isAuthenticated',
			error 				: e.message,
			method_params	: {
				token		: token,
			},
			show_to_user: response
		};
		await logService.saveLog( obj_log, 'error', app );

		return response;

	}

}

/**
 *	Make loggout of token
 *
 *	@param string token
 *	@param obj 		app
 */
authService.prototype.logout = async function( token, app ) {

	var conn 							= require("./../../config/dbConnect");
	let usersSessionsDAO 	= new app.app.models.usersSessionsDAO( conn );

	var response = {};

	try {

		let logout_response = await usersSessionsDAO.deleteSession( token );
		return logout_response;

	} catch ( e ) {

		response = {
			success: false,
			metadata: {
				error 		: "Problema interno",
				message 	: "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso"
			}
		}

		// Save error log
		let logService 	= new ( require("./logService.js") )();

		var obj_log 	 		= {
			controller 		: 'authService',
			method 				:	'logout',
			error 				: e.message,
			method_params	: {
				token		: token,
			},
			show_to_user: response
		};
		await logService.saveLog( obj_log, 'error', app );

		return response;

	}

}

module.exports = authService;
