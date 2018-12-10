// faz a requisição do controller para poder chamar as funções de acordo com as rotas
var userController = require('../controllers/userController');
var iotaController = require('../controllers/iotaController');

module.exports = function(app){

  //  rota principal
  app.get('/', function(req, res){
    //chama a função login do controller
    res.render('iotapay/login',{certo:'', msgErro:''});

  });

  app.post('/login', function(req, res){
    userController.login(req, res)
  });


  app.get('/singup', function(req, res){
    res.render('iotapay/singup', {erros:''});
  });


  app.post('/singup', function(req, res){
    userController.singup(req, res);
  });

  app.post('/edit/:id', function(req, res){
    userController.update(req, res);
  });

  app.get('/delete/:id/:idd', function(req, res){
    userController.delete(req, res);
  });

  app.get('/home/:id', function(req, res){
    userController.home(req, res);
  });

  app.get('/transactions/:id', function(req, res){
    iotaController.transactions(req, res);
  });

  app.get('/admin/:id', function(req, res){
    userController.admin(req, res);
  });

  app.post('/pay', function(req, res){
    iotaController.pay(req, res);
  });

  app.post('/exit', function(req, res){
    iotaController.exit(req, res);
  });



  //rota principal para quando recebe do tipo post "FORMULARIO", assim armazena no banco
  app.post('/', function(req, res){
    iotaController.pay(req, res);
  });

}
