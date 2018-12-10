var db = require('../../config/db');

module.exports = function(callback){

    var con = db();

    return con.query('SELECT endereco FROM raspberry WHERE id = 1', callback);

};
