var registerService = function() {} // registerService constructor

registerService.prototype.register = async function( params, app ) {

	try {

		let conn 							= require("./../../config/dbConnect");
		let usersInfoDAO 			= new app.app.models.usersInfoDAO( conn );
		let usersSessionsDAO 	= new app.app.models.usersSessionsDAO( conn );

		let tokensUtil 				= new app.app.utils.tokensUtil;
		let namesUtil 				= new app.app.utils.namesUtil;

		let {
			name,
			login,
			password
		} = params;

		let response = {};

		let obj_user_structure = {
	 		auth: {
				email			:	login,
				password	:	password,
	 		},
	 		name: {
				full_name: 	null,
				first_name: null,
				last_name: 	null,
			},
			created: 		Date.now(),
	 		updated: 		null,
	 		deleted: 		null
	 	};

		let check_response = await usersInfoDAO.checkExistEmail( login );

		if( check_response.results.length < 1 ){

			let password_hash	= await tokensUtil.createUserPasswordToken( password );
			let formated_name = await namesUtil.formatName( name );

			obj_user_structure.name = formated_name.name;
			obj_user_structure.auth.email = login;
			obj_user_structure.auth.password = password_hash.password;

			let response_isert = await usersInfoDAO.register( obj_user_structure );

			if( response_isert.success === true ){

				delete( response_isert.metadata[0].auth 		);
				delete( response_isert.metadata[0].updated 	);
				delete( response_isert.metadata[0].deleted 	);
				
				return response_isert;

			} else {

					new Throw({
						message: response_isert.error
					})

			}

		} else {

			response = {
				success: false,
				error: "Email Existe",
				message: "Email ja cadastrado"
			}

			// Existe, retorna erro
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
			controller 		: 'registerService',
			method 				:	'register',
			error 				: e.message,
			method_params	: params,
			show_to_user: response
		};
		await logService.saveLog( obj_log, 'error', app );

		return response;

	}


}

module.exports = registerService;
