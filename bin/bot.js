'use strict';

var HodorBot = require('../lib/hodorbot');

var token = process.env.BOT_API_KEY;
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;

var norrisbot = new HodorBot({
    token: token,
    dbPath: dbPath,
    name: name
});

norrisbot.run();
