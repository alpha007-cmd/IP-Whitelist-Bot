const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { logChannelId } = require('../../config.json'); // Ensure this path is correct

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Repeats the provided message')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to be sent')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to send a direct message')
        ),

    async execute(interaction) {
        try {
            const message = interaction.options.getString('message');
            const user = interaction.options.getUser('user');
            await interaction.reply({ content: 'Message Sent', ephemeral: true });
            if (user) {
                user.send(message).catch(error => {
                    console.error('Error sending DM:', error);
                    if (error.code === 50007) {
                        interaction.followUp({ content: `Failed to send a direct message to ${user.tag}. The user may have DMs disabled or blocked.`, ephemeral: true });
                    } else {
                        interaction.followUp({ content: `Failed to send a direct message to ${user.tag}. An unknown error occurred.`, ephemeral: true });
                    }
                });
            } else {
                await interaction.channel.send(message);
            }

            // Log the command usage
            const logEmbed = new EmbedBuilder()
                .setTitle(`${interaction.user.tag} executed a command`)
                .setColor('#00ff00')
                .addFields(
                    { name: 'Command', value: `/say`, inline: true },
                    { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                    { name: 'Channel', value: `<#${interaction.channel.id}> (${interaction.channel.name})`, inline: true },
                    { name: 'Direct Message', value: user ? `<@${user.id}>` : 'No', inline: true }
                )
                .setFooter({ text: 'Unity Verse' })
                .setTimestamp();
                

            // Send log message
            try {
                const logChannel = await interaction.client.channels.fetch(logChannelId);
                if (logChannel) {
                    logChannel.send({ embeds: [logEmbed] });
                } else {
                    console.error(`Log channel with ID ${logChannelId} not found.`);
                }
            } catch (error) {
                console.error('Failed to send log message:', error);
            }
            
        } catch (err) {
            console.error('Error executing command:', err);
            interaction.followUp({ content: 'An error occurred while processing the command.', ephemeral: true });
        }
    },
};
