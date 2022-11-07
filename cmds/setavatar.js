const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setavatar")
    .setDescription("set the bots avatar")
    .addAttachmentOption((option) =>
      option
        .setName("avatar")
        .setDescription("The avatar to set")
        .setRequired(true)
    ),
  async execute(interaction, client, config) {
    if (![
      "686680792348622856",
      "463119138500378624",
      "458353546006495232"
    ].includes(interaction.user.id))
      return interaction.reply("You cant do that!");
    let msg = interaction;
    const avatar = interaction.options.getAttachment("avatar");
    if (avatar.width && avatar.height) {
      await interaction.client.user.setAvatar(avatar.url);
      await interaction.reply('Avatar set!');
  } else {
      await interaction.reply('That\'s not a valid image!');
  }
  },
};
