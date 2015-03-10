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
          if (e) {
            console.log(e);
            return;
          }
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.text.length).to.be.above(0);
          expect(JSON.parse(res.text)).to.eql(getBalance_testResponse);
          done();
        });
  });

});