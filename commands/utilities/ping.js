const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot\'s latency!'),

    async execute(interaction) {
        await interaction.reply({ content: 'Pinging...' });

        const sent = await interaction.fetchReply();
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiPing = interaction.client.ws.ping;

        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setColor(0x00FF00)
            .addFields(
                { name: 'Bot Latency', value: `${latency}ms`, inline: true },
                { name: 'API Latency', value: `${apiPing}ms`, inline: true }
            )
            .setAuthor({
                name: 'alpha007-cmd',
                url: 'https://github.com/alpha007-cmd',
                iconURL: 'https://media.discordapp.net/attachments/1274024397170151496/1367940345903579268/alpha.png?ex=68166939&is=681517b9&hm=dc76ffaa5aa8b04bf39f91d3d890a56f2345a04458ada82fe107beb6e7ddd43c&=&format=webp&quality=lossless&width=438&height=438'
            })
            .setTimestamp();

        await interaction.editReply({ content: '', embeds: [embed] });
    },
};
