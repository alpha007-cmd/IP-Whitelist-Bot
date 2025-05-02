const { Events, ActivityType } = require('discord.js');
module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log('\x1b[38;5;44m'); 
        console.log(`
                
      
            ░█████╗░██╗░░░░░██████╗░██╗░░██╗░█████╗░░█████╗░░█████╗░███████╗░░░░░░░█████╗░███╗░░░███╗██████╗░
            ██╔══██╗██║░░░░░██╔══██╗██║░░██║██╔══██╗██╔══██╗██╔══██╗╚════██║░░░░░░██╔══██╗████╗░████║██╔══██╗
            ███████║██║░░░░░██████╔╝███████║███████║██║░░██║██║░░██║░░░░██╔╝█████╗██║░░╚═╝██╔████╔██║██║░░██║
            ██╔══██║██║░░░░░██╔═══╝░██╔══██║██╔══██║██║░░██║██║░░██║░░░██╔╝░╚════╝██║░░██╗██║╚██╔╝██║██║░░██║
            ██║░░██║███████╗██║░░░░░██║░░██║██║░░██║╚█████╔╝╚█████╔╝░░██╔╝░░░░░░░░╚█████╔╝██║░╚═╝░██║██████╔╝
            ╚═╝░░╚═╝╚══════╝╚═╝░░░░░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░░╚════╝░░░╚═╝░░░░░░░░░░╚════╝░╚═╝░░░░░╚═╝╚═════╝░
                    `);
        console.log(`Discord bot is ready! Logged in as ${client.user.tag}`);

        try {
            await client.user.setPresence({
                activities: [{ name: 'Dev Alpha</>', type: ActivityType.Watching }],
                status: 'online'
            });
            console.log('Rich Presence set');
        } catch (error) {
            console.error('Error setting presence:', error);
        }
    },
};


