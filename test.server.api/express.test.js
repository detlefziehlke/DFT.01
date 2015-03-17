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

    var accId = testResponseData.getEntries.ATUAccId;
    it('retrieve entries by account, Konto.Id=' + accId, function (done) {
        var url = url_pref + '/getEntriesByAccount/' + accId;
        superagent.get(url)
            .buffer()
            .end(function (e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                var resData = JSON.parse(res.text);
                expect(resData.length).to.eql(testResponseData.getEntries.ATUEntryCount);
                done();
            });
    });

    var accName = testResponseData.getEntries.KasseAccName;
    it('retrieve entries by account, Konto.Name=' + accName, function (done) {
        var url = url_pref + '/getEntriesByAccount/' + accName;
        superagent.get(url)
            .buffer()
            .end(function (e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                var resData = JSON.parse(res.text);
                expect(resData.length).to.eql(testResponseData.getEntries.KasseEntryCount);
                done();
            });
    });

    var entryId = testResponseData.getEntries.Id;
    it('retrieve an entries by id, Buchung.Id=' + entryId, function (done) {
        var url = url_pref + '/getEntriesById/' + entryId;
        superagent.get(url)
            .buffer()
            .end(function (e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                var resData = JSON.parse(res.text);
                expect(resData.length).to.eql(1);
                expect(resData[0].betrag).to.eql(testResponseData.getEntries.Betrag);
                done();
            });
    });

    var entryId2 = testResponseData.getEntries.Id2;
    var counterId = testResponseData.getEntries.CounterId;
    var memo = '';
    var betrag;
    it('retrieve entries with counterentry ' + entryId2 + ' / ' + counterId, function (done) {
        var url = url_pref + '/getEntriesById/' + entryId2;
        superagent.get(url)
            .buffer()
            .end(function (e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                var resData = JSON.parse(res.text);
                expect(resData.length).to.eql(1);
                memo = resData[0].memo;
                betrag = resData[0].betrag;
                superagent.get(url)
                    .buffer()
                    .end(function (e, res) {
                        expect(e).to.eql(null);
                        expect(typeof res.body).to.eql('object');
                        var resData = JSON.parse(res.text);
                        expect(resData.length).to.eql(1);
                        expect(resData[0].memo).to.eql(memo);
                        expect(resData[0].betrag).to.eql(-betrag);
                        done();
                    });
            });
        url = url_pref + '/getEntriesById/' + counterId;
    });

    it('retrieve all entries', function (done) {
        var url = url_pref + '/getEntriesAll';
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