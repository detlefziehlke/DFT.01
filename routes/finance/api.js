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
  },

  getEntriesByAccount: function (req, res, next) {
    var acc = req.params.acc;
    var where = {};
    if (acc)
      where = isNaN(acc) ? {'konto_name': acc} : {'konto_id': acc};

    knex.select().table('konto_buchungen_komplett')
        .where(where)
        .then(fetchRows(res))
        .catch(catchError(res, next))
  },

  getEntriesByAccount_: function (req, res, next) {
    var acc = req.params.acc;
    var where;
    if (isNaN(acc))
      where = {'Konto.Name': acc};
    else
      where = {'Konto.Id': acc};

    var columns = [
      'Buchung.Id as buchung_id',
      'Datum as datum',
      'Betrag as betrag',
      'Memo as memo',
      'Konto.Id as konto_id',
      'Konto.Name as konto_name',
      knex.raw('coalesce(Empfaenger.Id,-1) as empfaenger_id'),
      knex.raw('coalesce(Empfaenger.Name,"*** no emp ***") as empfaenger_name'),
      knex.raw('coalesce(Kategorie.Id,-1) as kategorie_id'),
      knex.raw('coalesce(Kategorie.Name,"*** no cat ***") as kategorie_name')
    ];

    var x = knex
        .select(columns)
        .table('Konto')

        .innerJoin('Buchung', 'Konto.Id', 'Buchung.KontoId')
        .leftJoin('Empfaenger', 'Empfaenger.Id', 'Buchung.EmpfaengerId')
        .leftJoin('Kategorie', 'Kategorie.Id', 'Buchung.KategorieId')

        .where(where)

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
      res.writeHead(200, {"Content-Type": "application/json"});
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