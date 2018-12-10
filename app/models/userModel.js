var db = require('../../config/db');

module.exports = function(){

  this.users = function(callback){
    // no model recebe a função como parametro
    var con = db();

    // realiza a conexao com o banco de dados faz a consulta e exacuta a função pela variavel callback
    // retornando os resultados exibindo na page
    return con.query('select * from user', callback);
  };

  this.findUser = function(id, callback){
    var con = db();
    return con.query('select * from user where id = ?', id, callback);
  }

  this.findByEmail = function(email, callback){
    var con = db();
    return con.query('select * from user where email = ?', email, callback);
  }


  this.saveUsers = function(dados, callback){
      var con = db();
      return con.query('INSERT INTO user set ?', dados, callback);
  };

  this.update = function(update, callback){
      var con = db();
      return con.query('UPDATE user SET status = '+update['status']+', acesso = '+update['acesso']+' WHERE id ='+update['id'], update, callback);
  };

  this.updateStatus = function(update, callback){
      var con = db();
      return con.query('UPDATE user SET status = '+update['status']+ ' WHERE id = '+update['id'], update, callback);
  };

  this.delete = function(id, callback){
      var con = db();
      return con.query('DELETE FROM user WHERE id = ?',id, callback);
  };

  return this;

};
