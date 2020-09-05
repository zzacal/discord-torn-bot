const commands = {
    askName: new RegExp(/what'{0,1}s your name/i),
    askInvite: new RegExp(/how.*invite.*you/i)
};

exports.commands = commands;