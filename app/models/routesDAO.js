/**
 * Collection Routes
 * @description Este documento contem operacoes na collection UsersInfo
 * @author Fe Oliveira
 * @collection_structure
 	{
		_id     :		ObjectId(),	// Objeto Id do proprio MongoDB para indexacao
		user_id :	ObjectId(),	// Id do usuario da collection Users
 		route   : [
      {
        _id: ObjectId(),
      }
    ],
		created :	Timestamp,
 		updated :	Timestamp,
 		deleted :	Timestamp,
 	}
 */

 /**
  * 	Construtor, ao instanciar, seleciona o DB e a collection onde sera feita as requisicoes
  *
  *	@param obj 													connection 	Obj de Conezao
  */
function RoutesDAO(connection)
{

	this._db_name 			= 'roterizador';
	this._conn 				= connection( this._db_name );
	this._collection_name 	= "routes";

}

/**
 *  List my routes ( SQL: SELECT collums FROM routes WHERE user_id="user_id" )
 */
RoutesDAO.prototype.listMyRoutes = async function( user_id )
{

  try {

  	let db_name 		 = this._db_name;
  	let conn 			   = this._conn;
  	let collection_name = this._collection_name;

  	let query = { 'user_id': 	{ $eq: user_id } };

  	let fields = {};

  	let mongoclient = await conn( db_name ).open();
  	let collection  = await mongoclient.collection( collection_name );
    let result      = await collection.find( query, fields ).sort({ 'created': -1 }).toArray();

  	mongoclient.close();

    let response = {
      success: true,
      metadata: result
    }

    return response;

	} catch ( e ) {

		response.cod = 500;
		response.error = e.message;
		return resolve( response );

	}

}

/**
 *  List route per ID ( SQL: SELECT collums FROM routes WHERE _id="_id" AND user_id="user_id" )
 */
RoutesDAO.prototype.getRouteById = async function( _id, user_id )
{

  try {

  	let db_name 		 = this._db_name;
  	let conn 			   = this._conn;
  	let collection_name = this._collection_name;

  	let query = {
      '$and': [
        { 'user_id' :	{ $eq: user_id } },
        { '_id'     :	{ $eq: _id } }
      ]
    };

  	let fields = {};

  	let mongoclient = await conn( db_name ).open();
  	let collection  = await mongoclient.collection( collection_name );
    let result      = await collection.find( query, fields ).toArray();

  	mongoclient.close();

    let response = {
      success: true,
      metadata: result
    }

    return response;

	} catch ( e ) {

    let response = {
      success: false,
      metadata: e.message
    }

	}

}

/**
 *  Insert Route ( SQL: INSERT INTO (collums) VALUES(values) )
 */
RoutesDAO.prototype.save = async function( obj )
{

  try {

  	let self 							= this;

  	let db_name 					= self._db_name;
  	let conn 							= self._conn;
  	let collection_name 	= self._collection_name;
  	let response 					= {};

		let mongoclient = await conn( db_name ).open();
		let collection = await mongoclient.collection( collection_name );

		let result     = await collection.insert( obj );

    mongoclient.close();

    return {
      success: true,
      metadata: result.ops[0]
    };

	} catch ( e ) {

    return {
      success : false,
      error   : e.message
    };

	}

}

module.exports = function(){
	return RoutesDAO;
}
