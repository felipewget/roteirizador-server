/**
 * Collection UsersInfo
 * @description Este documento contem operacoes na collection UsersInfo
 * @author Fe Oliveira
 * @collection_structure
 	{
		_id: 		ObjectId(),	// Objeto Id do proprio MongoDB para indexacao
		user_id: 	ObjectId(),	// Id do usuario da collection Users
		link: 		String,		// Link do usuario da collection Users
 		auth: {
			email: 		String,
			password: 	HashString,
 		},
 		actual_picture: String, // Imagem de perfil atual
		actual_cover: 	String,	// Imagem de capa de perfil atual
 		name: {
			full_name: 	String, // Nome completo do usuario
			first_name: String,	// Primeiro nome do usuario
			last_name: 	String,	// Ultimo nome do usuario
		},
		about_text: {
			text: 		String,
			privacy: 	String,
		},
		gender: {
			gender: 	String,
			privacy: 	String,
		},
		civil_status: {
			civil_status: 	String,
			privacy: 		String,
		},
		date_of_birth: {
			timestamp: Timestamp
			day_of_week: Int,
			day: Int,
			month: Int,
			year: Int,
			privacy: String,
		},
		actual_city: {
			city: 		String,
			state: 		String,
			country: 	String,
			lat: 		String,
			lng: 		String,
			privacy: 	String,
		},
		hometown: {
			city: 		String,
			state: 		String,
			country: 	String,
			lat: 		String,
			lng: 		String,
			privacy: 	String,
		},
		birth_city: {
			city: 		String,
			state: 		String,
			country: 	String,
			lat: 		String,
			lng: 		String,
			privacy: 	String,
		},
		phones: [
			{
				phone: 		String,
				privacy: 	String,
			}
		],
		emails: [
			{
				email: 		String,
				privacy: 	String,
			}
		],
		social_links: [
			{
				link: 		String,
				privacy: 	String,
			}
		],
		sites: [
			{
				link: 		String,
				privacy: 	String,
			}
		],
		favorite_links: [
			{
				link: 		String,
				privacy: 	String,
			}
		],
		knowledges: [
			{
				title: String,
				privacy: String
				tags: [
					{
						title: 		String,
						level: 		String,
						created: 	Timestamp,
						updated: 	Timestamp,
					}
				]
			}
		],
		works: [
			{
				role: 				String,
				title: 				String,
				from: 				Timestamp,
				to: 				Timestamp,
				description: 		String,
				created: 			Timestamp,
				updated: 			Timestamp,
			}
		],
		educations: [
			{
				title: 				String,
				course: 			String,
				status_course:		String,
				from: 				Timestamp,
				to: 				Timestamp,
				description: 		String,
				created: 			Timestamp,
				updated: 			Timestamp,
			}
		],
		created: 		Timestamp,
 		updated: 		Timestamp,
 		actived: 		Bool,
 		link_updated: 	false,
 		email_verified: Bool,
		privacity: 		String, // Tipo de privacidade de perfil ( Se mostra conteudo apenas pra amigos, pra quem nao ta cadastrados, etc )\
 	}
 */

function UsersInfoDAO(connection)
{

	this._db_name 			= 'roterizador';
	this._conn 				= connection( this._db_name );
	this._collection_name 	= "users_info";

}

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

