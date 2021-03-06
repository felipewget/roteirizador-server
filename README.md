# Roteirizador - Back-End Server

![Clusterized](./app/publics/assets/git/img1.png)
![Structure](./app/publics/assets/git/img2.png)
![Log in Mongo](./app/publics/assets/git/img3.png)
![Response Exemple 1](./app/publics/assets/git/img4.png)
[![Video](https://img.youtube.com/vi/B_R6xIhlJ20/0.jpg)](https://www.youtube.com/watch?v=B_R6xIhlJ20 "Apresentation")

## Sobre

Este projeto é o back-end de um roterizador, desenvolvivdo com NodeJs, ReactJs, vinculado com o GoogleMaps API e como banco de dados, o MongoDB, através dele é possivel criar rotas, criar um usuario, mudar entre as linguagens português, inglês e francês, visualizar um histórico de rotas. Este projeto foi desenvolvido para Fingerprint Digital, como um teste de candidatura para uma vaga.

### Funcionalidades

- Clusterizado, ele se cria copias de seu próprio projeto em cada nucleo de processamento
- Estrutura dele é MVC separado por configs de servidor, MVC do projeto e uma pasta documentation
- Rest ( Mas suporte já implementado para websocket e clusterização dos mesmo através do Redis )
- .env, existe um envroiment.env, alterar para .env
- Https se precisar ( use o https://certbot.eff.org/ para adquirir os sertificados pro seu dominio )

### Ambiente para Rodar o Projeto

- Voce vai precisar do Redis, Node, MongoDB e ReactJs instalado.
- Use npm i ou yarn i para instalar o as dependencias
- Crie um db NO MongoDB chamado roteirizador( as collections serão criadas automaticamente )
- Inicie o FrontEnd React, o projeto se encontra neste link: https://github.com/felipewget/roteirizador

### Iniciando o projeto

basta digitar nO Terminal/CMD <b>node app</b> ou <b>nodemon app</b> na raíz do projeto e irá rodar de acordo com a porta do .env, no caso, http://localhost:8080

### Observacōes e melhorias

- Usar WebSocket/GraphQL ao inves de Rest
