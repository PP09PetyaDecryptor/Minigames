const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('connect')
    .setDescription('Play Connect 4 with friend')
    .addSubcommand(s =>
        s
        .setName('4')
        .setDescription('Play Connect 4 with friends')
        .addUserOption(o =>
            o
            .setName('user')
            .setDescription('Provide an opponent to play with')
            .setRequired(true)))
}