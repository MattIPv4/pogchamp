const fs = require('fs').promises;
const path = require('path');
const { ChatClient } = require('dank-twitch-irc');
const config = require('./config');

// Get the PogChamp emote from the Twitch API directly
// This doesn't work, it returns the original (now removed) PogChamp
// const fetchFromAPI = async () => {
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

// Abort if a nested Promise fails anywhere
process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

// Get the PogChamp emote by sending a message in chat
const fetchFromChat = () => new Promise(resolve => {
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

            // Disconnect and resolve with the emote ID
            publicClient.close();
            botClient.close();
            resolve(pogChamp.id);
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

const main = async () => {
    // Get the emote
    const id = await fetchFromChat();

    // Build the full data
    const pogChamp = {
        id: id,
        img: {
            small: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0`,
            medium: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/2.0`,
            large: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/3.0`,
        },
    };

    // Store
    await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(pogChamp));
};

// Set a timeout to abort if taking too long (15s)
const abort = setTimeout(() => {
    console.error(new Error('Emote fetch took too long (15s), aborted'));
    process.exit(1);
}, 15 * 1000);

// Do the fetch
main().then(() => {});

// We're done, clear the timeout
clearTimeout(abort);
