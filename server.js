"use strict";

var express = require('express');
var app = express();
var logger = require('morgan');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

var port = process.env.port || 8080;
var serverProject = "DFT.01";

console.log('env', app.get('env'));
if (app.get('env') === 'test')
    // app.set('finance_db', './Databases/FinanzDb_Test.db3');
    app.set('finance_db', __dirname + '/Databases/FinanzDb_Test.db3');
else
    app.set('finance_db', __dirname + '/Databases/FinanzDb_Prod.db3');

var routes = require('./routes');
routes.finance.setup(app);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});


app.get('/finance/api/getBalances', routes.finance.api.getBalances);
app.get('/finance/api/getEntriesAll', routes.finance.api.getEntries);
app.get('/finance/api/getEntriesByAccount/:acc', routes.finance.api.getEntries);
app.get('/finance/api/getEntriesById/:id', routes.finance.api.getEntries);
app.get('/finance/api/getEntryById/:id', routes.finance.api.getEntry);

app.get('/finance/api/getAccounts', routes.finance.api.getAccounts);
app.get('/finance/api/getPartners', routes.finance.api.getPartners);
app.get('/finance/api/getCategories', routes.finance.api.getCategories);
app.get('/finance/api/getInfotypes', routes.finance.api.getInfotypes);

app.use(function (err, req, res, next) {
    var msg = 'invalid request / error occured: ' + err;
    console.log(msg);
    res.status(err.status || 500);
    res.send(msg);
});

app.listen(port);
console.log('database file for finance app used: ' + app.get('finance_db'));
console.log('Server (' + serverProject + ') is running at port ' + port + ' in mode ' + app.get('env'));

