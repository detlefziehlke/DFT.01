var superagent = require('superagent');
var expect = require('expect.js');

var testResponseData = require('../test.data/test.finance.api.data.js');
var getBalance_testResponse = testResponseData.getBalance_testResponse;
var url_pref = 'http://localhost:' + (process.env.port || 8080) + '/finance/api';

describe('express api server', function () {

  it('retrieve balances', function (done) {
    superagent.get(url_pref + '/getBalances')
        .buffer()
        .end(function (e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.text.length).to.be.above(0);
          expect(JSON.parse(res.text)).to.eql(getBalance_testResponse);
          done();
        });
  });

  var accId = testResponseData.getEntriesByAccount.ATUAccId;
  it('retrieve entries by account, Konto.Id=' + accId, function (done) {
    var url = url_pref + '/getEntries/' + accId;
    superagent.get(url)
        .buffer()
        .end(function (e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          var resData = JSON.parse(res.text);
          expect(resData.length).to.eql(testResponseData.getEntriesByAccount.ATUEntryCount);
          done();
        });
  });

  var accName = testResponseData.getEntriesByAccount.KasseAccName;
  it('retrieve entries by account, Konto.Name=' + accName, function (done) {
    var url = url_pref + '/getEntries/' + accName;
    superagent.get(url)
        .buffer()
        .end(function (e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          var resData = JSON.parse(res.text);
          expect(resData.length).to.eql(testResponseData.getEntriesByAccount.KasseEntryCount);
          done();
        });
  });

  it('retrieve all entries', function (done) {
    var url = url_pref + '/getEntries';
    superagent.get(url)
        .buffer(true)
        .end(function (e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          var resData = JSON.parse(res.text);
          expect(resData.length).to.eql(testResponseData.getAllEntries.NumberOfEntries);
          done();
        });
  });

});