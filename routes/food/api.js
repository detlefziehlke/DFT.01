"use strict";

var knex;

exports.setup = function (app) {
    var filename = app.get('food_db');
    console.log('connecting to db', filename);
    knex = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: filename
        }
    });
};

exports.api = {

    getFood: function (req, res, next) {
        knex.select().table('food')
            .then(fetchRows(res))
            .catch(catchError(res, next))
    },

    getBomLink: function (req, res, next) {
        knex.select().table('bom_link')
            .then(fetchRows(res))
            .catch(catchError(res, next))
    },

    getUoq: function (req, res, next) {
        knex.select().table('unit_of_quantity')
            .then(fetchRows(res))
            .catch(catchError(res, next))
    },

    getFoodIntake: function (req, res, next) {
        knex.select().table('food_intake')
            .then(fetchRows(res))
            .catch(catchError(res, next))
    },

    getFoodIntakeAfterDate: function (req, res, next) {
        console.log('getFoodIntakeAfterDate');
        var dateFrom = req.params.date;
        knex.select().table('food_intake')
            .where('date', '>=', dateFrom)
            .then(fetchRows(res))
            .catch(catchError(res, next))
    }
/*
 var acc = req.params.acc;
 var where;
 if (isNaN(acc))
 where = {'Konto.Name': acc};
 else
 where = {'Konto.Id': acc};
 */


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