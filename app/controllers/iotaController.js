var IOTA = require('iota.lib.js');
var iota = new IOTA({ provider: 'https://nodes.devnet.thetangle.org:443' });

var userModel = require('../models/userModel')();
var iotaModel = require('../models/iotaModel')();

module.exports.testServer = function(){

  iota.api.getNodeInfo((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log(success);
    }
  });

};

module.exports.pay = function(req, res){

  var seed = req.body['seed'];

  var message = iota.utils.toTrytes('Acessando o Estacionamento');

  var transfers = [
    {
      value: 0,
      address: req.body['adress'],
      message: message
    }
  ];

  iota.api.sendTransfer(seed, 3, 9, transfers, (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log(success);
      console.log('Hash da transação');
      console.log(success[0]['hash']);

      var tempo = req.body['valor']*30;

      var dados =
        {
          'hash'     : success[0]['hash'],
          'user_id'  : req.body['id'],
          'valor'    : req.body['valor'],
          'tempo'    : tempo,
          'tipo'    : 0
        };
        console.log(dados);

        iotaModel.save(dados, function(erro, result){
          if (!erro) {
            console.log('Adicionando transação ao BANCO DE DADOS');

            var update = {
              'status' : 2,
              'id'     : req.body['id']
            }
            userModel.updateStatus(update, function(er, up){
              if (!er) {
                console.log('Atualizando Status do Usuário');
                res.redirect('/transactions/'+req.body['id']);
              }else {
                console.log(er);
                console.log(up);
              }
            });
          }else {
            console.log(erro);
            console.log(result);
          }
        });
    }
  });

};

module.exports.exit = function(req, res){

  var seed = req.body['seed'];

  var message = iota.utils.toTrytes('Saindo do Estacionamento');

  var transfers = [
    {
      value: 0,
      address: req.body['adress'],
      message: message
    }
  ];

  iota.api.sendTransfer(seed, 3, 9, transfers, (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log(success);
      console.log('Hash da transação');
      console.log(success[0]['hash']);

      var tempo = 0;

      var dados =
        {
          'hash'     : success[0]['hash'],
          'user_id'  : req.body['id'],
          'valor'    : 0,
          'tempo'    : tempo,
          'tipo'    : 1
        };
        console.log(dados);

        iotaModel.save(dados, function(erro, result){
          if (!erro) {
            console.log('Adicionando transação de solicitação de saida ao BANCO DE DADOS');

            var update = {
              'status' : 1,
              'id'     : req.body['id']
            }
            userModel.updateStatus(update, function(er, up){
              if (!er) {
                console.log('Atualizando Status do Usuário');
                res.redirect('/transactions/'+req.body['id']);
              }else {
                console.log(er);
                console.log(up);
              }
            });
          }else {
            console.log(erro);
            console.log(result);
          }
        });
    }
  });

};

module.exports.saldo = function(seed){
  console.log('Retornando Saldo');
  iota.api.getAccountData(seed, function (erro, conta) {
     if (!erro) {
        return conta.balance;
     }
  })
};

module.exports.transactions = function(req, res){
  userModel.findUser(req.params.id, function(erro, result){
    if (result[0]  && !erro) {
      iotaModel.find(req.params.id, function(erro, transacoes){
        if (transacoes[0]  && !erro) {
          res.render('iotapay/transactions',{dados:result,transacoes:transacoes});
        }else {
          res.render('iotapay/transactions',{dados:result});
        }
      });
    }
  });
};
