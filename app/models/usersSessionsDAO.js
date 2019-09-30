/**
 * Collection UsersSessions
 * @description Este documento contem operacoes na collection UsersSessions
 * @author Fe Oliveira
 * @collection_structure
 	{
		_id: 		ObjectId(),	// Objeto Id do proprio MongoDB para indexacao
		user_id: 	ObjectId(),	// Id do usuario da collection Users
		email: 		String,
		link: 		String,		// Link do usuario da collection Users
		token: 		HashString, // Token de autenticacao
		token_type: String,		// Tipo do Token de acesso
		expire: 	Bool,
		created: 	Timestamp,	// Quando a sessao criada
		updated: 	Timestamp,	// Quando a sessao foi atualizada
		machine: 	{
			ip: null,			// IP de acesso
			browser: null		// Navegador que utiliza
		}

 	}
 	OBS, nao tem DELETED, o DELETED ira para um historico UsersSessionsHistory por exemplo
 */

function UsersSessionsDAO(connection)
{

	this._db_name 			= 'roterizador';
	this._conn 				= connection( this._db_name );
	this._collection_name 	= "users_sessions";

}

UsersSessionsDAO.prototype.createSession = function( objSessionStructure )
{

	var db_name 			= this._db_name;
	var conn 				  = this._conn;
	var collection_name 	= this._collection_name;
	var objSessionStructure = objSessionStructure;

	var response 			= {
								cod: 200,
							};
	var query;
	var fields;

	return new Promise((resolve, reject) => {

		try {

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.insert( objSessionStructure, function( status, result){

						response.obj_inserted = result.ops;
						mongoclient.close();
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

UsersSessionsDAO.prototype.isValidSession = function( token )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var token 			= token;
	var query;
	var fields;

	return new Promise(( resolve, reject ) => {

		try {

			fields = {
				_id: 		1,
				user_id: 	1,
				link: 		1,
				token: 		1,
			};

			query = { 'token': 	{ $eq: token } };

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

UsersSessionsDAO.prototype.deleteSession = function( token )
{

  console.log( token)

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var token 			= token;
	var query			= query;

	return new Promise(( resolve, reject ) => {

		try {

			query = { 'token': 	{ $eq: token } };

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.remove( query , function (err, result) {

						mongoclient.close();

            response = {
              success: true,
              metadata: {
                authenticated: false,
                deleted_token: token,
              }
            }

						return resolve( response );

					});

				});

			});

		} catch ( e ) {

      esponse = {
        success: false,
        metadata: {
          error: e.message,
        }
      }

			return resolve( response );

		}

	});

}

module.exports = function(){
	return UsersSessionsDAO;
}
