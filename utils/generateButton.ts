import { MessageActionRow, MessageButton} from 'discord.js';

export const generateNewButton = (status_code, label) =>
  new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("primary")
      .setLabel(label)
      .setStyle("PRIMARY")
      .setDisabled(status_code !== 200)
      .setCustomId("live_game")
  );