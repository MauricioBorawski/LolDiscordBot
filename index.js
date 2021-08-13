// require dotenv
require('dotenv').config();
// require the needed discord.js classes
const { Client, Intents } = require('discord.js');


// create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// client.on('interactionCreate', );

client.login(`${process.env.DISCORD_TOKEN}`);
