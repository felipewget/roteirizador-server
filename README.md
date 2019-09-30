# Roteirizador - Back-End Server

![Clusterized](./src/assets/git/img1.png)
![Structure](./src/assets/git/img2.png)
![Log in Mongo](./src/assets/git/img3.png)
![Response Exemple 1](./src/assets/git/img4.png)

## Sobre

Este projeto é o back-end de um roterizador, desenvolvivdo com NodeJs, ReactJs, vinculado com o GoogleMaps API e como banco de dados, o MongoDB, através dele é possivel criar rotas, criar um usuario, mudar entre as linguagens português, inglês e francês, visualizar um histórico de rotas. Este projeto foi desenvolvido para Fingerprint Digital, como um teste de candidatura para uma vaga.

### Funcionalidades

- Clusterizado, ele se cria copias de seu próprio projeto em cada nucleo de processamento
- Estrutura dele é MVC separado por configs de servidor, MVC do projeto e uma pasta documentation
- Rest ( Mas suporte já implementado para websocket e clusterização dos mesmo através do Redis )
- .Env
- Https se precisar ( use o https://certbot.eff.org/ para adquirir os sertificados pro seu dominio )

### Ambiente para Rodar o Projeto

- Voce vai precisar do Redis, Node, MongoDB e ReactJs instalado.
- Use npm i ou yarn i para instalar o as dependencias
- Crie um db NO MongoDB chamado roteirizador( as collections serão criadas automaticamente )
- Inicie o FrontEnd React, o projeto se encontra neste link: https://github.com/felipewget/roteirizador

### Iniciando o projeto

basta digitar nO Terminal/CMD <b>node app</b> ou <b>nodemon app</b> na raíz do projeto e irá rodar de acordo com a porta do .env, no caso, http://localhost:8080

### Observacōes e melhorias

- Vou refatorar esse codigo, ele nao esta ruim mas nem todos os metodos estao documentados
- Criar validacoes, o projeto ainda nao esta pronto, vou adicionar validaçōes
