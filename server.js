"use strict";

var express = require('express');
var app = express();
var logger = require('morgan');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

var port = process.env.port || 8080;
var serverProject = "DFT.01";

if (app.get('env') === 'test')
  app.set('finance_db', './Databases/FinanzDb_Test.db3');
else
  app.set('finance_db', './Databases/FinanzDb_Prod.db3')

var routes = require('./routes');
routes.finance.setup(app);

app.get('/finance/api/getBalances', routes.finance.api.getBalances);

app.use(function (err, req, res, nexgt) {
  var msg = 'invalid request / error occured: ' + err;
  console.log(msg);
  res.status(err.status || 500);
  res.send(msg);
});

app.listen(port);
console.log('database file for finance app used: ' + app.get('finance_db'));
console.log('Server (' + serverProject + ') is running at port ' + port + ' in mode ' + app.get('env'));

