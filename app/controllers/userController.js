var userModel
= require('../models/userModel')();
var raspEndereco = require('../models/raspberryModel');
var iota = require('./iotaController');


module.exports.login = function(req, res){
  var email = req.body.email;
  var senha = req.body.senha;
  var endereco;
    userModel.findByEmail(email, function(erro, result){

      if (result[0]  && !erro) {
        if (result[0]['senha'] == senha) {
            if(result[0]['status'] != 3){
              raspEndereco(function(erro, endereco){
                if (endereco[0]  && !erro) {
                  if (result[0]['acesso'] == 2) {
                    userModel.users(function(erro, users){
                      if (users[0]  && !erro) {
                        res.render('iotapay/admin',{dados:result, endereco:endereco, users:users });
                      }
                    });
                  }else {
                    res.render('iotapay/home',{dados:result, endereco:endereco});
                  }
                }
              });
            }else {
              msgErro = "Usuário bloqueado";
              res.render('iotapay/login',{certo:null, msgErro:msgErro});
            }

        }else {
          msgErro = "E-mail e/ou senha incorreto(s)";
          res.render('iotapay/login',{certo:null, msgErro:msgErro});
        }

      }else {
        msgErro = "E-mail e/ou senha incorreto(s)";
        res.render('iotapay/login',{certo:null, msgErro:msgErro});
      }
    });

};

module.exports.singup = function(req, res){
  //Pegando os dados do formulário
  var dados =
    {
      'nome' : req.body['nome'],
      'email': req.body['email'],
      'seed' : req.body['seed'],
      'senha': req.body['password']
    };

  req.assert('seed', 'A SEED deve ter exatamente 81 caracteres, podendo ter as letras de A-Z e apenas o algarismo 9').len(81, 81);

  var errosForm = req.validationErrors();
  if (errosForm) {
    console.log(errosForm);
    erro = 'A SEED deve ter exatamente 81 caracteres, podendo ter as letras de A-Z e apenas o algarismo 9';

    res.render('iotapay/singup',{erros:erro});

  }else {
    userModel.saveUsers(dados, function(erro, result){
      if (!erro) {
        certo = 'Cadastrado com sucesso, realize seu Login';
        res.render('iotapay/login', {certo:certo, msgErro:''});
      }else {
        msgErro = 'Erro ao cadastrar';
        console.log(msgErro);
        console.log(erro);
        console.log(result);

        res.render('iotapay/login', {msgErro:msgErro, certo:''});
      }
    });
  }
};

module.exports.update = function(req, res){
  //Pegando os dados do formulário
  var dados =
    {
      'status' : req.body['status'],
      'acesso' : req.body['acesso'],
      'id'     : req.body['id'],
    };

    userModel.update(dados, function(erro, result){
      if (!erro) {
        userModel.findUser(req.params.id, function(erro, result){
          if (result[0]  && !erro) {
            userModel.users(function(erro, users){
              if (users[0]  && !erro) {
                res.render('iotapay/admin',{dados:result, users:users });
              }
            });
          }
        });
      }
    });
};

module.exports.delete = function(req, res){
    userModel.delete(req.params.id, function(erro, result){
      if (!erro) {
        userModel.findUser(req.params.idd, function(erro, result){
          if (result[0] && !erro) {
            userModel.users(function(erro, users){
              if (users[0]  && !erro) {
                res.render('iotapay/admin',{dados:result, users:users });
              }
            });
          }
        });
      }
    });
};

module.exports.home = function(req, res){

  userModel.findUser(req.params.id, function(erro, result){
    if (result[0]  && !erro) {
      raspEndereco(function(erro, endereco){
        if (endereco[0]  && !erro) {
            res.render('iotapay/home',{dados:result, endereco:endereco});
        }
      });
    }
  });
};

module.exports.admin = function(req, res){
  userModel.findUser(req.params.id, function(erro, result){
    if (result[0]  && !erro) {
      userModel.users(function(erro, users){
        if (users[0]  && !erro) {
          res.render('iotapay/admin',{dados:result, users:users });
        }
      });
    }
  });
};
