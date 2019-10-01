/**
 *  MongoDB Auth Connection
 */

var mongo = require('mongodb');

var conn = function( dbName ){

	var db = new mongo.Db(
		dbName,
		new mongo.Server(
				'localhost', // onde esta do DB
				27017, // Porta de Conexão
				{} // Opções de Config de servidor
		),
		{}
	);

	return db;

}

module.exports = function(){
	return conn
}
