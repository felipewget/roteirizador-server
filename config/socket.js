module.exports = function(io, app){

	io.sockets.on('connection', function( client ){

		client.on('disconnect', function(){
	        console.log('desconectado: ' + client.id);
	    });

	});

}
