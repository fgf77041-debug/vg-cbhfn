# Discord RPS Bot 🎮

Discord bot s příkazem `/rps` (Kámen, Nůžky, Papír) proti botovi.

## Požadavky
- Node.js 16.11.0 nebo vyšší
- Discord bot token
- discord.js v14

## Instalace

1. **Naklonuj repozitář:**
```bash
git clone <repo-url>
cd repo
```

2. **Nainstaluj závislosti:**
```bash
npm install
```

3. **Vytvoř `.env` soubor:**
Zkopíruj `.env.example` a přejmenuj na `.env`, pak vyplň své údaje:
```
DISCORD_TOKEN=tvůj_bot_token
CLIENT_ID=tvůj_client_id
```

4. **Deployuj slash příkazy:**
```bash
npm run deploy
```

5. **Spusť bota:**
```bash
npm start
```

## Jak používat

V Discordu zadej:
```
/rps
```

Bot ti nabídne 3 tlačítka:
- 🪨 Kámen
- ✂️ Nůžky
- 📄 Papír

Klikni na tlačítko a hraj! 🎯

## Funkce

✅ Slash příkaz `/rps`
✅ Tři tlačítka (Buttons) pro volbu tahu
✅ Component Interaction Collector
✅ Náhodná volba bota
✅ Vyhodnocování hry (výhra/prohra/remíza)
✅ Aktualizace zprávy s výsledkem
✅ Timeout po 30 sekundách neaktivity
✅ Barevné embedy podle výsledku

## Struktura projektu

```
├── bot.js              # Hlavní bot soubor
├── deploy-commands.js  # Skript pro nasazení příkazů
├── commands/
│   └── rps.js         # RPS příkaz
├── .env               # Konfigurace (neverzuj!)
├── .env.example       # Šablona .env
├── package.json       # Závislosti
└── README.md          # Tento soubor
```

## Licence

ISC
