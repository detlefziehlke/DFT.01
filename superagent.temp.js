"use strict";
var superagent = require('superagent');
var url_pref = 'http://localhost:' + (process.env.port || 8080) + '/finance/api';

superagent.get(url_pref + '/getEntries/2')
    .buffer(true)
    .end(function (e, res) {
      if (e) {
        console.log(e);
        return;
      }
      console.log(res.text);
      var resText = JSON.parse(res.text);

      console.log('superagent: ' + resText.length);
      console.log(resText);
    });