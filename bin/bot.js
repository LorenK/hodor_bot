'use strict';

var HodorBot = require('../lib/hodorbot');

var token = process.env.BOT_API_KEY;
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;
var port = process.env.PORT;

var hodorbot = new HodorBot({
    token: token,
    dbPath: dbPath,
    name: name
});

hodorbot.run();
