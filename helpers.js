let idif = (message, condition) => {
    if (condition) {
        return message;
    }
    return false;
}

let handleCommand = (message, commands) => {
    return message;
}

let handleMessage = (message, patterns, getGiph) => {
    let matched = false;
    patterns.forEach((pattern) => {
        if (pattern[0].exec(message.content)) {
            console.log(`${new Date()} Matched ${pattern[0]} | ${message.author.username}: ${message.content}`)
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
            let rndi = Math.floor(Math.random() * maxi)
            handler(results.data[rndi].embed_url);
        });
    }
};

exports.handleCommand = handleCommand;
exports.handleMessage = handleMessage;
exports.getGiph = getGiph;
exports.idif = idif;