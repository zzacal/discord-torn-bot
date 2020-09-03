//configuration
const config = require('./config.json');
const tornLimit = config.testOnly ? 5000 : config.limit;
const discord_token = config.token;
const giphy_key = config.giphy_key;
const testOnly = config.testOnly;

const Discord = require('discord.js');
const client = new Discord.Client();
var giphy = require('giphy')(giphy_key);
const pattern = new RegExp(/torn/i);
var lastTornt = null;

client.once('ready', () => {
    console.log('ready!');
    console.log(`test mode: ${testOnly}`)
});

client.login(discord_token);

client.on('message', message => {
    if(message.author.id != client.user.id){
        if(!lastTornt || lastTornt < (new Date() - tornLimit)) {
            var handled = handleMessage(message);
            lastTornt = handled ? new Date() : handled;
        }
    }
});

let handleMessage = (message) => {
    let matched = false;
    patterns.forEach((pattern) => {
        if(pattern[0].exec(message)) {
            matched = true;
            let any_six = Math.floor(Math.random() * 5);
            giphy.search({q:pattern[1]}, (_,results)=> {
                let giph = results.data[any_six].embed_url;
                console.log(giph);
                if(!testOnly)
                    message.channel.send(giph);
            });
        }
    });
    return matched;
}

const patterns = [
    [new RegExp(/natalie/i), "imbruglia"],
    [new RegExp(/rickroll/i), "rickroll"],
    [new RegExp(/give you up/i), "rickroll"]
]