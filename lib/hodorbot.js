# lib/hodorbot.js

'use-strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');

var HodorBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'hodorbot';
    this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'hodorbot.db');

    this.user = null;
    this.db = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(HodorBot, Bot);

module.exports = HodorBot;

HodorBot.prototype.run = function () {
    HodorBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

HodorBot.prototype._onStart = function() {
  this._loadBotUser();
};

HodorBot.prototype._loadBotUser = function() {
  var self = this;
  this.user = this.users.filter(function(user) {
    return user.name === self.name;
  })[0];
};

HodorBot.prototype._onMessage = function(message) {
  if (this._isChatMessage(message) &&
      this._isChannelConversation(message) &&
      !this._isFromHodoBot(message) &&
      this._isMentioningHodor(message))
      {
        this._replyWithHodor(message);
      }
};

HodorBot.prototype._isChatMessage = function(message) {
  return message.type === 'message' && Boolean(message.text);
};

HodorBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

HodorBot.prototype._isFromHodorBot = function (message) {
    return message.user === this.user.id;
};

HodorBot.prototype._isMentioningHodor = function (message) {
    return message.text.toLowerCase().indexOf('hodor') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};

HodorBot.prototype._replyWithHodor = function(message) {
  var self = this;
  var channel = self._getChannelByID(originalMessage.channel);
  var response = 'Hodor!';
  self.postMessageToChannel(channel.name, response, {as_user: true});
};

HodorBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};