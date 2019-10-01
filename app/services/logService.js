/**
 * logService
 *
 * @description Contem metodos de processamento relacionado aos logs do sistema,
 *              sendo que salva os logs em um banco de dados diferente da aplicacao
 *              principal
 *
 * @author Fe Oliveira<felipe.wget@gmail.com>
 */
var logService = function() {} // logService constructor

/**
 *	Salva um log de erro
 *
 *	@param 	obj                          obj_log     Obj com todos os campos que serao inseridos no log do sistema
 *	@param 	string<error|warning|test>   type_log    Tipo do log que sera inserido
 *	@param 	obj                          app         Obj da com aplicacao
 *
 *	@return obj
 */
logService.prototype.saveLog = function( obj_log, type_log, app ) {

	let self	   = this;

  var obj_log  = obj_log;
  var type_log = type_log;

	return new Promise((sucess, reject) => {

		try {

      // Dependencias
      var conn	   = require("./../../config/dbConnect");
      var logsDAO = new app.app.models.logsDAO( conn, type_log );

      // Garante o obj de log tera propriedades basicas
      obj_log.deleted = null;
      obj_log.created = Date.now();

      // Salva o obj de log no banco de dados
      logsDAO.save( obj_log ).then(function( response ){

        // Retorna o response do DAO
        return sucess( response );

      });

		} catch( e ){

			return sucess({
				success : false,
				error  	: e.message,
        cod  	  : 0,
			});

		}

	});

}

// Exporta o service e suas propriedades
module.exports = logService;
