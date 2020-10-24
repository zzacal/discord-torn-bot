//configuration
const discord_token = process.env.DISCORD_TOKEN;
const giphyKey = process.env.GIPHY_KEY;
const tornLimit = process.env.TORN_LIMIT || 5000;

const commands = require('./commands').commands;
const patterns = require('./patterns').patterns;
const helpers = require('./helpers');
const Discord = require('discord.js');
const pipeline = require('./pipeline');
const client = new Discord.Client();
var giphy = require('giphy')(giphyKey);
var lastTornt = null;

client.once('ready', () => {
    console.log('ready!');
    console.log(`commands:`);
    console.log(commands);
    console.log(`pattern:`);
    console.log(patterns);
});

client.login(discord_token);

client.on('message', message => {
    let stages = []; // add stages to this pipeline
    stages.push(() => helpers.idif(message, message.author.id != client.user.id)); // ignore message if comes from this bot
    stages.push(() => helpers.handleCommand(client.user.id, message, commands)); // handle commands
    stages.push(() => helpers.idif(message, !lastTornt || lastTornt < (new Date() - tornLimit))); // ignore message if tornt to recently
    stages.push(() => helpers.handleMessage(message, patterns, helpers.getGiph(giphy))); // handle message
    var success = pipeline.process(stages);
    lastTornt = !success ? lastTornt : new Date();
});
