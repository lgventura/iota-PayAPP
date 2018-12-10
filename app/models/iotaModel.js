var db = require('../../config/db');

module.exports = function(){

  this.all = function(callback){
    // no model recebe a função como parametro
    var con = db();

    // realiza a conexao com o banco de dados faz a consulta e exacuta a função pela variavel callback
    // retornando os resultados exibindo na page
    return con.query('select * from user', callback);
  };

  this.find = function(id, callback){
    var con = db();
    return con.query('SELECT * FROM transacoes where user_id = ? ORDER BY id DESC', id, callback);
  }

  this.save = function(dados, callback){
      var con = db();
      return con.query('INSERT INTO transacoes set ?', dados, callback);
  };
  return this;

};
