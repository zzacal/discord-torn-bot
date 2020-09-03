let handleMessage = (message, patterns, getGiph) => {
    let matched = false;
    patterns.forEach((pattern) => {
        if(pattern[0].exec(message)) {
            matched = true;
            getGiph(pattern[1], (giph) => message.channel.send(giph));
        }
    });
    return matched ? message : null;
};

let getGiph = (giphy) => {
    return (query, handler) => {
        giphy.search({q:query, limit: 20}, (err,results) => {
            err && console.log(err);
            const maxi = results.data.length - 1;
            let rndi = Math.floor(Math.random() * maxi)
            handler(results.data[rndi].embed_url);
        });
    }
};

exports.handleMessage = handleMessage;
exports.getGiph = getGiph;