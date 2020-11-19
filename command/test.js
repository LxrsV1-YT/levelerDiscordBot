const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    
    let msgEmbed = await message.channel.send(`Couldn't find errors in the code!`)
    msgEmbed.react('👍')
}
module.exports.help = {
    name: "test",
    description: "Checks if the bot is online",
    category: "support commands",
    aliases: []
}