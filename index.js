const keepAlive = require(`./server`);
keepAlive();
const { REST, Routes, Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { Guilds, GuildMessages, GuildMembers, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, GuildMembers, MessageContent] });
const fs = require('node:fs');
const chalk = require('chalk')
const { bot, minigame } = require('./config.json')

client.on('interactionCreate', (interaction) => {
    const { TwoZeroFourEight, Connect4, FindEmoji, Hangman, Minesweeper, RockPaperScissors, Snake, TicTacToe, Trivia, Wordle, WouldYouRather } = require('discord-gamecord');
    if(interaction.commandName == '2048') {
        const Game = new TwoZeroFourEight({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '2048',
              color: minigame.embedColor
            },
            emojis: {
              up: '⬆️',
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {

            const embed = new EmbedBuilder()
            .setColor(minigame.embedColor)
            .setTitle('Game Result')
            .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
            .setDescription(`**User**: <@${result.player.id}>`)
            .addFields(
                { name: 'Result', value: `${result.result}`, inline: true },
                { name: 'Score', value: `${result.score}`, inline: true },
            )

            interaction.channel.send({ embeds: [embed] })
          });
    }
    
    if(interaction.commandName == 'connect') {
        const Game = new Connect4({
            message: interaction,
            isSlashGame: true,
            opponent: interaction.options.getUser('user'),
            embed: {
              title: 'Connect 4 Game',
              statusTitle: 'Status',
              color: minigame.embedColor
            },
            emojis: {
              board: '⚪',
              player1: '🔴',
              player2: '🟡'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            turnMessage: '{emoji} | Its turn of player **{player}**.',
            winMessage: '{emoji} | **{player}** won the Connect4 Game.',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            interaction.channel.send(`<@${result.winner}> won the game in the match of <@${result.player.id}> v/s <@${result.opponent.id}>`)
          });
    }

    if(interaction.commandName == 'find') {
        const Game = new FindEmoji({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Find Emoji',
              color: minigame.embedColor,
              description: 'Remember the emojis from the board below.',
              findDescription: 'Find the {emoji} emoji before the time runs out.'
            },
            timeoutTime: 60000,
            hideEmojiTime: 5000,
            buttonStyle: 'PRIMARY',
            emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
            winMessage: 'You won! You selected the correct emoji. {emoji}',
            loseMessage: 'You lost! You selected the wrong emoji. {emoji}',
            timeoutMessage: 'You lost! You ran out of time. The emoji is {emoji}',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            if(result.result == 'lose') {
                interaction.channel.send(`<@${result.player.id}> you lost! The emoji was ${result.correctEmoji}, but you picked ${result.selectedEmoji}`)
            }
            if(result.result == 'win') {
                interaction.channel.send(`<@${result.player.id}> you won! You picked the emoji correctly.`)
            }
          });
    }

    if(interaction.commandName == 'hangman') {
        const category = ['nature', 'sport', 'color', 'camp', 'fruit', 'discord', 'winter', 'pokemon'];
        const random = Math.floor(Math.random() * category.length);

        const Game = new Hangman({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Hangman',
              color: minigame.embedColor
            },
            hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
            // customWord: 'subscribe',
            timeoutTime: 60000,
            theme: category[random],
            winMessage: 'You won! The word was **{word}**.',
            loseMessage: 'You lost! The word was **{word}**.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
    }

    if(interaction.commandName == 'minesweeper') {
        const Game = new Minesweeper({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Minesweeper',
              color: minigame.embedColor,
              description: 'Click on the buttons to reveal the blocks except mines.'
            },
            emojis: { flag: '🚩', mine: '💣' },
            mines: 5,
            timeoutTime: 60000,
            winMessage: 'You won the Game! You successfully avoided all the mines.',
            loseMessage: 'You lost the Game! Beaware of the mines next time.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
    }

    if(interaction.commandName == 'rock') {
        const Game = new RockPaperScissors({
            message: interaction,
            isSlashGame: true,
            opponent: interaction.options.getUser('user'),
            embed: {
              title: 'Rock Paper Scissors',
              color: minigame.embedColor,
              description: 'Press a button below to make a choice.'
            },
            buttons: {
              rock: 'Rock',
              paper: 'Paper',
              scissors: 'Scissors'
            },
            emojis: {
              rock: '🌑',
              paper: '📰',
              scissors: '✂️'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            pickMessage: 'You choose {emoji}.',
            winMessage: '**{player}** won the Game! Congratulations!',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
          });
          
          Game.startGame();
    }

    if(interaction.commandName == 'snake') {
        const Game = new Snake({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Snake Game',
              overTitle: 'Game Over',
              color: minigame.embedColor
            },
            emojis: {
              board: '⬛',
              food: '🍎',
              up: '⬆️', 
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
            foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
            stopButton: 'Stop',
            timeoutTime: 60000,
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });

          Game.startGame();
    }

	if(interaction.commandName == 'help') {
		const embed = new EmbedBuilder()
		.setColor(minigame.embedColor)
		.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })
		.setTitle(`${client.user.username} Minigames`)
		.setDescription(`Get entertained by some minigames provided by **${client.user.username}**. This bot contains over 10+ minigames and it is user-friendly for beginners. You can also play minigames with your discord friends too!`)
		.addFields(
			{ name: 'Commands', value: '`2048`, `connect 4`, `find the emoji`, `hangman`, `minesweeper`,`rock paper scissors`, `snake`, `tic tac toe`, `trivia`, `wordle`, `would you rather`' }
		)
		.setTimestamp()

		interaction.reply({ embeds: [embed] })
	}

    if(interaction.commandName == 'tic') {
        const Game = new TicTacToe({
            message: interaction,
            isSlashGame: true,
            opponent: interaction.options.getUser('user'),
            embed: {
              title: 'Tic Tac Toe',
              color: minigame.embedColor,
              statusTitle: 'Status',
              overTitle: 'Game Over'
            },
            emojis: {
              xButton: '❌',
              oButton: '🔵',
              blankButton: '➖'
            },
            mentionUser: true,
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '{emoji} | Its turn of player **{player}**.',
            winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
          });
          
          Game.startGame();
    }

    if(interaction.commandName == 'trivia') {
      const Game = new Trivia({
		message: interaction,
		isSlashGame: true,
        embed: {
          title: 'Trivia',
          color: minigame.embedColor,
          description: 'You have 60 seconds to guess the answer.'
        },
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        trueButtonStyle: 'SUCCESS',
        falseButtonStyle: 'DANGER',
        mode: 'multiple',  // multiple || single
        difficulty: 'medium',  // easy || medium || hard
        winMessage: 'You won! The correct answer is {answer}.',
        loseMessage: 'You lost! The correct answer is {answer}.',
        errMessage: 'Unable to fetch question data! Please try again.',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });

      Game.startGame();
    }

    if(interaction.commandName == 'wordle') {
      const Game = new Wordle({
		message: interaction,
		isSlashGame: true,
        embed: {
          title: 'Wordle',
          color: minigame.embedColor,
        },
        customWord: null,
        timeoutTime: 60000,
        winMessage: 'You won! The word was **{word}**.',
        loseMessage: 'You lost! The word was **{word}**.',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });
      
      Game.startGame();
    }

    if(interaction.commandName == 'would') {
		const Game = new WouldYouRather({
			message: interaction,
			isSlashGame: true,
			embed: {
			  title: 'Would You Rather',
			  color: minigame.embedColor,
			},
			buttons: {
			  option1: 'Option 1',
			  option2: 'Option 2',
			},
			timeoutTime: 60000,
			errMessage: 'Unable to fetch question data! Please try again.',
			playerOnlyMessage: 'Only {player} can use these buttons.'
		  });
		  
		  Game.startGame();
    }
})

client.on('ready', (client) => {
    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }
    
    const rest = new REST({ version: '10' }).setToken(process.env.token);
    
    (async () => {
        try {
            const data = await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    })();
});

client.on('ready', (client) => {
    console.log(
        `🔆  [` +
        chalk.yellow.bold(`Login`) +
        `]` + `      | ` + `Logged in as ` +
        chalk.green.bold(`${client.user.tag}`)
        );

    console.log(
        `🔆  [` +
        chalk.yellow.bold(`Invite`) +
        `]` + `     | ` + `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
        );

    console.log(
        `🔆  [` +
        chalk.yellow.bold(`Info`) +
        `]` + `       | ` + `Make sure to ` +
        chalk.red.bold('SUBSCRIBE') + ` to ` +
        chalk.white.bold('Itz') + chalk.red.bold('Nexus')
        );
});

process.on("unhandledRejection", (reason, p) => {

    console.log(chalk.gray("—————————————————————————————————"));
    console.log(
       chalk.white("["),
       chalk.red.bold("AntiCrash 1"),
       chalk.white("]"),
       chalk.gray(" : "),
       chalk.white.bold("Unhandled Rejection/Catch")
    );
    console.log(chalk.gray("—————————————————————————————————"));
    console.log(reason, p);
  
});
process.on("uncaughtException", (err, origin) => {

    console.log(chalk.gray("—————————————————————————————————"));
    console.log(
       chalk.white("["),
       chalk.red.bold("AntiCrash2"),
       chalk.white("]"),
       chalk.gray(" : "),
       chalk.white.bold("Uncaught Exception/Catch")
    );
    console.log(chalk.gray("—————————————————————————————————"));
    console.log(err, origin);
  
});

client.login(process.env.token);
require('./server')