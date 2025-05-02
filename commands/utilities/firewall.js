const { exec } = require('child_process');
function addIpToFirewall(ipAddress, ruleName, localPort, protocol, callback) {
    const command = `netsh advfirewall firewall add rule name="${ruleName}" dir=in action=allow remoteip=${ipAddress} localport=${localPort} protocol=${protocol.toUpperCase()}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            callback(`Error: Unable to add IP to the firewall.`);
            console.error(`Error: Unable to add IP to the firewall. Details: ${stderr}`);
        } else {
            const successMessage = `Successfully added ${ipAddress} with rule name "${ruleName}", local port ${localPort}, and protocol ${protocol.toUpperCase()} to the firewall.`;
            callback(successMessage);
            console.log(successMessage);
        }
    });
}
function removeIpFromFirewall(ruleName, callback) {
    const command = `netsh advfirewall firewall delete rule name="${ruleName}"`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            callback(`Removed the firewall rule ${ruleName}.`);
            console.error(`Removed the firewall rule.`);
        } else {
            const successMessage = `Successfully removed rule name "${ruleName}" from the firewall.`;
            callback(successMessage);
            console.log(successMessage);
        }
    });
}
module.exports = {
    addIpToFirewall,
    removeIpFromFirewall
};
