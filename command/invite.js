const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("Invite me by click this!")
    .setURL("https://bit.ly/inviteLeveler");
    message.channel.send(embed);
}
module.exports.help = {
    name: "invite",
    description: "Checks if the bot is online",
    category: "support commands",
    aliases: []
}