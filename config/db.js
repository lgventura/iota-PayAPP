//faz a requisição da biblioteca Mysql

var mysql = require('mysql');

var con = function (){
    return mysql.createConnection({
          host:     'localhost',
          user:     'root',
          password: '5598',
          database: 'iotaDB'
    });
};

// exporta a conexão com o BD
module.exports = con;
