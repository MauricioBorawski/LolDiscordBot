// require dotenv
require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

const token = process.env.NODE_ENV === "development" ? process.env.DISCORD_BETA_TOKEN : process.env.DISCORD_TOKEN;
const userId = process.env.NODE_ENV === "development" ? process.env.USER_ID_BETA : process.env.USER_ID;

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(
  // Check prod or dev
  `${token}`
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        `${userId}`,
        `${process.env.GUILD_ID}`
      ),
      //body: format JSON
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
