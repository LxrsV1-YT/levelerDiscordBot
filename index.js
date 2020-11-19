const Discord = require('discord.js');
const botConfig = require("./botconfig.json");
const prefix = botConfig.prefix;
const fs = require("fs");
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const chalk = require('chalk');
const levelFile = require("./data/levels.json");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./command/", (err, files) => {
    if(err) console.log(err);
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <=0){
        console.log('Unable to find files');
        return;
    }
    jsFiles.forEach((f, i) =>{
        var fileGet = require(`./command/${f}`);
        console.log(chalk.cyan(`${f}`), chalk.blue(`loaded without any erros!`));
        bot.commands.set(fileGet.help.name, fileGet);

        fileGet.help.aliases.forEach(alias => {
            bot.aliases.set(alias, fileGet.help.name);
        })
    });
});

bot.on('ready', () => {
    console.log(chalk.red(`--==[GENERAL INFORMATION]==--`));
    console.log(chalk.yellow(`Prefix:`), chalk.magenta(`${prefix}`));
    console.log(chalk.yellow(`Bot name:`), chalk.magenta(`${bot.user.tag}`));
    console.log(chalk.yellow(`Bot status:`), chalk.magenta(`Online`));
    console.log(chalk.yellow("Staus:"), chalk.magenta(`${prefix}help || https://bit.ly/inviteLeveler`), chalk.green("{"), chalk.white(`type:`), chalk.green(`("PLAYING"})`));
    console.log(chalk.bgMagentaBright("No erros found!"))
    bot.user.setActivity(`${prefix}help || https://bit.ly/inviteLeveler`, {type: "PLAYING"});
});



bot.on("message", async message =>{
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return message.author.send("You cannot type a command in my DM's!");
    var prefix = botConfig.prefix;
    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    RandomXP(message);
    if(!message.content.startsWith(prefix)) return;
    var arguments = messageArray.slice(1);
    var commands = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
    if(commands) commands.run(bot, message, arguments)
});


function RandomXP(message){
    var randomNumber = Math.floor(Math.random() * 30) + 1; //how lower the first number => how longer to chat until new level
    var idUser = message.author.id;
    if(!levelFile[idUser]){
        levelFile[idUser] = {
            xp: 0,
            level: 0
        }
    }
    levelFile[idUser].xp += randomNumber;
    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;
    var nextLevelXp = levelUser * 300; //xp needed for level up (every level times the amount of xp needed)
    if(nextLevelXp == 0) nextLevelXp = 100;
    if(xpUser >= nextLevelXp){
        levelFile[idUser].level += 1;
        var embedLevel = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription("LEVEL UP!")
        .addField("New level:", levelFile[idUser].level)
        message.channel.send(embedLevel);
    }
    fs.writeFile("./data/levels.json", JSON.stringify(levelFile), err =>{
        if(err) console.log(err);
    });
}

bot.login(process.env.token);