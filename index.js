const Discord = require('discord.js');
const config = require('./config.json');
var giphy = require('giphy')('dc6zaTOxFJmzC');
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
        if(!lastTornt || lastTornt < (new Date() - tornLimit)) {
            if (pattern.exec(message)){
                message.channel.send(`Last torn: ${lastTornt || 'never'}`);
                let any_six = Math.floor(Math.random() * 5);
                giphy.search({q:"natalie imbruglia", api_key:"dc6zaTOxFJmzC"}, (_,results)=> {
                    message.channel.send(results.data[any_six].embed_url)
                });
                lastTornt = new Date();
            }
        }
    }
});