// require dotenv
require("dotenv").config();
const fs = require("fs");
// require the needed discord.js classes
const { Client, Intents, Collection } = require("discord.js");

// create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { executeButtonInteraction } = require("./utils/buttonResponse");

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once("ready", () => {
  console.log("Ready!");
});

client.commands = new Collection();

// Set username

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// client.on('interactionCreate', );
client.on("interactionCreate", async (interaction) => {
  try {
    if (interaction.commandName === "buscar")
      await client.commands.get(interaction.commandName).execute(interaction);

    if (interaction.isButton()) executeButtonInteraction(interaction);
      
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

console.log(process.env.NODE_ENV);

client.login(
  `${
    process.env.NODE_ENV === "development"
      ? process.env.DISCORD_BETA_TOKEN
      : process.env.DISCORD_TOKEN
  }`
);
