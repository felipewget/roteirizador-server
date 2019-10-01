/**
 * Collection UsersInfo
 * @description Este documento contem operacoes na collection UsersInfo
 * @author Fe Oliveira
 * @collection_structure
 	{
		_id: 		ObjectId(),	// Objeto Id do proprio MongoDB para indexacao
 		auth: {
			email: 		String,
			password: 	HashString,
 		},
 		name: {
			full_name: 	String, // Nome completo do usuario
			first_name: String,	// Primeiro nome do usuario
			last_name: 	String,	// Ultimo nome do usuario
		},
    created: Timestamp,
    updated: Timestamp,
    deleted: Timestamp
 	}
 */

/**
 * 	Construtor, ao instanciar, seleciona o DB e a collection onde sera feita as requisicoes
 *
 *	@param obj 													connection 	Obj de Conezao
 */
function UsersInfoDAO(connection)
{

	this._db_name 			= 'roterizador';
	this._conn 				= connection( this._db_name );
	this._collection_name 	= "users_info";

}


/**
 *  Get user by login and pass ( SQL: SELECT collums FROM users_info WHERE auth.login="login" AND auth.password="password" )
 */
UsersInfoDAO.prototype.authenticate = function( login, password )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var login 			= login;
	var password 		= password;
	var response 		= {
							cod: null,
						};
	var query;
	var fields;

	return new Promise(( resolve, reject ) => {

		try {

			fields = {
				_id: 		1,
				link: 		1,
				user_id: 	1,
				auth: 		1,
			};

			query = {
				$and: [
					{
						$or: [
							{ 'auth.email':	{ $eq: login } },
							{ 'link': 	{ $eq: login } },
						]
					},
					{ 'auth.password': 	{ $eq: password } }
				]
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.find( query, fields ).toArray(function (err, result) {

						mongoclient.close();

						response.cod = 200;
						response.results = result;

						return resolve( response );

					});

				});

			});

		} catch ( e ) {

			response.cod = 500;
			response.error = e.message;
			return resolve( response );

		}

	});

}


/**
 *  Insert new user ( SQL: INSER INTO users_info ( collums ) VALUES ( values ) )
 */
UsersInfoDAO.prototype.register = function( objUserStructure )
{

	var db_name 			= this._db_name;
	var conn 				= this._conn;
	var collection_name 	= this._collection_name;
	var objUserStructure 	= objUserStructure;

	var response 			= {};
	var query;
	var fields;

	return new Promise((resolve, reject) => {
		try {

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.insert( objUserStructure, function( status, result){

            response = {
              success: true,
              metadata: result.ops
            }

						resolve( response );

					});

				});

			});

		} catch ( e ) {

      response = {
        success : false,
        error   : e.message
      }

			resolve( response );

		}

	});

}


/**
 *  Get ID user per email ( SQL: SELECT _id FROM users_info WHERE auth.login="email" )
 */
UsersInfoDAO.prototype.checkExistEmail = function( email ){

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var email 			= email;
	var response 		= {
							cod: null,
						};
	var query;
	var fields;

	return new Promise(( resolve, reject ) => {

		try {

			fields = {
				_id: 1,
			};

			query = { 'auth.email':	{ $eq: email } };

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.find( query, fields ).toArray(function (err, result) {

						mongoclient.close();

						response.cod = 200;
						response.results = result;

						return resolve( response );

					});

				});

			});

		} catch ( e ) {

			response.cod = 500;
			response.error = e.message;
			return resolve( response );

		}

	});

}


module.exports = function(){
	return UsersInfoDAO;
}
