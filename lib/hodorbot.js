'use-strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');

var HodorBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'hodorbot';
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
  if (this._isChatMessage(message) && this._isChannelConversation(message) && !this._isFromHodorBot(message) && this._isMentioningHodor(message)) {
    if (this._isSayCommand(message)) {
      console.log("Private message received!");
      this._say(message);
    }
    else {
      this._replyWithHodor(message);
    }
  }
};

HodorBot.prototype._isChatMessage = function(message) {
  return message.type === 'message' && Boolean(message.text);
};

HodorBot.prototype._isChannelConversation = function (message) {
    // return typeof message.channel === 'string' &&
    //     message.channel[0] === 'C';
    // console.log("Message Channel: " + message.channel);
    return true;
};

HodorBot.prototype._isFromHodorBot = function (message) {
    var userList = this.getUsers();
    var myID;
    for (var i = 0; i < userList._value.members.length; i++) {
      if (userList._value.members[i].name === 'hodor') {
        myID = userList._value.members[i].id;
      }
    }
    return message.user === myID;
};

HodorBot.prototype._isSayCommand = function (message) {
  var isPM = (message.channel.charAt(0) == "D" ? true : false);
  var isSay = (message.text.indexOf("say") > -1 ? true : false);
  return isPM && isSay;
};

HodorBot.prototype._say = function (message) {
  newMessage = message.text.substring(10);
  var self = this;
  // console.log(message);
  self.postMessage("#dsc-all", newMessage, {as_user: true}); // ;)
}

HodorBot.prototype._isMentioningHodor = function (message) {
    return message.text.toLowerCase().indexOf('hodor') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};

HodorBot.prototype._replyWithHodor = function(message) {
  var self = this;
  // var channel = self._getChannelById(message.channel);
  var channel = message.channel;
  var response = hodor();
  console.log("Incoming message from: " + message.user);
  console.log("Incoming channel: " + channel);
  console.log("Responding with: " + response);
  self.postMessage(channel, response, {as_user: true});
};

function hodor() {
  var r1 = ['', '...'];
  var r2 = "Hodor";
  var r3 = ['', '!', '.', '...', '?'];
  return r1[Math.floor(Math.random() * r1.length)] + r2 + r3[Math.floor(Math.random() * r3.length)];
};
