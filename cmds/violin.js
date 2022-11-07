const { SlashCommandBuilder } = require("discord.js");
const voice = require("@discordjs/voice");
const fs = require('node:fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("violin")
    .setDescription("play sad violin in current vc"),
  async execute(interaction, client, config) {
    let msg = interaction;
    if (!msg.member.voice.channel)
      return msg.reply("You must be in a voice channel to do that!");

    await msg.deferReply({ ephemeral: true });

    const channelID = msg.member.voice.channelId;
    const Channel = client.channels.cache.get(channelID);

    const player = voice.createAudioPlayer();

    const connection = voice.joinVoiceChannel({
      channelId: channelID,
      guildId: Channel.guild.id,
      adapterCreator: Channel.guild.voiceAdapterCreator,
    });

    let dir = "./resources";
    let files = fs.readdirSync(dir);
    let randomFile = files[Math.floor(Math.random() * files.length)];

    const resource = voice.createAudioResource(`./resources/${randomFile}`);
    player.play(resource);

    connection.subscribe(player);

    player.on("error", (error) => {
      console.error(
        `Error: ${error.message} with resource ${error.resource.metadata.title}`
      );
      player.stop();
    });

    player.on(voice.AudioPlayerStatus.Idle, async () => {
      player.stop();
    });

    msg.editReply("YES");
  },
};
