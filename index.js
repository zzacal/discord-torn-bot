//configuration
const tornLimit = config.limit; // 60 second limit
const discord_token = config.token;
const giphy_key = config.giphy_key;

const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
var giphy = require('giphy')(giphy_key);
const pattern = new RegExp(/torn/i);
var lastTornt = null;

client.once('ready', () => {
	console.log('Ready!');
});

client.login(discord_token);

client.on('message', message => {
    if(message.author.id != client.user.id){
        if(!lastTornt || lastTornt < (new Date() - tornLimit)) {
            if (pattern.exec(message)){
                let any_six = Math.floor(Math.random() * 5);
                giphy.search({q:"imbruglia"}, (_,results)=> {
                    message.channel.send(results.data[any_six].embed_url)
                });
                lastTornt = new Date();
            }
        }
    }
});