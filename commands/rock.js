const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rock')
    .setDescription('rock')
    .addSubcommandGroup(s =>
        s
        .setName('paper')
        .setDescription('paper')
        .addSubcommand(s =>
            s
            .setName('scissors')
            .setDescription('Play Rock Paper Scissors game')
            .addUserOption(o =>
                o
                .setName('user')
                .setDescription('Provide a user to play with')
                .setRequired(true))))
}