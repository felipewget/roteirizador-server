/**
 *	formUtil
 *
 *	Metodos uteis relacionados ao tratamento no formulario
 *
 *	@author 	Fe Oliveira<felipe.wget@gmail.com>
 *
 * 	@version 	0.0.1
 */
 var formUtil = function() {} // tokensUtil constructor

/**
 *  Verifica se e um email valido
 *
 *  @param string email
 *
 *  @return bool
 */
formUtil.prototype.checkEmail = ( email ) => {

  let validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i);

  return validEmailRegex.test(email)
      ? true
      : false;

}

/**
 *  Verifica se e um nome completo( com nome e sobrenome )
 *
 *  @param string full_name
 *
 *  @return bool
 */
formUtil.prototype.checkFullName = ( full_name ) => {

  full_name = full_name.trim()

  let [ name, last_name ] = full_name.split(' ');

  return name && name.length > 2 && last_name && last_name.length > 2
      ? true
      : false;

}

/**
 *  Verifica se e um password valido
 *
 *  @param string password
 *
 *  @return bool
 */
formUtil.prototype.checkPassword = ( password ) => {

  password = password.trim()

  return password.length > 7
      ? true
      : false;

}

/**
 *  Verifica se tem algo digitado
 *
 *  @param string value
 *
 *  @return bool
 */
formUtil.prototype.checkHasValue = ( value ) => {

  return value && value !== "" && value !== null && value !== undefined
          ? true
          : false;

}

module.exports = function(){
	return formUtil;
}
