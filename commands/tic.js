const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tic')
    .setDescription('tic')
    .addSubcommandGroup(s =>
        s
        .setName('tac')
        .setDescription('tac')
        .addSubcommand(s =>
            s
            .setName('toe')
            .setDescription('Play Tic Tac Toe game')
            .addUserOption(o =>
                o
                .setName('user')
                .setDescription('Provide a user to play with')
                .setRequired(true))))
}