UsersInfoDAO.prototype.checkExistLink = function( link ){

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var link 			= link;
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

			query = { link:	{ $eq: link } };

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

UsersInfoDAO.prototype.getAllDataProfileByLink = function( link ){

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var link 			= link;
	var response 		= {
							cod: null,
						};
	var query;
	var fields;

	return new Promise(( resolve, reject ) => {

		try {

			fields = {
				_id: 1,
				name: 1,
				gender: 1,
				status: 1,
				actual_city: 1,
				hometown: 1,
				about_text: 1,
				civil_status: 1,
				phones: 1,
				emails: 1,
				link: 1,
				birthday: 1,
				knowledges: 1,
				works: 1,
				educations: 1,
			};

			query = { link:	{ $eq: link } };

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.find( query, fields ).toArray(function (err, result) {

						mongoclient.close();

						response.cod = 200;
						response.metadata = result;

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






UsersInfoDAO.prototype.getProfileByLink = function( link ){

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var link 			= link;
	var response 		= {
							cod: null,
						};
	var query;
	var fields;

	return new Promise(( resolve, reject ) => {

		try {

			fields = {
				_id: 1,
				name: 1,
				gender: 1,
				status: 1,
				link: 1
			};

			query = { link:	{ $eq: link } };

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.find( query, fields ).toArray(function (err, result) {

						mongoclient.close();

						response.cod = 200;
						response.metadata = result;

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

UsersInfoDAO.prototype.updateLink = function( user_id, link )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			query = {
				$and: [
					{ '_id': 			{ $eq: object_user_id } },
					{ 'link_updated': 	{ $eq: false } },
				]
			};

			update = {
				$set: {
					'link': 		link,
					'link_updated':	true,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.link_updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.link_updated = false;
							response.results = null;

							return resolve( response );

						}


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


UsersInfoDAO.prototype.updateGender = function( user_id, gender, privacy )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			query = { '_id': { $eq: object_user_id } };

			update = {
				$set: {
					'gender.gender': 		gender,
					'gender.privacy': 		privacy,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.gender_updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.gender_updated = false;
							response.results = null;

							return resolve( response );

						}


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


UsersInfoDAO.prototype.updateAboutText = function( user_id, about_text, privacy )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			query = { '_id': { $eq: object_user_id } };

			update = {
				$set: {
					'about_text.text': 		about_text,
					'about_text.privacy': 	privacy,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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


UsersInfoDAO.prototype.updateBirthday = function( user_id, obj_birthday )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			query = { '_id': { $eq: object_user_id } };

			update = {
				$set: {
					'birthday': 	obj_birthday,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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


UsersInfoDAO.prototype.updateCivilStatus = function( user_id, civil_status, privacy )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			query = { '_id': { $eq: object_user_id } };

			update = {
				$set: {
					'civil_status.civil_status'	: civil_status,
					'civil_status.privacy'		: privacy,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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


UsersInfoDAO.prototype.updateActualCity = function( user_id, obj_actual_city )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			query = { '_id': { $eq: object_user_id } };

			update = {
				$set: {
					'actual_city'	: obj_actual_city,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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


UsersInfoDAO.prototype.updateHometown = function( user_id, obj_hometown )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			query = { '_id': { $eq: object_user_id } };

			update = {
				$set: {
					'hometown'	: obj_hometown,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.updatePhone = function( user_id, obj_phones )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			query = { '_id': { $eq: object_user_id } };

			update = {
				$set: {
					'phones'	: obj_phones,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.updateSocialLinks = function( user_id, obj_links )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			query = { '_id': { $eq: object_user_id } };

			update = {
				$set: {
					'social_links'	: obj_links,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.updateEmails = function( user_id, obj_emails )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			query = { '_id': { $eq: object_user_id } };

			update = {
				$set: {
					'emails'	: obj_emails,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.updateSites = function( user_id, obj_sites )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			query = { '_id': { $eq: object_user_id } };

			update = {
				$set: {
					'sites'	: obj_sites,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.postKnowledgeArea = function( user_id, obj_knowledge_area )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			obj_knowledge_area._id = new ObjectId();
			query = { '_id': { $eq: object_user_id } };


			update = {
				$push: {
					'knowledges'	: obj_knowledge_area,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = obj_knowledge_area;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.deleteKnowledgeArea = function( user_id, string_id )
{

	// user_id;
	// obj_knowledge_area;

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var _id;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId 		= require('mongodb').ObjectId;
			var object_user_id 	= new ObjectId( user_id );
			var _id 			= new ObjectId( string_id );

			query = { '_id'	: { $eq: object_user_id } };

			update = {
				$pull: {
					'knowledges': {
						'_id': _id
					},
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { multi: false }, function( error, callback ){

						if( error === null ){

							mongoclient.close();

							response.cod = 200;
							response.deleted = true;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.deleted = false;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.putKnowledgeArea = function( user_id, string_id, title_knowledge_area, privacy )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId 		= require('mongodb').ObjectId;
			var object_user_id 	= new ObjectId( user_id );
			var _id 			= new ObjectId( string_id );

			query = {
				'_id': { $eq: object_user_id },
				'knowledges._id': { $eq: _id }
			};

			update = {
				$set: {
					'knowledges.$.title'	: title_knowledge_area,
					'knowledges.$.privacy'	: privacy,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.postKnowledge = function( user_id, knowlegde_area_id, obj_knowledge )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id 	= new ObjectId( user_id );
			var object_area_id 	= new ObjectId( knowlegde_area_id );
			var object_tag_id 	= new ObjectId();

			obj_knowledge._id = object_tag_id;

			query = {
				$and: [
					{ '_id': { $eq: object_user_id } },
					{ 'knowledges._id': { $eq: object_area_id } },
				]
			}

			update = {
				$push: {
					'knowledges.$.tags'	: obj_knowledge,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod 	 = 200;
							response.updated = true;
							response.results = callback.result;
							response.metadata = obj_knowledge;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;
							response.metadata = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.deleteKnowledge = function( user_id, knowlegde_area_id, knowlegde_tag_id )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var object_user_id;
	var knowlegde_area_id;
	var knowlegde_tag_id;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId 		= require('mongodb').ObjectId;
			object_user_id 		= new ObjectId( user_id );
			knowlegde_area_id 	= new ObjectId( knowlegde_area_id );
			knowlegde_tag_id 	= new ObjectId( knowlegde_tag_id );

			query = {
				$and: [
					{ '_id'	: { $eq: object_user_id } },
					{ 'knowledges._id': { $eq: knowlegde_area_id } },
					{ 'knowledges.tags._id': { $eq: knowlegde_tag_id } },
				]
			};

			update = {
				$pull: {
					'knowledges.$.tags': {
						'_id': knowlegde_tag_id
					}
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { multi: false }, function( error, callback ){


						if( error === null ){

							mongoclient.close();

							response.cod = 200;
							response.deleted = true;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.deleted = false;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.postWork = function( user_id, obj_work )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			obj_work._id = new ObjectId();
			query = { '_id': { $eq: object_user_id } };


			update = {
				$push: {
					'works'	: obj_work,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){


						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.added = true;
							response.metadata = obj_work;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.added = false;
							response.results = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.deleteWork = function( user_id, work_id )
{

	var _id = work_id;

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId 		= require('mongodb').ObjectId;
			var object_user_id 	= new ObjectId( user_id );
			var work_id 		= new ObjectId( _id );

			query = { '_id'	: { $eq: object_user_id } };

			update = {
				$pull: {
					'works': {
						'_id': work_id
					},
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { multi: false }, function( error, callback ){

						if( error === null ){

							mongoclient.close();

							response.cod = 200;
							response.deleted = true;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.deleted = false;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.postEducation = function( user_id, obj_education )
{

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId = require('mongodb').ObjectId;
			var object_user_id = new ObjectId( user_id );

			obj_education._id = new ObjectId();
			query = { '_id': { $eq: object_user_id } };


			update = {
				$push: {
					'educations'	: obj_education,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){


						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.added = true;
							response.results = obj_education;
							response.metadata = obj_education;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.added = false;
							response.results = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.deleteEducation = function( user_id, education_id )
{

	var _id = education_id;

	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId 		= require('mongodb').ObjectId;
			var object_user_id 	= new ObjectId( user_id );
			var education_id 		= new ObjectId( _id );

			query = { '_id'	: { $eq: object_user_id } };

			update = {
				$pull: {
					'educations': {
						'_id': education_id
					},
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { multi: false }, function( error, callback ){

						if( error === null ){

							mongoclient.close();

							response.cod = 200;
							response.deleted = true;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.deleted = false;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.putWork = function( user_id, work_id, obj_work )
{


	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId 		= require('mongodb').ObjectId;
			var object_user_id 	= new ObjectId( user_id );
			var _id 			= new ObjectId( work_id );

			obj_work._id = _id;

			query = {
				'_id': { $eq: object_user_id },
				'works._id': { $eq: _id }
			};

			update = {
				$set: {
					'works.$'	: obj_work,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){


						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.putEducation = function( user_id, education_id, obj_education )
{


	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId 		= require('mongodb').ObjectId;
			var object_user_id 	= new ObjectId( user_id );
			var _id 			= new ObjectId( education_id );

			obj_education._id = _id;

			query = {
				'_id': { $eq: object_user_id },
				'educations._id': { $eq: _id }
			};

			update = {
				$set: {
					'educations.$'	: obj_education,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){


						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;
							response.metadata = obj_education;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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

UsersInfoDAO.prototype.putStatus = function( user_id, status )
{


	var db_name 		= this._db_name;
	var conn 			= this._conn;
	var collection_name = this._collection_name;
	var response 		= {
							cod: null,
						};
	var query;
	var update;

	return new Promise(( resolve, reject ) => {

		try {

			var ObjectId 		= require('mongodb').ObjectId;
			var object_user_id 	= new ObjectId( user_id );

			query = {
				'_id': { $eq: object_user_id },
			};

			update = {
				$set: {
					'status'	: status,
				}
			};

			conn( db_name ).open( function(err, mongoclient){

				mongoclient.collection( collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						if( callback && callback.result ){

							mongoclient.close();

							response.cod = 200;
							response.updated = true;
							response.results = callback.result;

							return resolve( response );

						} else {

							mongoclient.close();

							response.cod = 200;
							response.updated = false;
							response.results = null;

							return resolve( response );

						}


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
