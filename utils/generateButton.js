const { MessageActionRow, MessageButton } = require("discord.js");

const generateNewButton = (status_code, label) =>
  new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("primary")
      .setLabel(label)
      .setStyle("PRIMARY")
      .setDisabled(false)
      .setCustomId('live_game')
  );

module.exports = generateNewButton;
