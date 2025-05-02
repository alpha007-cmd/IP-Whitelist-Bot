const { SlashCommandBuilder } = require('@discordjs/builders');
const { addIpToFirewall, removeIpFromFirewall } = require('./firewall');
const schedule = require('node-schedule');
const { logChannelId } = require('../../config.json');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addip')
        .setDescription('Add an IP address to the firewall.')
        .addStringOption(option =>
            option.setName('ip')
                .setDescription('The IP address to add')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('protocol')
                .setDescription('The protocol to use (TCP/UDP)')
                .setRequired(true)
                .addChoices(
                    { name: 'TCP', value: 'TCP' },
                    { name: 'UDP', value: 'UDP' }))
        .addStringOption(option =>
            option.setName('rulename')
                .setDescription('The name of the firewall rule')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('localport')
                .setDescription('The local port to which the rule applies')
                .setRequired(true)
                .addChoices(
                    { name: '30120', value: '30120' })),

    async execute(interaction) {
        await interaction.deferReply(); // ✅ Defer the reply first

        const ipAddress = interaction.options.getString('ip');
        const protocol = interaction.options.getString('protocol');
        const ruleName = interaction.options.getString('rulename');
        const localPort = interaction.options.getString('localport');
        
        const user = interaction.user;

        addIpToFirewall(ipAddress, ruleName, localPort, protocol, async (response) => {
            const logMessage = `${response} By <@${user.id}>.`;

            await interaction.editReply(logMessage); // ✅ Edit the deferred reply

            logToChannel(interaction.client, logChannelId, `Firewall Rule Update By ${user.username}`, logMessage, user);

            const removalDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            schedule.scheduleJob(removalDate, async () => {
                removeIpFromFirewall(ruleName, async (removeResponse) => {
                    const removalLogMessage = `${removeResponse} Added by <@${user.id}>.`;
                    console.log(removalLogMessage);
                    logToChannel(interaction.client, logChannelId, `Firewall Rule Update By ${user.username}`, removalLogMessage, user, 0xff0000);
                });
            });
        });
    },
};

function logToChannel(client, logChannelId, title, description, user, color = 0x0099ff) {
    const logChannel = client.channels.cache.get(logChannelId);
    if (logChannel) {
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setTimestamp();

        if (user) {
            embed.setFooter({ text: `${user.tag}`, iconURL: user.displayAvatarURL() });
        } else {
            console.warn('User object is undefined, cannot set footer.');
        }

        logChannel.send({ embeds: [embed] });
    } else {
        console.error(`Log channel with ID ${logChannelId} not found`);
    }
}
