const Discord = require('discord.js');
const levelFile = require("../data/levels.json");


module.exports.run = async (bot, message, args) => {
    var idUser = message.author.id;
    if(!levelFile[idUser]){
        levelFile[idUser] ={
            xp: 0,
            level: 0
        }
    }
    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;
    var nextLevelXp = levelUser * 300;

    var whenNextLevel = nextLevelXp - xpUser;
    var embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.author.username}'s levels:`)
    .addField(`Level: `, `${levelUser}`, true)
    .addField(`XP`, `${xpUser}`, true)
    .addField(`Server:`, `${message.guild.name}`)
    .setFooter(`${whenNextLevel} xp until you have reached next level!`, message.author.displayAvatarURL)
    .setDescription(`***__all xp is from all servers the bot is in!__***`)
    .setTimestamp();

    message.channel.send(embed);

}
module.exports.help = {
    name: "level",
    description: "",
    category: "",
    aliases: ["rank"]
}