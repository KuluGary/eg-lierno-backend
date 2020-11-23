const discord = require('discord.js');
const config = require('../configs/config');

const discordClient = new discord.Client();
discordClient.login(config.discordBotToken);

function get_userid(username) {
    let user = discordClient.users.cache.find(user => user.tag == username);

    return user.id;    
}

module.exports = {
    get_userid
}