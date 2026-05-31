const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command) {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`🔄 Registruji ${commands.length} slash příkaz(y)...`);

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log(`✅ Úspěšně registrováno ${data.length} příkaz(ů)!`);
  } catch (error) {
    console.error(error);
  }
})();
