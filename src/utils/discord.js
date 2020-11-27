const discord = require('discord.js');

const discordClient = new discord.Client();

discordClient.login(process.env.DISCORD_TOKEN);
function get_userid(username) {
    let user = discordClient.users.cache.find(user => user.tag == username);

    return user.id;    
}

module.exports = {
    get_userid
}