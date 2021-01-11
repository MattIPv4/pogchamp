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
const fetchFromChat = () => new Promise((resolve, reject) => {
    // Set a timeout to abort if taking too long (15s)
    const abort = setTimeout(() => {
        reject(new Error('Emote fetch took too long (15s), aborted'));
    }, 15 * 1000);

    // Create the public client
    const publicClient = new ChatClient();
    const botClient = new ChatClient({
        username: config.TWITCH_USERNAME,
        password: config.TWITCH_PASSWORD,
    });

    // Handle the clients being ready
    let readyCount = 0;
    const handleReady = () => {
        console.log('Ready');
        readyCount++;
        if (readyCount < 2) return;

        // Define a unique key and message
        const key = (Math.random() * 10000).toString();
        const message = `PogChamp ${key}`;

        // Listen for a message on the public client
        publicClient.on('PRIVMSG', msg => {
            if (msg.channelName !== config.TWITCH_CHANNEL) return;
            if (msg.senderUsername !== config.TWITCH_USERNAME) return;
            if (msg.messageText !== message) return;

            // We have our message, find the emote
            const pogChamp = msg.emotes.find(emote => emote.code === 'PogChamp');
            if (!pogChamp) return;

            // We're done, clear the timeout
            clearTimeout(abort);

            // Disconnect and resolve with the emote ID
            publicClient.close();
            botClient.close();
            console.log(pogChamp.id);
            resolve(pogChamp.id);
        });

        // Send the message on the bot client
        botClient.say(config.TWITCH_CHANNEL, message).catch(reject);
    }

    // When the clients are ready, do stuff
    publicClient.on('ready', handleReady);
    botClient.on('ready', handleReady);

    // Throw if the client errors
    publicClient.on('close', err => { if (err) reject(err); });
    botClient.on('close', err => { if (err) reject(err); });

    // Start the clients
    publicClient.connect().then(() => publicClient.join(config.TWITCH_CHANNEL).catch(reject)).catch(reject);
    botClient.connect().then(() => botClient.join(config.TWITCH_CHANNEL).catch(reject)).catch(reject);
});

const main = async () => {
    // Get the emote (allow one retry)
    const id = await fetchFromChat().catch(e => {
        console.warn(e);
        return fetchFromChat();
    });

    // Build the full data
    const pogChamp = {
        id: id,
        img: {
            small: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0`,
            medium: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/2.0`,
            large: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/3.0`,
        },
    };
    console.log(pogChamp);

    // Store
    await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(pogChamp));
};

// Do the fetch
main().then(() => {});
