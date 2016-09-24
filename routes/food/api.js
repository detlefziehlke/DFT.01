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