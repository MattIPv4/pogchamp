const fs = require('fs').promises;
const path = require('path');
const { ChatClient } = require('dank-twitch-irc');
const config = require('./config');

// Get the PogChamp emote from the Twitch API directly
// This doesn't work, it returns the original (now removed) PogChamp
// const api = async () => {
//     const resp = await fetch('https://api.twitch.tv/kraken/chat/emoticons', {
//         headers: {
//             'Accept': 'application/vnd.twitchtv.v5+json',
//             'Client-Id': config.TWITCH_CLIENT_ID,
//         },
//     });
//     const data = await resp.json();
//     const pogChamp = data.emoticons.filter(emoticon => emoticon.regex === 'PogChamp');
//     await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(pogChamp));
// };

// Get the PogChamp emote by sending a message in chat
const main = () => new Promise(resolve => {
    // Create the public client
    const publicClient = new ChatClient();
    const botClient = new ChatClient({
        username: config.TWITCH_USERNAME,
        password: config.TWITCH_PASSWORD,
    });

    // Handle the clients being ready
    let readyCount = 0;
    const handleReady = async () => {
        readyCount++;
        if (readyCount < 2) return;

        // Define a unique key and message
        const key = (Math.random() * 10000).toString();
        const message = `PogChamp ${key}`;

        // Listen for a message on the public client
        publicClient.on('PRIVMSG', async msg => {
            if (msg.channelName !== config.TWITCH_CHANNEL) return;
            if (msg.senderUsername !== config.TWITCH_USERNAME) return;
            if (msg.messageText !== message) return;

            // We have our message, find the emote
            const pogChamp = msg.emotes.find(emote => emote.code === 'PogChamp');
            if (!pogChamp) return;

            // Store the emote, disconnect and resolve
            await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(pogChamp));
            publicClient.close();
            botClient.close();
            resolve();
        });

        // Send the message on the bot client
        await botClient.say(config.TWITCH_CHANNEL, message);
    }

    // When the clients are ready, do stuff
    publicClient.on('ready', handleReady);
    botClient.on('ready', handleReady);

    // Throw if the client errors
    publicClient.on('close', err => { if (err) throw err; });
    botClient.on('close', err => { if (err) throw err; });

    // Start the clients
    publicClient.connect().then(() => publicClient.join(config.TWITCH_CHANNEL));
    botClient.connect().then(() => botClient.join(config.TWITCH_CHANNEL));
});

// Set a timeout to abort if taking too long (15s)
const abort = setTimeout(() => {
    throw new Error('Emote fetch took too long (15s), aborted');
}, 15 * 1000);

// Do the fetch
main().catch(e => {
    console.error(e);
    process.exit(1);
});

// We're done, clear the timeout
clearTimeout(abort);
