/**
 * Collection logsDAO
 * @description Em um banco de dados separado da aplicacao principal, armazena os logs do sistema, como por exemplo:
 *							logs de erro
 * @author Fe Oliveira
 * @collection_structure
 	{
		_id				: ObjectId(),	// Objeto Id do proprio MongoDB para indexacao
		controller 	: String						,
		method 			:	String						,
		error_cod		: Int								,
		error 			: String						,
		params			: Obj								,
		url_params	: Obj								,
		created			: Timestamp					,
		deleted			: null | Timestamp 	,
 	}
 */

/**
 * 	Construtor, ao instanciar, seleciona o DB e a collection onde sera feita as requisicoes
 *
 *	@param obj 													connection 	Obj de Conezao
 *	@param string<error|warning|test> 	type_log		Tipo de Logs que sera inserido
 */
function logsDAO(connection, type_log)
{

	this._db_name 					= 'roterizador_logs';
	this._conn 							= connection( this._db_name );
	this._collection_name 	= type_log + "_logs";

}

/**
 *	Grava no bd um obj com informacoes de um log
 *
 *	@param 	obj obj_log Obj com todos os campos que serao inseridos no log do sistema
 *
 *	@return obj
 */
logsDAO.prototype.save = function( obj_log )
{

	var self 							= this;

	var db_name 					= self._db_name;
	var conn 							= self._conn;
	var collection_name 	= self._collection_name;
	var obj_log 					= obj_log;
	var response 					= {};

	return new Promise((resolve, reject) => {

		try {

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.insert( obj_log, function( status, result){

						response.success 		= true;
						response.metadata 	= result.ops;

						mongoclient.close();

						return resolve( response );

					});

				});

			});

		} catch ( e ) {

			response.success 		= false;
			response.error 			= e.message;
			response.cod 				= 0;
			return resolve( response );

		}

	});

}

// Exporta a Model e suas propriedades
module.exports = function(){
	return logsDAO;
}
