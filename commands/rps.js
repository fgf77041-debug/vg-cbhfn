const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const choices = {
  rock: { emoji: '🪨', name: 'Kámen' },
  scissors: { emoji: '✂️', name: 'Nůžky' },
  paper: { emoji: '📄', name: 'Papír' }
};

const winConditions = {
  'rock-scissors': true,
  'scissors-paper': true,
  'paper-rock': true
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Zahraj si Kámen, Nůžky, Papír proti botovi!'),

  async execute(interaction) {
    // Vytvoř tlačítka
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('rps_rock')
          .setLabel('Kámen')
          .setEmoji('🪨')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('rps_scissors')
          .setLabel('Nůžky')
          .setEmoji('✂️')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('rps_paper')
          .setLabel('Papír')
          .setEmoji('📄')
          .setStyle(ButtonStyle.Primary)
      );

    // Počáteční zpráva
    const embed = new EmbedBuilder()
      .setColor('#3498db')
      .setTitle('🎮 Kámen, Nůžky, Papír')
      .setDescription('Vyber si svůj tah kliknutím na tlačítko níže!')
      .setFooter({ text: 'Máš 30 sekund na odpověď' });

    const response = await interaction.reply({
      embeds: [embed],
      components: [row],
      fetchReply: true
    });

    // Component Interaction Collector
    const collector = response.createMessageComponentCollector({
      time: 30000 // 30 sekund
    });

    collector.on('collect', async (buttonInteraction) => {
      // Zkontroluj, jestli klikl správný uživatel
      if (buttonInteraction.user.id !== interaction.user.id) {
        return buttonInteraction.reply({
          content: '❌ Tento příkaz si můžeš spustit sám pro sebe!',
          ephemeral: true
        });
      }

      // Ulož volbu uživatele
      const userChoice = buttonInteraction.customId.replace('rps_', '');
      
      // Bot si vybere náhodně
      const botChoiceKey = Object.keys(choices)[Math.floor(Math.random() * 3)];
      const botChoice = botChoiceKey;

      // Vyhodnoť výsledek
      let result = '';
      let resultEmoji = '';

      if (userChoice === botChoice) {
        result = 'REMÍZA! 🤝';
        resultEmoji = '🤝';
      } else if (winConditions[`${userChoice}-${botChoice}`]) {
        result = 'VYHRÁL JSI! 🎉';
        resultEmoji = '🎉';
      } else {
        result = 'PROHRÁL JSI! 😢';
        resultEmoji = '😢';
      }

      // Vytvoř embed s výsledkem
      const resultEmbed = new EmbedBuilder()
        .setColor(result.includes('VYHRÁL') ? '#2ecc71' : result.includes('PROHRÁL') ? '#e74c3c' : '#f39c12')
        .setTitle(`${resultEmoji} ${result}`)
        .addFields(
          { name: `Tvůj tah: ${choices[userChoice].emoji}`, value: choices[userChoice].name, inline: true },
          { name: `Můj tah: ${choices[botChoice].emoji}`, value: choices[botChoice].name, inline: true }
        )
        .setFooter({ text: `${interaction.user.username} vs Bot` });

      // Aktualizuj zprávu
      await buttonInteraction.update({
        embeds: [resultEmbed],
        components: [] // Odstraň tlačítka
      });

      // Zastaň collector
      collector.stop();
    });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        // Pokud vypršel čas
        const timeoutEmbed = new EmbedBuilder()
          .setColor('#95a5a6')
          .setTitle('⏰ Čas vypršel!')
          .setDescription('Neodpověděl jsi včas. Zkus příkaz znovu.')
          .setFooter({ text: `${interaction.user.username}` });

        interaction.editReply({
          embeds: [timeoutEmbed],
          components: []
        }).catch(() => {}); // Ignoruj chybu, pokud je zpráva už smazaná
      }
    });
  }
};
