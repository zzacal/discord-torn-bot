const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const pattern = new RegExp(/torn/i);
const tornLimit = 5000 // 5 second limit
var lastTornt = null;

client.once('ready', () => {
	console.log('Ready!');
});

client.login(config.token);

client.on('message', message => {
    if(message.author.id != client.user.id){
        if(!lastTornt || lastTornt < (new Date() - tornLimit) && pattern.exec(message)) {
            message.channel.send(`Last torn: ${lastTornt || 'never'}`);
            message.channel.send('https://giphy.com/gifs/quQ5pJEjeZwTm');
            lastTornt = new Date();
        }
    }
});