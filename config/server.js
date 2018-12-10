
// cria a função para exportar todo o conteudo de criação do servidor
module.exports = function(){
  // realiza a requisição das bibliotecas
  var express = require('express');
  var bodyParser = require('body-parser');
  var expressValidator = require('express-validator');

  var app = express();

  // esta função diz ao express de qual pasta estara os arquivos js e css externos
  app.use(express.static('./app/public'));
  // diz a variavel app que será utilizado o motor de views EJS

  app.set('view engine', 'ejs');
  // diz em que pasta está as views
  app.set('views', './app/views');

  app.use(bodyParser.json()); //Para poder usar o JSON
  app.use(bodyParser.urlencoded({ extended: true })); //para poder usar o bodies encoded

  app.use(expressValidator()); //validar os dados


  // realiza a requisição do arquivo de rotas
  require('../app/routes/web')(app);

  //inicia o servidor
  app.listen(5000, function(){
      console.log("SERVIDOR DA APLICAÇÂO INICIALIZADO");
  });

};
