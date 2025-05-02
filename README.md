# 🤖 IP Whitelisting Discord Bot

A modular, clean, and beginner-friendly **Discord.js v14** bot built using JavaScript. Perfect for managing servers with utilities like IP whitelisting, firewall control, and bot interaction commands.


## 🧩 Features

* 🔐 Add IP to Windows Firewall with `/addip`
* 💬 Echo any message with `/say`
* 📡 Check bot latency with `/ping`
* ⚙️ Modular command and event structure
* 🪵 Auto-logs IP actions to a specified channel


---

## 📁 Project Structure

```

📦 root/
├── 📁 commands/
│   └── 📁 utilities/
│       ├── addip.js          # Add IP to Windows Firewall
│       ├── firewall.js       # Manage firewall rules
│       ├── ping.js           # Latency command
│       └── say.js            # Echo command
├── 📁 events/
│   ├── interactionCreate.js  # Handles command interactions
│   └── ready.js              # Bot startup handler
├── config.json               # Stores bot token, client ID, guild ID, log channel ID
├── deploy-commands.js        # Registers slash commands
├── index.js                  # Entry point
├── package.json              # Project metadata and scripts
└── README.md                 # You're here!

````

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/alpha007-cmd/IP-Whitelist-Bot.git
cd IP-Whitelist-Bot
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure `config.json`

Replace the placeholder values with your actual information:

```json
{
  "token": "YOUR_BOT_TOKEN",
  "clientId": "YOUR_CLIENT_ID",
  "guildId": "YOUR_GUILD_ID",
  "logChannelId": "YOUR_LOG_CHANNEL_ID"
}
```

### 4. Deploy Slash Commands

```bash
node deploy-commands.js
```

### 5. Start the Bot

```bash
node index.js
```

---
