"use strict";

var knex;

exports.setup = function (app) {
  knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: app.get('finance_db')
    }
  });
};

exports.api = {

  getBalances: function (req, res, next) {
    knex.select().table('konto_salden')
        .then(fetchRows(res))
        .catch(catchError(res, next))
  }
}


// -------------------------------------------
// universal promise responses to knex queries
// -------------------------------------------

var fetchRows = function (res, trans) {
  return function (rows) {
    if (trans)
      rows = trans(rows);
    if (rows) {
      res.end(JSON.stringify(rows));
    }
  }
};

var catchError = function (res, next) {
  return function (err) {
    if (err) {
      return next(err);
    }
  }
};