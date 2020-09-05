let idif = (message, condition) => {
    if (condition) {
        return true;
    }
    return false;
}

let handleCommand = (ownId, message, commands) => {
    let unhandled = true;
    let pref = /^torn.{0,1}bot/i;
    if(pref.exec(message.content)) {
        unhandled = false;
        let response = '';
        switch(true){
            case message.content.replace(pref, '').trim().length === 0:
                response = "Yes?";
                break;
            case commands.askName.test(message.content):
                response = "I'm tornbot, you see?";
                break;
            case commands.askInvite.test(message.content):
                response = `https://discord.com/oauth2/authorize?client_id=${ownId}&scope=bot`;
                break;
            default:
                response = "404.";
                break;
        }
        message.channel.send(`@${message.author.username}, ${response}`);
    }
    return unhandled;
}

let handleMessage = (message, patterns, getGiph) => {
    let matched = false;
    patterns.forEach((pattern) => {
        if (pattern[0].test(message.content)) {
            console.log(`${new Date()} Matched ${pattern[0]} | ${message.author.username}: ${message.content}`);
            matched = true;
            getGiph(pattern[1], (giph) => message.channel.send(giph));
        }
    });
    return matched;
};

let getGiph = (giphy) => {
    return (query, handler) => {
        giphy.search({q:query, limit: 20}, (err,results) => {
            err && console.log(`${new Date()}: giphy error: ${err}`);
            const maxi = results.data.length - 1;
            let rndi = Math.floor(Math.random() * maxi);
            handler(results.data[rndi].embed_url);
        });
    }
};

exports.handleCommand = handleCommand;
exports.handleMessage = handleMessage;
exports.getGiph = getGiph;
exports.idif = idif;