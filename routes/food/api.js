"use strict";

var knex;

exports.setup = function (app) {
    var filename = app.get('food_db');
    console.log('connecting to db', filename);
    knex = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: filename
        },
        useNullAsDefault: true
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
        let args_from = [true];
        let args_to = [true];

        if (req.query.from) {
            if (req.query.from.length == 10)
                req.query.from += ' 00:00:00.000';
            args_from = ['date', '>=', req.query.from]
        }
        if (req.query.to) {
            if (req.query.to.length == 10)
                req.query.to += ' 00:00:00.000';
            args_to = ['date', '<=', req.query.to]
        }

        knex.select().table('food_intake')
            .where(...args_from)
            .andWhere(...args_to)
            .then(fetchRows(res))
            .catch(catchError(res, next))
    },

    insertFoodIntakes: function (req, res, next) {
        var data = req.body;
        knex('food_intake')
            .insert(data)
            .catch(catchError(res, next))

        knex.raw('select last_insert_rowid() as id')
            .then(function (resp) {
                data.id = resp[0]['id'];
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(data));
            })
            .catch(catchError(res, next));
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