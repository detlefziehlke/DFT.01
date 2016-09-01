#Start des Servers am Terminal
1. Positionieren auf Proj. Verz., z.Zt. 
`/Users/detlefziehlke/WebstormProjects/Archiv/DettiFinanceTools/DFT.01`
2. Einstellen Mode:

    `$ export NODE_ENV=test` 
    
2. Starten Server:   

    `$ node server.js` 

### Code Beispiel
 
`     var express = require('express');
     var app = express();
     var logger = require('morgan');
     
     var bodyParser = require('body-parser');
     app.use(bodyParser.urlencoded({extended: true}));
     app.use(logger('dev'));
     
     var port = process.env.port || 8080;
     var serverProject = "DFT.01";`